'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {z} from 'zod'
import type {SupabaseClient} from '@supabase/supabase-js'
import type {Database} from '@/types/database'
import {resources,type ResourceKey} from '@/features/resources/definitions'
import {getWorkspaceContext} from '@/server/workspace/context'
import {AppError} from '@/server/http/app-error'
const uuid=z.uuid(),nullableFields:Partial<Record<ResourceKey,string[]>>={
 campaigns:['description','channel','starts_at','ends_at'],leads:['email','industry','source','notes'],brand_profiles:['website','description','voice','audience','primary_color','secondary_color'],content_items:['body','channel','scheduled_at'],companies:['domain','industry','website','notes'],contacts:['company_id','last_name','email','phone','title','source'],deals:['company_id','contact_id','expected_close_date'],activities:['lead_id','contact_id','deal_id','body','due_at'],competitors:['website','notes'],keywords:['search_volume','difficulty','target_url']
}
type Db=SupabaseClient<Database>
function safePath(value:string){return value.startsWith('/')&&!value.startsWith('//')?value:'/dashboard'}
function fail(path:string,message:string):never{redirect(safePath(path)+'?error='+encodeURIComponent(message))}
function parsePayload(key:ResourceKey,form:FormData,partial=false){
 const def=resources[key],payload:Record<string,unknown>={}
 for(const field of def.fields){
  const raw=String(form.get(field.name)??'').trim()
  if(!raw){if(field.required)throw new AppError('VALIDATION_ERROR',field.label+' is required');if(partial&&nullableFields[key]?.includes(field.name))payload[field.name]=null;continue}
  if(field.kind==='number'){const n=Number(raw);if(!Number.isFinite(n)||n<(field.min??-Infinity)||n>(field.max??Infinity))throw new AppError('VALIDATION_ERROR','Invalid '+field.label);payload[field.name]=n;continue}
  if(field.kind==='email'){if(!z.email().safeParse(raw).success)throw new AppError('VALIDATION_ERROR','Enter a valid email');payload[field.name]=raw.toLowerCase();continue}
  if(field.kind==='url'){if(!z.url().safeParse(raw).success)throw new AppError('VALIDATION_ERROR','Enter a valid URL');payload[field.name]=raw;continue}
  if(['company_id','contact_id','lead_id','deal_id'].includes(field.name)){if(!uuid.safeParse(raw).success)throw new AppError('VALIDATION_ERROR','Related record ID must be a UUID');payload[field.name]=raw;continue}
  if(field.name==='payload'){try{payload.payload=JSON.parse(raw)}catch{throw new AppError('VALIDATION_ERROR','Findings must be valid JSON')}continue}
  if(field.kind==='datetime-local'){const date=new Date(raw);if(Number.isNaN(date.getTime()))throw new AppError('VALIDATION_ERROR','Invalid '+field.label);payload[field.name]=date.toISOString();continue}
  payload[field.name]=raw
 }
 if(key==='leads'&&payload.score===undefined&&!partial)payload.score=0
 if(key==='deals'&&payload.currency===undefined&&!partial)payload.currency='INR'
 if(key==='deals'&&payload.stage===undefined&&!partial)payload.stage='LEAD'
 if(key==='campaigns'&&payload.status===undefined&&!partial)payload.status='DRAFT'
 if(key==='content_items'&&payload.status===undefined&&!partial)payload.status='DRAFT'
 return payload
}
async function validateRelations(supabase:Db,payload:Record<string,unknown>,workspaceId:string){
 const refs:Record<string,'companies'|'contacts'|'leads'|'deals'>={company_id:'companies',contact_id:'contacts',lead_id:'leads',deal_id:'deals'}
 for(const [field,table] of Object.entries(refs)){const id=payload[field];if(typeof id!=='string')continue;const {data,error}=await supabase.from(table).select('id').eq('id',id).eq('workspace_id',workspaceId).maybeSingle();if(error)throw new AppError('INTERNAL_ERROR','Unable to validate related record');if(!data)throw new AppError('VALIDATION_ERROR','Related '+field.replace('_id','')+' must belong to this workspace')}
}
export async function createResourceAction(form:FormData){
 const rawKey=String(form.get('resource')??''),path=safePath(String(form.get('return_to')??'/dashboard'));if(!Object.hasOwn(resources,rawKey))fail(path,'Unknown resource');const key=rawKey as ResourceKey
 try{const {supabase,userId,workspace,role}=await getWorkspaceContext();if(role==='VIEWER')throw new AppError('FORBIDDEN','Your role is read-only');const payload=parsePayload(key,form);await validateRelations(supabase,payload,workspace.id);const row={...payload,workspace_id:workspace.id,...(['campaigns','leads','content_items','activities','market_reports'].includes(key)?{created_by:userId}:{})};const {error}=await supabase.from(resources[key].table).insert(row as never);if(error)throw error;revalidatePath(path);revalidatePath('/dashboard')}catch(e){fail(path,e instanceof Error?e.message:'Unable to save record')}
 redirect(path+'?saved=1')
}
export async function updateResourceAction(form:FormData){
 const rawKey=String(form.get('resource')??''),id=String(form.get('id')??''),path=safePath(String(form.get('return_to')??'/dashboard'));if(!Object.hasOwn(resources,rawKey))fail(path,'Unknown resource');const key=rawKey as ResourceKey
 try{uuid.parse(id);const {supabase,workspace,role}=await getWorkspaceContext();if(role==='VIEWER')throw new AppError('FORBIDDEN','Your role is read-only');const payload=parsePayload(key,form,true);await validateRelations(supabase,payload,workspace.id);const {data,error}=await supabase.from(resources[key].table).update(payload as never).eq('id',id).eq('workspace_id',workspace.id).select('id').maybeSingle();if(error)throw error;if(!data)throw new AppError('NOT_FOUND','Record not found');revalidatePath(path);revalidatePath('/dashboard')}catch(e){fail(path,e instanceof Error?e.message:'Unable to update record')}
 redirect(path+'?saved=1')
}
export async function deleteResourceAction(form:FormData){
 const rawKey=String(form.get('resource')??''),id=String(form.get('id')??''),path=safePath(String(form.get('return_to')??'/dashboard'));if(!Object.hasOwn(resources,rawKey))fail(path,'Unknown resource');const key=rawKey as ResourceKey
 try{uuid.parse(id);const {supabase,workspace,role}=await getWorkspaceContext();if(!['OWNER','ADMIN'].includes(role))throw new AppError('FORBIDDEN','Only workspace administrators can delete records');const {data,error}=await supabase.from(resources[key].table).delete().eq('id',id).eq('workspace_id',workspace.id).select('id').maybeSingle();if(error)throw error;if(!data)throw new AppError('NOT_FOUND','Record not found');revalidatePath(path);revalidatePath('/dashboard')}catch(e){fail(path,e instanceof Error?e.message:'Unable to delete record')}
 redirect(path+'?deleted=1')
}
