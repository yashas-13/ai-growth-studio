import Link from 'next/link'

export function FeaturePlaceholder({ area, title, description, phase = 'Planned' }: { area: string; title: string; description: string; phase?: string }) {
  return <main className="placeholder-shell"><div className="eyebrow">{area.toUpperCase()}</div><span className="status-badge">{phase}</span><h1>{title}</h1><p>{description}</p><section><b>Implementation boundary</b><p>This route is scaffolded for navigation and information architecture. Its data model, API contract, authorization policy, loading/error states and workflow will be implemented before it is enabled for production users.</p></section><Link href="/dashboard">Back to workspace</Link></main>
}
