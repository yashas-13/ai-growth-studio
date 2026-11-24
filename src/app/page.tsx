'use client'

import { useMemo, useState } from 'react'
import {
  Activity, ArrowUpRight, Bell, Bot, BriefcaseBusiness, Building2,
  Check, ChevronDown, ChevronLeft, ChevronRight, CreditCard, Download, ExternalLink,
  FileText, Filter, Gauge, Globe2, LayoutDashboard, LineChart, Megaphone, Menu,
  MoreHorizontal, Plus, Search, Settings2,
  ShieldCheck, Sparkles, Target, Users, WandSparkles, X, Zap
} from 'lucide-react'

type Section = 'Overview' | 'AdGenius AI' | 'BrandPilot AI' | 'LeadHunter AI' | 'MarketPulse AI' | 'CRM Hub' | 'Settings'
type LeadStatus = 'New' | 'Qualified' | 'Contacted' | 'Converted' | 'Disqualified'
type Lead = { id: number; name: string; company: string; email: string; industry: string; score: number; status: LeadStatus; source: string }
type Campaign = { id: number; name: string; channel: string; objective: string; status: 'Draft' | 'In review' | 'Ready'; updated: string }

const navigation: { title: string; items: { label: Section; icon: typeof LayoutDashboard; description: string }[] }[] = [
  { title: 'WORKSPACE', items: [{ label: 'Overview', icon: LayoutDashboard, description: 'Your growth command center' }] },
  { title: 'AI STUDIO', items: [
    { label: 'AdGenius AI', icon: Megaphone, description: 'Campaign strategy and creative' },
    { label: 'BrandPilot AI', icon: Sparkles, description: 'Brand identity and content' },
    { label: 'LeadHunter AI', icon: Target, description: 'Prospecting and qualification' },
    { label: 'MarketPulse AI', icon: LineChart, description: 'SEO and answer visibility' },
  ] },
  { title: 'PLATFORM', items: [
    { label: 'CRM Hub', icon: Users, description: 'Customer data and connectors' },
    { label: 'Settings', icon: Settings2, description: 'Workspace configuration' },
  ] },
]

const seedLeads: Lead[] = [
  { id: 1, name: 'Ananya Rao', company: 'Northstar Health', email: 'ananya@northstar.example', industry: 'Healthcare', score: 94, status: 'Qualified', source: 'Website' },
  { id: 2, name: 'Rohan Mehta', company: 'Vertex Labs', email: 'rohan@vertex.example', industry: 'Technology', score: 87, status: 'Contacted', source: 'LinkedIn' },
  { id: 3, name: 'Meera Iyer', company: 'Bloom Retail', email: 'meera@bloom.example', industry: 'Retail', score: 76, status: 'New', source: 'Referral' },
  { id: 4, name: 'Arjun Nair', company: 'Orbit Finance', email: 'arjun@orbit.example', industry: 'Financial services', score: 69, status: 'New', source: 'Website' },
  { id: 5, name: 'Ishita Shah', company: 'Atlas Learning', email: 'ishita@atlas.example', industry: 'Education', score: 82, status: 'Qualified', source: 'Webinar' },
]

const seedCampaigns: Campaign[] = [
  { id: 1, name: 'Q4 demand generation', channel: 'Google + LinkedIn', objective: 'Generate qualified pipeline', status: 'In review', updated: 'Today, 10:42 AM' },
  { id: 2, name: 'Founder-led brand awareness', channel: 'LinkedIn', objective: 'Increase brand reach', status: 'Ready', updated: 'Yesterday' },
  { id: 3, name: 'Product launch nurture', channel: 'Email + Instagram', objective: 'Drive product trials', status: 'Draft', updated: 'Nov 21, 2026' },
]

const statusClass = (status: string) => status.toLowerCase().replaceAll(' ', '-')

function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, type = 'button' }: {
  children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'md'; disabled?: boolean; type?: 'button' | 'submit'
}) {
  return <button type={type} disabled={disabled} onClick={onClick} className={'btn btn-' + variant + ' btn-' + size}>{children}</button>
}

function Metric({ label, value, change, icon: Icon, tone = 'violet' }: { label: string; value: string; change: string; icon: typeof Activity; tone?: string }) {
  return <article className="metric-card">
    <div className="metric-head"><span>{label}</span><span className={'metric-icon ' + tone}><Icon size={16}/></span></div>
    <div className="metric-value">{value}</div>
    <div className="metric-foot"><span className="trend"><ArrowUpRight size={13}/>{change}</span><span>vs. previous period</span></div>
  </article>
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action && <div className="heading-actions">{action}</div>}</div>
}

function DemoNotice() {
  return <div className="demo-notice"><span><ShieldCheck size={14}/></span><div><b>Prototype workspace</b><p>Sample records and simulated AI outputs are shown here. No advertising, CRM or analytics account is connected.</p></div></div>
}

function EmptyState({ icon: Icon, title, detail, action }: { icon: typeof FileText; title: string; detail: string; action?: React.ReactNode }) {
  return <div className="empty-state"><span><Icon size={24}/></span><h3>{title}</h3><p>{detail}</p>{action}</div>
}

