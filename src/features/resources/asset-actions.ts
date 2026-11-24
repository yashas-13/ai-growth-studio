'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {getWorkspaceContext} from '@/server/workspace/context'
function sniff(bytes:Uint8Array){if(bytes.length>=8&&bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71)return 'image/png';if(bytes.length>=3&&bytes[0]===255&&bytes[1]===216&&bytes[2]===255)return 'image/jpeg';if(bytes.length>=12&&String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP')return 'image/webp';if(bytes.length>=5&&String.fromCharCode(...bytes.slice(0,5))==='%PDF-')return 'application/pdf';return null}
export async function uploadBrandAssetAction(form:FormData){
 const file=form.get('file'),name=String(form.get('name')??'').trim()
 if(!(file instanceof File)||file.size===0)redirect('/brand/assets?error=Choose%20a%20file')
 if(file.size>20*1024*1024||!name||name.length>160)redirect('/brand/assets?error=File%20must%20be%2020MB%20or%20smaller%20and%20have%20a%20valid%20name')
 const bytes=new Uint8Array(await file.slice(0,16).arrayBuffer()),mime=sniff(bytes)
 if(!mime||file.type!==mime)redirect('/brand/assets?error=File%20content%20does%20not%20match%20a%20supported%20PNG%2C%20JPEG%2C%20WebP%20or%20PDF%20type')
 const {supabase,userId,workspace,role}=await getWorkspaceContext();if(role==='VIEWER')redirect('/brand/assets?error=Your%20role%20is%20read-only')
 const safe=file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]/g,'_').slice(-100)||'asset',path=workspace.id+'/'+crypto.randomUUID()+'-'+safe
 const {error:uploadError}=await supabase.storage.from('brand-assets').upload(path,file,{contentType:mime,upsert:false});if(uploadError)redirect('/brand/assets?error='+encodeURIComponent(uploadError.message))
 const {error:recordError}=await supabase.from('brand_assets').insert({workspace_id:workspace.id,name,storage_path:path,mime_type:mime,size_bytes:file.size,created_by:userId})
 if(recordError){await supabase.storage.from('brand-assets').remove([path]);redirect('/brand/assets?error=Unable%20to%20save%20asset%20metadata')}
 revalidatePath('/brand/assets');redirect('/brand/assets?saved=1')
}
export async function deleteBrandAssetAction(form:FormData){
 const id=String(form.get('id')??''),{supabase,workspace,role}=await getWorkspaceContext();if(!['OWNER','ADMIN'].includes(role))redirect('/brand/assets?error=Only%20workspace%20admins%20can%20delete%20assets')
 const {data,error}=await supabase.from('brand_assets').select('storage_path').eq('id',id).eq('workspace_id',workspace.id).single();if(error||!data)redirect('/brand/assets?error=Asset%20not%20found')
 const {error:removeError}=await supabase.storage.from('brand-assets').remove([data.storage_path]);if(removeError)redirect('/brand/assets?error=Unable%20to%20remove%20stored%20file')
 const {error:deleteError}=await supabase.from('brand_assets').delete().eq('id',id).eq('workspace_id',workspace.id);if(deleteError)redirect('/brand/assets?error=Unable%20to%20remove%20asset%20record')
 revalidatePath('/brand/assets');redirect('/brand/assets?deleted=1')
}
