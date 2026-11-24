import Link from 'next/link'
import {getWorkspaceContext} from '@/server/workspace/context'
const modules=[['Campaigns','/campaigns','AdGenius AI'],['Brand foundation','/brand','BrandPilot AI'],['Prospects','/leads','LeadHunter AI'],['Market research','/market','MarketPulse AI'],['Companies','/crm/companies','CRM Hub'],['Content calendar','/brand/content-calendar','BrandPilot AI']]
export default async function DashboardPage({searchParams}:{searchParams:Promise<{welcome?:string}>}){
 const params=await searchParams
 const {supabase,workspace,email,role}=await getWorkspaceContext()
 const tables=['campaigns','leads','brand_profiles','content_items','companies','contacts','deals','competitors','keywords','market_reports'] as const
 const counts=await Promise.all(tables.map(async table=>{const {count,error}=await supabase.from(table).select('id',{count:'exact',head:true}).eq('workspace_id',workspace.id);return [table,error?0:count??0] as const}))
 const map:Record<string,number>=Object.fromEntries(counts)
 const {data:events}=await supabase.from('audit_events').select('id,action,entity_type,created_at').eq('workspace_id',workspace.id).order('created_at',{ascending:false}).limit(8)
 return <main className="data-page">{params.welcome==='1'&&<div className="data-success" role="status" aria-live="polite">Signed in successfully. Welcome to your workspace.</div>}<header className="data-page-head"><div><div className="eyebrow">GROWTH WORKSPACE</div><h1>{workspace.name}</h1><p>Authenticated workspace overview for {email||'your account'} · {role}</p></div><Link className="btn btn-primary btn-md" href="/campaigns/new">Create campaign</Link></header>
 <section className="data-metrics">{[['Campaigns',map.campaigns],['Prospects',map.leads],['Brand profiles',map.brand_profiles],['Content items',map.content_items],['Companies',map.companies],['Deals',map.deals]].map(([name,count])=><article className="data-metric" key={String(name)}><span>{name}</span><b>{count}</b></article>)}</section>
 <section className="data-panel"><div className="data-panel-head"><div><h2>Product modules</h2><p>Open a module to create and manage persistent workspace records.</p></div></div><div className="module-links">{modules.map(([title,path,desc])=><Link href={path} key={path}><span>{desc}</span><b>{title}</b><small>Open workspace →</small></Link>)}</div></section>
 <section className="data-panel"><div className="data-panel-head"><div><h2>Recent audit activity</h2><p>Database-recorded actions for this workspace.</p></div><Link href="/settings/audit-log">View audit log →</Link></div>{events?.length?<div className="audit-list">{events.map(e=><div key={e.id}><b>{e.action}</b><span>{e.entity_type}</span><time>{new Date(e.created_at).toLocaleString()}</time></div>)}</div>:<div className="data-empty"><b>No activity yet</b><p>Changes will appear here after records are created or updated.</p></div>}</section></main>
}
