'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {z} from 'zod'
import {getWorkspaceContext} from '@/server/workspace/context'
import type {Json} from '@/types/database'
export async function importLeadsCsv(form:FormData){
 const file=form.get('file');if(!(file instanceof File)||!file.size)redirect('/leads/import?error=Choose%20a%20CSV%20file');if(file.size>2*1024*1024)redirect('/leads/import?error=CSV%20must%20be%202MB%20or%20smaller')
 const {supabase,userId,workspace,role}=await getWorkspaceContext();if(role==='VIEWER')redirect('/leads/import?error=Your%20role%20is%20read-only')
 let rows:string[][];try{rows=parseCsv(await file.text())}catch{redirect('/leads/import?error=CSV%20format%20is%20invalid')}
 if(rows.length<2)redirect('/leads/import?error=CSV%20contains%20no%20records');if(rows.length>501)redirect('/leads/import?error=Maximum%20500%20rows%20per%20import')
 const headers=rows[0].map(x=>x.trim().toLowerCase()),nameIndex=headers.indexOf('name'),companyIndex=headers.indexOf('company');if(nameIndex<0||companyIndex<0)redirect('/leads/import?error=CSV%20must%20include%20name%20and%20company%20columns')
 const emailIndex=headers.indexOf('email'),industryIndex=headers.indexOf('industry'),sourceIndex=headers.indexOf('source'),notesIndex=headers.indexOf('notes'),seen=new Set<string>()
 const records=[]
 for(const row of rows.slice(1)){const name=(row[nameIndex]??'').trim(),company=(row[companyIndex]??'').trim(),email=(row[emailIndex]??'').trim().toLowerCase();if(!name||!company)continue;if(email&&!z.email().safeParse(email).success)continue;if(email&&seen.has(email))continue;if(email)seen.add(email);records.push({workspace_id:workspace.id,created_by:userId,name:name.slice(0,160),company:company.slice(0,160),email:email||null,industry:(row[industryIndex]??'').slice(0,100)||null,source:(row[sourceIndex]??'CSV import').slice(0,120)||'CSV import',notes:(row[notesIndex]??'').slice(0,4000)||null,score:0,status:'NEW' as const})}
 if(!records.length)redirect('/leads/import?error=No%20valid%20rows%20found')
 const emails=records.flatMap(x=>x.email?[x.email]:[]),{data:existing}=emails.length?await supabase.from('leads').select('email').eq('workspace_id',workspace.id).in('email',emails):{data:[]}
 const known=new Set((existing??[]).map(x=>x.email).filter((x):x is string=>Boolean(x))),fresh=records.filter(x=>!x.email||!known.has(x.email));if(!fresh.length)redirect('/leads/import?error=All%20valid%20records%20already%20exist')
 const {error}=await supabase.from('leads').insert(fresh);if(error)redirect('/leads/import?error='+encodeURIComponent(error.message));revalidatePath('/leads');revalidatePath('/dashboard');redirect('/leads/import?imported='+fresh.length)
}
function parseCsv(input:string):string[][]{const out:string[][]=[];let row:string[]=[],cell='',quoted=false;for(let i=0;i<input.length;i++){const ch=input[i];if(quoted){if(ch==='"'&&input[i+1]==='"'){cell+='"';i++}else if(ch==='"')quoted=false;else cell+=ch}else if(ch==='"')quoted=true;else if(ch===','){row.push(cell);cell=''}else if(ch==='\n'){row.push(cell.replace(/\r$/,''));out.push(row);row=[];cell=''}else cell+=ch}if(quoted)throw new Error('Unterminated quoted field');if(cell.length||row.length){row.push(cell.replace(/\r$/,''));out.push(row)}return out.filter(x=>x.some(v=>v.trim()))}
export async function createOutreachDraft(form:FormData){
 const leadId=String(form.get('lead_id')??''),subject=String(form.get('subject')??'').trim(),body=String(form.get('body')??'').trim();if(!z.uuid().safeParse(leadId).success||!subject||!body)redirect('/leads/outreach?error=Lead%20ID%2C%20subject%20and%20draft%20body%20are%20required')
 const {supabase,userId,workspace,role}=await getWorkspaceContext();if(role==='VIEWER')redirect('/leads/outreach?error=Your%20role%20is%20read-only')
 const {data:lead}=await supabase.from('leads').select('id').eq('id',leadId).eq('workspace_id',workspace.id).maybeSingle();if(!lead)redirect('/leads/outreach?error=Lead%20does%20not%20belong%20to%20this%20workspace')
 const {error}=await supabase.from('outreach_drafts').insert({workspace_id:workspace.id,lead_id:leadId,subject:subject.slice(0,240),body:body.slice(0,10000),status:'IN_REVIEW',created_by:userId});if(error)redirect('/leads/outreach?error='+encodeURIComponent(error.message));revalidatePath('/leads/outreach');redirect('/leads/outreach?saved=1')
}
export async function reviewOutreachDraft(form:FormData){
 const id=String(form.get('id')??''),decision=String(form.get('decision')??'');if(!z.uuid().safeParse(id).success||!['APPROVED','REJECTED'].includes(decision))redirect('/leads/outreach?error=Invalid%20review%20action')
 const {supabase,userId,workspace,role}=await getWorkspaceContext();if(!['OWNER','ADMIN'].includes(role))redirect('/leads/outreach?error=Only%20workspace%20admins%20can%20approve%20outreach')
 const {data,error}=await supabase.from('outreach_drafts').update({status:decision,approved_by:decision==='APPROVED'?userId:null,approved_at:decision==='APPROVED'?new Date().toISOString():null}).eq('id',id).eq('workspace_id',workspace.id).eq('status','IN_REVIEW').select('id').maybeSingle();if(error||!data)redirect('/leads/outreach?error=Draft%20not%20found%20or%20already%20reviewed');revalidatePath('/leads/outreach');redirect('/leads/outreach?reviewed=1')
}
export async function createLeadSegment(form:FormData){
 const name=String(form.get('name')??'').trim(),description=String(form.get('description')??'').trim(),raw=String(form.get('filters')??'{}').trim();if(name.length<2||name.length>120)redirect('/leads/segments?error=Segment%20name%20must%20be%202-120%20characters')
 let filters:Json;try{filters=JSON.parse(raw) as Json}catch{redirect('/leads/segments?error=Filters%20must%20be%20valid%20JSON')};if(!filters||typeof filters!=='object'||Array.isArray(filters))redirect('/leads/segments?error=Filters%20must%20be%20a%20JSON%20object')
 const {supabase,userId,workspace,role}=await getWorkspaceContext();if(role==='VIEWER')redirect('/leads/segments?error=Read-only%20role');const {error}=await supabase.from('lead_segments').insert({workspace_id:workspace.id,name,description:description||null,filters,created_by:userId});if(error)redirect('/leads/segments?error='+encodeURIComponent(error.message));revalidatePath('/leads/segments');redirect('/leads/segments?saved=1')
}
