import Link from 'next/link'
import {notFound} from 'next/navigation'
import {z} from 'zod'
import {resources,type ResourceKey,type FieldDef} from './definitions'
import {getWorkspaceContext} from '@/server/workspace/context'
import {updateResourceAction,deleteResourceAction} from '@/server/resources/actions'
function EditField({field,value}:{field:FieldDef;value:unknown}){const raw=value==null?'':String(value),v=field.kind==='datetime-local'&&raw?new Date(raw).toISOString().slice(0,16):raw;if(field.kind==='textarea')return <label className="data-field">{field.label}<textarea name={field.name} defaultValue={v} rows={4}/></label>;if(field.kind==='select')return <label className="data-field">{field.label}<select name={field.name} defaultValue={v}>{field.options?.map(o=><option key={o} value={o}>{o}</option>)}</select></label>;return <label className="data-field">{field.label}<input name={field.name} type={field.kind??'text'} defaultValue={v} required={field.required} min={field.min} max={field.max} step={field.step}/></label>}
export async function ResourceDetailPage({resource,id,path}:{resource:ResourceKey;id:string;path:string}){
 if(!z.uuid().safeParse(id).success)notFound()
 const def=resources[resource],{supabase,workspace,role}=await getWorkspaceContext()
 const {data,error}=await supabase.from(def.table).select('*').eq('id',id).eq('workspace_id',workspace.id).maybeSingle()
 if(error||!data)notFound()
 const row=data as unknown as Record<string,unknown>
 return <main className="data-page"><header className="data-page-head"><div><div className="eyebrow">{workspace.name.toUpperCase()} / {def.title.toUpperCase()}</div><h1>{String(row.name??row.title??row.brand_name??'Record')}</h1><p>Authenticated record detail · {def.title}</p></div><Link className="btn btn-secondary btn-md" href={path}>Back to {def.title}</Link></header><section className="data-panel detail-panel"><h2>Edit record</h2><form action={updateResourceAction} className="data-form"><input type="hidden" name="resource" value={resource}/><input type="hidden" name="return_to" value={path+'/'+id}/><input type="hidden" name="id" value={id}/><div className="data-fields detail-fields">{def.fields.map(f=><EditField key={f.name} field={f} value={row[f.name]}/>)}</div><button className="btn btn-primary btn-md" disabled={role==='VIEWER'}>Save changes</button></form>{['OWNER','ADMIN'].includes(role)&&<form action={deleteResourceAction} className="detail-delete"><input type="hidden" name="resource" value={resource}/><input type="hidden" name="return_to" value={path}/><input type="hidden" name="id" value={id}/><button className="btn btn-danger btn-sm">Delete record</button></form>}</section></main>
}