export default function Home() {
  const [active, setActive] = useState<Section>('Overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileNav, setMobileNav] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')
  const [leads, setLeads] = useState(seedLeads)
  const [campaigns, setCampaigns] = useState(seedCampaigns)
  const [leadModal, setLeadModal] = useState(false)
  const [leadFilter, setLeadFilter] = useState('All')
  const [leadDraft, setLeadDraft] = useState({ name: '', company: '', email: '', industry: 'Technology', source: 'Website' })
  const [campaignDraft, setCampaignDraft] = useState({ name: '', brand: 'Northstar Agency', objective: 'Generate qualified pipeline', audience: 'Decision-makers at growing businesses', channel: 'Google + LinkedIn', budget: '50000', duration: '30' })
  const [campaignGenerated, setCampaignGenerated] = useState(false)
  const [brand, setBrand] = useState({ name: 'Northstar Agency', industry: 'Professional services', personality: 'Confident and helpful', audience: 'Founders and growth leaders', voice: 'Clear, practical and credible' })
  const [brandSaved, setBrandSaved] = useState(false)
  const [domain, setDomain] = useState('northstar.example')
  const [auditRan, setAuditRan] = useState(false)
  const [settingsTab, setSettingsTab] = useState('General')
  const [workspaceName, setWorkspaceName] = useState('Northstar Agency')
  const [timezone, setTimezone] = useState('Asia/Kolkata')

  const qualified = useMemo(() => leads.filter(l => l.status === 'Qualified').length, [leads])
  const filteredLeads = useMemo(() => leads.filter(l => {
    const matchesFilter = leadFilter === 'All' || l.status === leadFilter
    const q = search.trim().toLowerCase()
    const matchesSearch = !q || [l.name, l.company, l.email, l.industry].some(v => v.toLowerCase().includes(q))
    return matchesFilter && matchesSearch
  }), [leads, leadFilter, search])

  function notify(message: string) { setToast(message); window.setTimeout(() => setToast(''), 2800) }
  function go(section: Section) { setActive(section); setSearch(''); setMobileNav(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  function addLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: Lead = { id: Math.max(0, ...leads.map(l => l.id)) + 1, ...leadDraft, score: 50, status: 'New' }
    setLeads(current => [next, ...current]); setLeadModal(false)
    setLeadDraft({ name: '', company: '', email: '', industry: 'Technology', source: 'Website' })
    notify('Prospect added to this demo session')
  }
  function createCampaign(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const item: Campaign = { id: Math.max(0, ...campaigns.map(c => c.id)) + 1, name: campaignDraft.name || 'Untitled campaign', channel: campaignDraft.channel, objective: campaignDraft.objective, status: 'Draft', updated: 'Just now' }
    setCampaigns(current => [item, ...current]); setCampaignGenerated(true); notify('Campaign draft generated locally')
  }

  return <main className={'app-shell ' + (!sidebarOpen ? 'sidebar-collapsed ' : '') + (mobileNav ? 'mobile-nav-open' : '')}>
    <aside className="sidebar">
      <div className="brand-lockup"><div className="brand-mark"><Sparkles size={19}/></div><div className="brand-copy"><strong>growth<span>studio</span></strong><small>AI GROWTH PLATFORM</small></div><button className="collapse-btn" onClick={() => setSidebarOpen(v => !v)} aria-label="Collapse sidebar"><ChevronLeft size={16}/></button></div>
      <button className="workspace-switch" onClick={() => notify('Workspace switcher is a prototype control')}><div className="workspace-avatar">N</div><div className="workspace-copy"><b>{workspaceName}</b><small>Free workspace</small></div><ChevronDown className="workspace-chevron" size={15}/></button>
      <nav className="nav-area" aria-label="Main navigation">{navigation.map(group => <div className="nav-group" key={group.title}><div className="nav-caption">{group.title}</div>{group.items.map(item => <button key={item.label} title={!sidebarOpen ? item.label : undefined} onClick={() => go(item.label)} className={'nav-link ' + (active === item.label ? 'active' : '')}><item.icon size={17}/><span>{item.label}</span>{item.label === 'LeadHunter AI' && <em>{leads.length}</em>}</button>)}</div>)}</nav>
      <div className="sidebar-bottom"><div className="plan-card"><div className="plan-head"><span>MONTHLY AI CREDITS</span><b>7,840 <small>/ 10,000</small></b></div><div className="progress"><i style={{ width: '78%' }}/></div><small>78% of sample allowance</small></div><div className="profile-row"><div className="profile-avatar">YP</div><div className="profile-copy"><b>Yashas Prakash</b><small>Workspace owner</small></div><MoreHorizontal size={17}/></div></div>
    </aside>

    <section className="main-area">
      <header className="topbar">
        <div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileNav(v => !v)} aria-label="Toggle navigation"><Menu size={19}/></button><div className="breadcrumb">Workspace <span>/</span> <b>{active}</b></div></div>
        <div className="top-actions">
          <label className="global-search"><Search size={15}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search this workspace…" aria-label="Search workspace"/><kbd>⌘ K</kbd></label>
          <span className="system-status"><i/>All systems normal</span>
          <div className="notification-wrap"><button className="icon-button" onClick={() => setNotificationsOpen(v => !v)} aria-label="Notifications"><Bell size={18}/><i/></button>{notificationsOpen && <div className="notification-popover"><div className="popover-head"><b>Notifications</b><button onClick={() => setNotificationsOpen(false)}><X size={14}/></button></div><div className="notification-item"><span className="notification-icon violet"><Sparkles size={14}/></span><div><b>Welcome to Growth Studio</b><p>Your demo workspace is ready to explore.</p><small>Just now</small></div></div><div className="notification-item"><span className="notification-icon green"><Check size={14}/></span><div><b>Platform foundation configured</b><p>Local prototype environment detected.</p><small>Today</small></div></div></div>}</div>
          <div className="top-avatar">YP</div>
        </div>
      </header>

      <div className="content">
        {active === 'Overview' && <>
          <PageHeading eyebrow="TUESDAY, NOVEMBER 24, 2026" title="Your growth, in focus." description="A clear view of your marketing, brand and sales activity." action={<Button onClick={() => go('AdGenius AI')}><Plus size={15}/> New campaign</Button>}/>
          <DemoNotice/>
          <div className="metrics-grid">
            <Metric label="CAMPAIGNS" value={String(campaigns.length + 21)} change="+12.8%" icon={Megaphone}/>
            <Metric label="BRAND ASSETS" value="86" change="+8 this week" icon={Sparkles} tone="mint"/>
            <Metric label="ACTIVE PROSPECTS" value={leads.length.toLocaleString('en-IN')} change="+18.4%" icon={Users} tone="amber"/>
            <Metric label="VISIBILITY INDEX" value="68.4" change="+4.2 pts" icon={Gauge} tone="blue"/>
          </div>
          <div className="dashboard-grid">
            <section className="surface chart-panel"><div className="surface-heading"><div><div className="eyebrow">PERFORMANCE OVERVIEW</div><h2>Growth at a glance</h2><p>Illustrative reach and qualified lead trend</p></div><select className="select-small" aria-label="Chart period"><option>Last 30 days</option><option>Last 7 days</option><option>This quarter</option></select></div>
              <div className="chart-legend"><span><i className="legend-purple"/> Campaign reach</span><span><i className="legend-blue"/> Qualified leads</span></div>
              <div className="chart-area"><div className="chart-y"><span>10k</span><span>7.5k</span><span>5k</span><span>2.5k</span><span>0</span></div><svg viewBox="0 0 700 230" preserveAspectRatio="none" role="img" aria-label="Illustrative line chart showing campaign reach and qualified leads"><defs><linearGradient id="growth-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8a78ed" stopOpacity=".2"/><stop offset="1" stopColor="#8a78ed" stopOpacity="0"/></linearGradient></defs>{[18,66,114,162,210].map(y=><line key={y} x1="0" x2="700" y1={y} y2={y} stroke="#eeedf3" strokeDasharray="4 6"/>)}<path d="M0 184 C55 178 76 155 120 165 S180 126 220 142 S280 103 320 117 S380 82 420 95 S480 59 520 77 S580 42 620 57 S670 26 700 33 L700 210 L0 210Z" fill="url(#growth-fill)"/><path d="M0 184 C55 178 76 155 120 165 S180 126 220 142 S280 103 320 117 S380 82 420 95 S480 59 520 77 S580 42 620 57 S670 26 700 33" fill="none" stroke="#806de2" strokeWidth="3" strokeLinecap="round"/><path d="M0 204 C55 197 76 187 120 191 S180 174 220 180 S280 158 320 169 S380 143 420 151 S480 127 520 135 S580 109 620 119 S670 96 700 103" fill="none" stroke="#67a9d4" strokeWidth="2.5" strokeLinecap="round"/></svg></div><div className="chart-x"><span>Oct 26</span><span>Nov 02</span><span>Nov 09</span><span>Nov 16</span><span>Nov 24</span></div>
              <div className="chart-foot"><span>Sample trend data</span><span>Not connected to advertising accounts</span></div>
            </section>
            <section className="surface activity-panel"><div className="surface-heading"><div><div className="eyebrow">WORKSPACE FEED</div><h2>Recent activity</h2></div><button className="link-button" onClick={() => go('CRM Hub')}>View all <ExternalLink size={12}/></button></div>
              {[{icon:Megaphone,tone:'violet',title:'Campaign brief created',desc:'Q4 demand generation · AdGenius',time:'12 min ago'},{icon:Sparkles,tone:'mint',title:'Brand kit updated',desc:'Northstar Agency · BrandPilot',time:'48 min ago'},{icon:Target,tone:'amber',title:'Prospects qualified',desc:'Healthcare segment · LeadHunter',time:'2 hours ago'},{icon:LineChart,tone:'blue',title:'Visibility review completed',desc:'3 competitors · MarketPulse',time:'Yesterday'}].map(a=><div className="activity-item" key={a.title}><span className={'activity-icon '+a.tone}><a.icon size={15}/></span><div><b>{a.title}</b><p>{a.desc}</p><small>{a.time}</small></div></div>)}
            </section>
          </div>
          <div className="section-title"><div><div className="eyebrow">YOUR AI TOOLKIT</div><h2>Four engines. One connected workflow.</h2></div><span>Choose a module to get started</span></div>
          <div className="module-grid">{[{name:'AdGenius AI',desc:'Plan campaigns, define audiences and create channel-ready briefs.',icon:Megaphone,tone:'violet',stat:'Campaign studio'},{name:'BrandPilot AI',desc:'Shape your identity, voice and reusable brand content system.',icon:Sparkles,tone:'mint',stat:'Brand workspace'},{name:'LeadHunter AI',desc:'Organize prospects, score fit and prepare contextual outreach.',icon:Target,tone:'amber',stat:'Sales intelligence'},{name:'MarketPulse AI',desc:'Review search opportunities and answer-engine visibility.',icon:LineChart,tone:'blue',stat:'SEO + AEO insights'}].map(m=><button className="module-card" key={m.name} onClick={() => go(m.name as Section)}><span className={'module-icon '+m.tone}><m.icon size={19}/></span><small>{m.stat}</small><h3>{m.name}</h3><p>{m.desc}</p><span className="module-link">Open module <ArrowUpRight size={13}/></span></button>)}</div>
        </>}

        {active === 'AdGenius AI' && <>
          <PageHeading eyebrow="CAMPAIGN INTELLIGENCE" title="AdGenius AI" description="Turn a business objective into a clear, reviewable campaign plan." action={<span className="prototype-tag"><Sparkles size={12}/> AI workspace preview</span>}/>
          <div className="two-column">
            <section className="surface form-card"><div className="card-title"><div><h2>Campaign brief</h2><p>Define the outcome, audience and channels.</p></div><span className="step-tag">01 / BRIEF</span></div>
              <form onSubmit={createCampaign}>
                <label>Campaign name<input required placeholder="e.g. Q4 demand generation" value={campaignDraft.name} onChange={e=>setCampaignDraft({...campaignDraft,name:e.target.value})}/></label>
                <label>Brand / business<input value={campaignDraft.brand} onChange={e=>setCampaignDraft({...campaignDraft,brand:e.target.value})}/></label>
                <label>Primary objective<textarea rows={3} value={campaignDraft.objective} onChange={e=>setCampaignDraft({...campaignDraft,objective:e.target.value})}/></label>
                <label>Target audience<input value={campaignDraft.audience} onChange={e=>setCampaignDraft({...campaignDraft,audience:e.target.value})}/></label>
                <div className="form-row"><label>Channels<select value={campaignDraft.channel} onChange={e=>setCampaignDraft({...campaignDraft,channel:e.target.value})}><option>Google + LinkedIn</option><option>Instagram + Facebook</option><option>Google Search</option><option>LinkedIn</option><option>Email + Instagram</option></select></label><label>Duration<select value={campaignDraft.duration} onChange={e=>setCampaignDraft({...campaignDraft,duration:e.target.value})}><option value="14">14 days</option><option value="30">30 days</option><option value="60">60 days</option><option value="90">90 days</option></select></label></div>
                <label>Indicative budget (INR)<input type="number" min="0" step="1000" value={campaignDraft.budget} onChange={e=>setCampaignDraft({...campaignDraft,budget:e.target.value})}/></label>
                <Button type="submit"><WandSparkles size={15}/> Generate campaign draft</Button>
                <p className="form-hint">Creates a local draft only. No ad account is connected and nothing will be published.</p>
              </form>
            </section>
            <section className="surface output-card"><div className="card-title"><div><div className="eyebrow">CAMPAIGN WORKSPACE</div><h2>{campaignGenerated ? campaignDraft.name || 'New campaign' : 'Your next campaign starts here'}</h2><p>Strategy, audience and channel planning</p></div><span className="status-badge">{campaignGenerated ? 'Draft created' : 'Awaiting brief'}</span></div>
              {campaignGenerated ? <><div className="generated-banner"><Sparkles size={18}/><div><b>Draft strategy prepared</b><p>Review assumptions and adjust the plan before approval.</p></div></div><div className="output-section"><h3>Campaign direction</h3><p>Position {campaignDraft.brand} around “{campaignDraft.objective}”. Lead with proof-led messaging, clear value propositions and a focused conversion path for {campaignDraft.audience.toLowerCase()}.</p></div><div className="stat-strip"><div><small>DURATION</small><b>{campaignDraft.duration} days</b></div><div><small>CHANNELS</small><b>{campaignDraft.channel}</b></div><div><small>TEST BUDGET</small><b>₹{Number(campaignDraft.budget || 0).toLocaleString('en-IN')}</b></div></div><div className="output-section"><h3>Suggested workstreams</h3><ul><li>Audience research and intent segmentation</li><li>Creative angles and message testing</li><li>Landing page and conversion tracking review</li><li>Weekly performance review and budget reallocation</li></ul></div><div className="output-actions"><Button variant="secondary" onClick={() => notify('Campaign brief export is a prototype action')}><Download size={14}/> Export brief</Button><Button onClick={() => notify('Approval workflow is not connected yet')}>Request review <ChevronRight size={14}/></Button></div></> : <EmptyState icon={Megaphone} title="Your campaign plan will appear here" detail="Complete the brief to create a structured draft with positioning, workstreams, budget and channel recommendations."/>}
            </section>
          </div>
          <section className="surface table-card"><div className="surface-heading"><div><h2>Campaign drafts</h2><p>Recent work in this demo workspace</p></div><span className="count-pill">{campaigns.length} drafts</span></div><div className="table-wrap"><table><thead><tr><th>CAMPAIGN</th><th>CHANNEL</th><th>OBJECTIVE</th><th>STATUS</th><th>UPDATED</th></tr></thead><tbody>{campaigns.map(c=><tr key={c.id}><td><b>{c.name}</b><small>Campaign #{c.id.toString().padStart(3,'0')}</small></td><td>{c.channel}</td><td>{c.objective}</td><td><span className={'status-badge '+statusClass(c.status)}>{c.status}</span></td><td>{c.updated}</td></tr>)}</tbody></table></div></section>
        </>}

        {active === 'BrandPilot AI' && <>
          <PageHeading eyebrow="BRAND INTELLIGENCE" title="BrandPilot AI" description="Create and maintain a consistent brand foundation across every touchpoint." action={<Button variant="secondary" onClick={() => notify('Brand kit export is a prototype action')}><Download size={14}/> Export brand kit</Button>}/>
          <div className="two-column">
            <section className="surface form-card"><div className="card-title"><div><h2>Brand foundation</h2><p>Define the identity and communication principles.</p></div><span className="step-tag">01 / IDENTITY</span></div>
              <label>Brand name<input value={brand.name} onChange={e=>{setBrand({...brand,name:e.target.value});setBrandSaved(false)}}/></label>
              <label>Industry<select value={brand.industry} onChange={e=>{setBrand({...brand,industry:e.target.value});setBrandSaved(false)}}><option>Professional services</option><option>Technology</option><option>Healthcare</option><option>Retail</option><option>Education</option><option>Financial services</option></select></label>
              <label>Brand personality<select value={brand.personality} onChange={e=>{setBrand({...brand,personality:e.target.value});setBrandSaved(false)}}><option>Confident and helpful</option><option>Bold and innovative</option><option>Warm and approachable</option><option>Premium and minimal</option><option>Technical and precise</option></select></label>
              <label>Primary audience<input value={brand.audience} onChange={e=>{setBrand({...brand,audience:e.target.value});setBrandSaved(false)}}/></label>
              <label>Brand voice<textarea rows={3} value={brand.voice} onChange={e=>{setBrand({...brand,voice:e.target.value});setBrandSaved(false)}}/></label>
              <Button onClick={() => {setBrandSaved(true);notify('Brand foundation saved in this session')}}><Check size={15}/> Save brand foundation</Button>
            </section>
            <section className="surface brand-preview-panel"><div className="surface-heading"><div><div className="eyebrow">LIVE BRAND PREVIEW</div><h2>{brand.name || 'Your brand'}</h2></div><span className="status-badge">{brandSaved ? 'Saved locally' : 'Unsaved changes'}</span></div>
              <div className="brand-canvas"><div className="brand-symbol">{(brand.name || 'N').slice(0,1).toUpperCase()}</div><div className="brand-canvas-name">{brand.name || 'Your brand'}</div><p>{brand.industry} · {brand.personality}</p><div className="palette"><span style={{background:'#28213f'}}/><span style={{background:'#7868d8'}}/><span style={{background:'#8fc6b4'}}/><span style={{background:'#e9d8c6'}}/><span style={{background:'#f7f5f0'}}/></div><div className="brand-type"><b>Clear ideas. Confident action.</b><span>Inter · Editorial serif accent</span></div></div>
              <div className="output-section"><h3>Voice principles</h3><div className="principle-list"><div><Check size={14}/><span><b>Clear</b><small>Use direct language and explain technical ideas.</small></span></div><div><Check size={14}/><span><b>Credible</b><small>Substantiate claims with proof and specifics.</small></span></div><div><Check size={14}/><span><b>Consistent</b><small>Keep tone and terminology aligned across channels.</small></span></div></div></div>
            </section>
          </div>
          <div className="section-title"><div><div className="eyebrow">CONTENT WORKSPACE</div><h2>Content pillars</h2></div><Button variant="secondary" onClick={() => notify('Content calendar generation is not connected')}><Plus size={14}/> Add content pillar</Button></div>
          <div className="pillar-grid">{[{n:'Expertise',d:'Practical explainers, guides and point-of-view content',c:'40%',tone:'violet'},{n:'Trust',d:'Case studies, testimonials and delivery proof',c:'30%',tone:'mint'},{n:'Education',d:'FAQs, checklists and decision support',c:'20%',tone:'amber'},{n:'Culture',d:'People, process and company values',c:'10%',tone:'blue'}].map(x=><div className="surface pillar-card" key={x.n}><div><b>{x.n}</b><span>{x.c}</span></div><p>{x.d}</p><div className="pillar-track"><i className={x.tone} style={{width:x.c}}/></div></div>)}</div>
        </>}

        {active === 'LeadHunter AI' && <>
          <PageHeading eyebrow="SALES INTELLIGENCE" title="LeadHunter AI" description="Manage prospects, prioritize fit and prepare thoughtful outreach." action={<Button onClick={() => setLeadModal(true)}><Plus size={15}/> Add prospect</Button>}/>
          <DemoNotice/>
          <div className="metrics-grid"><Metric label="TOTAL PROSPECTS" value={String(leads.length)} change="+2 this week" icon={Users}/><Metric label="QUALIFIED" value={String(qualified)} change="Rule-based demo" icon={Target} tone="mint"/><Metric label="AVG. LEAD SCORE" value={Math.round(leads.reduce((sum,l)=>sum+l.score,0)/Math.max(leads.length,1))+'/100'} change="Sample scoring" icon={Gauge} tone="amber"/><Metric label="OUTREACH SENT" value="0" change="Sending disabled" icon={Megaphone} tone="blue"/></div>
          <section className="surface table-card"><div className="surface-heading"><div><h2>Prospect pipeline</h2><p>Illustrative records. Contacts and companies are fictional sample data.</p></div><div className="table-tools"><select className="select-small" value={leadFilter} onChange={e=>setLeadFilter(e.target.value)}><option>All</option><option>New</option><option>Qualified</option><option>Contacted</option><option>Converted</option><option>Disqualified</option></select><Button variant="secondary" size="sm" onClick={() => notify('Filters are applied locally')}><Filter size={13}/> Filter</Button></div></div>
            <div className="table-wrap"><table><thead><tr><th>CONTACT</th><th>COMPANY</th><th>INDUSTRY</th><th>SOURCE</th><th>FIT SCORE</th><th>STATUS</th><th></th></tr></thead><tbody>{filteredLeads.map(l=><tr key={l.id}><td><div className="contact-cell"><span>{l.name.split(' ').map(n=>n[0]).join('')}</span><div><b>{l.name}</b><small>{l.email}</small></div></div></td><td>{l.company}</td><td>{l.industry}</td><td>{l.source}</td><td><div className="score-cell"><div className="score-track"><i style={{width:l.score+'%'}}/></div><b>{l.score}</b></div></td><td><span className={'status-badge '+statusClass(l.status)}>{l.status}</span></td><td><button className="row-menu" onClick={() => notify('Outreach draft for '+l.company+' prepared locally')} aria-label={'Prepare outreach for '+l.name}><MoreHorizontal size={17}/></button></td></tr>)}</tbody></table>{filteredLeads.length===0&&<EmptyState icon={Search} title="No matching prospects" detail="Try another search term or status filter."/>}</div>
          </section>
          <div className="two-column"><section className="surface"><div className="eyebrow">QUALIFICATION FRAMEWORK</div><h2>What makes a good-fit lead?</h2><div className="criteria-list">{[['Company fit','Industry, size and business model alignment'],['Intent signals','Relevant activity and stated requirements'],['Buying context','Role, influence and timing'],['Data quality','Verified source and usable contact details']].map(([a,b],i)=><div key={a}><span>0{i+1}</span><div><b>{a}</b><small>{b}</small></div></div>)}</div></section><section className="surface outreach-box"><span className="module-icon amber"><WandSparkles size={19}/></span><div className="eyebrow">OUTREACH COPILOT</div><h2>Start with relevance, not volume.</h2><p>Prepare context-aware outreach drafts for review. Sending stays disabled until an authorized email provider and approval policy are configured.</p><Button variant="secondary" onClick={() => notify('Select a prospect to prepare an outreach draft')}><Sparkles size={14}/> Prepare draft</Button></section></div>
        </>}

        {active === 'MarketPulse AI' && <>
          <PageHeading eyebrow="SEARCH + ANSWER ENGINE INTELLIGENCE" title="MarketPulse AI" description="Understand search opportunities and measure visibility with transparent methodology."/>
          <section className="surface audit-banner"><div><div className="eyebrow">NEW VISIBILITY REVIEW</div><h2>Where does your brand appear?</h2><p>Start with a domain to create a sample SEO and answer-engine review.</p></div><form className="domain-form" onSubmit={e=>{e.preventDefault();setAuditRan(true);notify('Illustrative visibility review generated')}}><label htmlFor="domain-input">Website domain</label><div><Globe2 size={16}/><input id="domain-input" value={domain} onChange={e=>setDomain(e.target.value)} placeholder="example.com" required/><Button type="submit">Run review <ArrowUpRight size={14}/></Button></div></form></section>
          {auditRan ? <><div className="metrics-grid"><Metric label="SAMPLE VISIBILITY INDEX" value="68.4" change="Illustrative score" icon={Gauge}/><Metric label="QUERY COVERAGE" value="42 / 60" change="Defined sample set" icon={Search} tone="mint"/><Metric label="CITATION OBSERVATIONS" value="18" change="Sample observations" icon={FileText} tone="amber"/><Metric label="CONTENT OPPORTUNITIES" value="12" change="Suggested topics" icon={Zap} tone="blue"/></div><div className="two-column"><section className="surface"><h2>Answer engine observation scope</h2>{['ChatGPT','Google AI Overviews','Perplexity','Microsoft Copilot','Gemini'].map((x,i)=><div className="engine-row" key={x}><span className="engine-logo">{['◎','G','P','M','✦'][i]}</span><b>{x}</b><span className="status-badge">Sample set</span></div>)}</section><section className="surface"><h2>Priority opportunities</h2>{[['Clarify core service pages','Add concrete use cases, locations and differentiators.'],['Publish expert answers','Address high-intent questions with verifiable sources.'],['Improve entity consistency','Align organization details and structured data.']].map(([a,b],i)=><div className="opportunity" key={a}><span>0{i+1}</span><div><b>{a}</b><p>{b}</p></div></div>)}</section></div></> : <div className="two-column market-intro"><section className="surface"><span className="module-icon blue"><Globe2 size={19}/></span><h2>Measure what can be observed.</h2><p>Track defined query sets, record timestamped observations and document source coverage. Avoid universal ranking claims when platforms do not expose complete data.</p><div className="feature-pills"><span>SEO opportunity</span><span>AEO observations</span><span>Competitor review</span></div></section><section className="surface"><h2>Review methodology</h2><div className="criteria-list">{[['Define query set','Choose branded and non-branded questions'],['Collect evidence','Use permitted sources and timestamp observations'],['Analyze coverage','Compare citations, pages and competitor mentions'],['Prioritize action','Create content and technical recommendations']].map(([a,b],i)=><div key={a}><span>0{i+1}</span><div><b>{a}</b><small>{b}</small></div></div>)}</div></section></div>}
          <DemoNotice/>
        </>}

        {active === 'CRM Hub' && <>
          <PageHeading eyebrow="CUSTOMER DATA PLATFORM" title="CRM Hub" description="A vendor-neutral workspace for canonical customer records and connector operations." action={<Button variant="secondary" onClick={() => notify('Connector setup requires OAuth configuration')}><Plus size={15}/> Add connector</Button>}/>
          <div className="metrics-grid"><Metric label="CANONICAL LEADS" value={String(leads.length)} change="Local demo records" icon={Users}/><Metric label="CONNECTED PROVIDERS" value="0" change="No OAuth connections" icon={Building2} tone="mint"/><Metric label="SYNC JOBS" value="3" change="Simulated activity" icon={Activity} tone="amber"/><Metric label="FAILED JOBS" value="0" change="Sample environment" icon={ShieldCheck} tone="blue"/></div>
          <div className="two-column"><section className="surface connector-panel"><div className="surface-heading"><div><h2>CRM connectors</h2><p>Connect providers to synchronize approved records.</p></div><span className="count-pill">0 active</span></div>{[{name:'HubSpot',desc:'Contacts, companies, deals and activities',tone:'orange',state:'Available'},{name:'Salesforce',desc:'Leads, accounts, opportunities and tasks',tone:'blue',state:'Planned'},{name:'Zoho CRM',desc:'Leads, contacts and deal pipeline',tone:'red',state:'Planned'},{name:'Pipedrive',desc:'People, organizations and deals',tone:'green',state:'Planned'},{name:'Microsoft Dynamics 365',desc:'Accounts, contacts and sales activities',tone:'blue',state:'Planned'}].map((x,i)=><div className="connector-item" key={x.name}><span className={'connector-logo '+x.tone}>{x.name.slice(0,1)}</span><div><b>{x.name}</b><small>{x.desc}</small></div><span className="connector-state">{x.state}</span><Button size="sm" variant="secondary" onClick={() => notify(x.name+' integration is not connected')}>{i===0?'Configure':'Details'}</Button></div>)}</section>
            <section className="surface"><div className="surface-heading"><div><h2>Sync activity</h2><p>Recent simulated connector events</p></div><button className="link-button" onClick={() => notify('No live sync history available')}>View log <ExternalLink size={12}/></button></div>{[{title:'Lead upsert · Demo CRM',time:'12 minutes ago'},{title:'Contact mapping · Demo CRM',time:'1 hour ago'},{title:'Activity sync · Demo CRM',time:'Yesterday'}].map(x=><div className="sync-event" key={x.title}><span><Check size={13}/></span><div><b>{x.title}</b><small>{x.time}</small></div><em>Simulated</em></div>)}<div className="callout-note"><ShieldCheck size={16}/><p>External CRM records have not been read or modified. OAuth, field mapping and tenant-level permissions are not configured.</p></div></section></div>
          <section className="surface data-model"><div className="eyebrow">CANONICAL DATA MODEL</div><h2>One internal model. Multiple CRM providers.</h2><p>Normalize records before syncing to avoid vendor-specific coupling.</p><div className="schema-chips">{['Lead','Contact','Account','Campaign','Opportunity','Activity','Engagement','Attribution'].map(x=><span key={x}>{x}</span>)}</div></section>
        </>}

        {active === 'Settings' && <>
          <PageHeading eyebrow="WORKSPACE ADMINISTRATION" title="Settings" description="Manage workspace preferences and review platform configuration."/>
          <div className="settings-layout"><nav className="settings-nav">{['General','Team & access','AI providers','Integrations','Security','Usage & billing'].map((x,i)=><button key={x} className={settingsTab===x?'selected':''} onClick={() => setSettingsTab(x)}>{[Building2,Users,Bot,BriefcaseBusiness,ShieldCheck,CreditCard].map((I,j)=>i===j?<I size={16} key={x}/>:null)}{x}<ChevronRight size={14}/></button>)}</nav>
            <section className="surface settings-content">{settingsTab==='General'&&<><div className="card-title"><div><h2>General settings</h2><p>Basic details for this workspace.</p></div></div><label>Workspace name<input value={workspaceName} onChange={e=>setWorkspaceName(e.target.value)}/></label><label>Workspace slug<input value="northstar-agency" readOnly/></label><label>Default timezone<select value={timezone} onChange={e=>setTimezone(e.target.value)}><option>Asia/Kolkata</option><option>UTC</option><option>America/New_York</option><option>Europe/London</option></select></label><div className="settings-save"><Button onClick={() => notify('Workspace preferences saved in this session')}>Save changes</Button></div></>}
              {settingsTab==='Team & access'&&<><h2>Team & access</h2><p>Role-based access controls are planned for the authenticated platform.</p>{[['Yashas Prakash','yashas@example.com','Owner'],['Workspace teammate','Invite pending','Member']].map(x=><div className="team-row" key={x[0]}><span className="profile-avatar">{x[0].split(' ').map(y=>y[0]).join('').slice(0,2)}</span><div><b>{x[0]}</b><small>{x[1]}</small></div><span className="status-badge">{x[2]}</span></div>)}<Button variant="secondary" onClick={() => notify('Invitations are not enabled until authentication is configured')}><Plus size={14}/> Invite teammate</Button></>}
              {settingsTab==='AI providers'&&<><h2>AI provider configuration</h2><p>No model provider credentials are configured. Add keys through the server-side secret manager, never browser storage.</p>{['OpenAI-compatible API','Anthropic-compatible API','Self-hosted model endpoint'].map(x=><div className="setting-line" key={x}><div><b>{x}</b><small>Credentials not configured</small></div><span className="status-badge">Not connected</span></div>)}</>}
              {settingsTab==='Integrations'&&<><h2>Connected applications</h2><p>External providers are not connected in this prototype.</p>{['Google Ads','Meta Ads','HubSpot','Salesforce','Google Analytics'].map(x=><div className="setting-line" key={x}><div><b>{x}</b><small>OAuth authorization required</small></div><Button variant="secondary" size="sm" onClick={() => notify(x+' setup is not connected')}>Configure</Button></div>)}</>}
              {settingsTab==='Security'&&<><h2>Security posture</h2><p>These controls describe the planned production configuration; they are not active security guarantees yet.</p>{[['Authentication','Not configured'],['Workspace isolation','Schema designed; enforcement pending'],['Audit events','Database model created'],['Session management','Pending implementation'],['Secret storage','Server-side configuration required']].map(x=><div className="setting-line" key={x[0]}><b>{x[0]}</b><span>{x[1]}</span></div>)}</>}
              {settingsTab==='Usage & billing'&&<><h2>Usage & billing</h2><p>Illustrative allowance for the prototype. No payment method or billing provider is connected.</p><div className="billing-card"><span>DEMO PLAN</span><b>Free workspace</b><div className="progress"><i style={{width:'78%'}}/></div><small>7,840 / 10,000 sample AI credits used</small></div></>}
            </section>
          </div>
        </>}
        <footer className="app-footer"><span><Sparkles size={13}/> AI Growth Studio <i/> Prototype environment</span><span>Built for intelligent growth · 2026</span></footer>
      </div>
    </section>

    {leadModal && <div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setLeadModal(false)}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title"><div className="modal-head"><div><div className="eyebrow">LEADHUNTER AI</div><h2 id="lead-modal-title">Add a prospect</h2><p>Add a sample record to this session.</p></div><button className="icon-button" onClick={() => setLeadModal(false)} aria-label="Close"><X size={18}/></button></div><form onSubmit={addLead}><label>Contact name<input required value={leadDraft.name} onChange={e=>setLeadDraft({...leadDraft,name:e.target.value})} placeholder="Full name"/></label><label>Company<input required value={leadDraft.company} onChange={e=>setLeadDraft({...leadDraft,company:e.target.value})} placeholder="Company name"/></label><label>Email<input type="email" value={leadDraft.email} onChange={e=>setLeadDraft({...leadDraft,email:e.target.value})} placeholder="name@company.com"/></label><div className="form-row"><label>Industry<select value={leadDraft.industry} onChange={e=>setLeadDraft({...leadDraft,industry:e.target.value})}><option>Technology</option><option>Healthcare</option><option>Retail</option><option>Financial services</option><option>Education</option></select></label><label>Source<select value={leadDraft.source} onChange={e=>setLeadDraft({...leadDraft,source:e.target.value})}><option>Website</option><option>LinkedIn</option><option>Referral</option><option>Webinar</option></select></label></div><div className="modal-actions"><Button variant="secondary" onClick={() => setLeadModal(false)}>Cancel</Button><Button type="submit"><Plus size={14}/> Add prospect</Button></div></form></section></div>}
    {toast && <div className="toast" role="status"><Check size={15}/>{toast}<button onClick={() => setToast('')} aria-label="Dismiss"><X size={13}/></button></div>}
  </main>
}
