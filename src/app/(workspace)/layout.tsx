import type {ReactNode} from 'react'
import {WorkspaceShell} from '@/features/workspace/components/workspace-shell'
import {getWorkspaceContext} from '@/server/workspace/context'
export const dynamic='force-dynamic'
export default async function WorkspaceLayout({children}:{children:ReactNode}){const {workspace,email,role}=await getWorkspaceContext();return <WorkspaceShell workspace={workspace} email={email} role={role}>{children}</WorkspaceShell>}
