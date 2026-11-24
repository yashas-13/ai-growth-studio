'use server'
import {redirect} from 'next/navigation'
import {createClient} from '@/lib/supabase/server'
import {ensurePersonalWorkspace} from '@/server/auth/workspace-provisioning'
export async function createWorkspaceAction(f:FormData){const name=String(f.get('workspace_name')??'').trim();if(name.length<2||name.length>120)redirect('/onboarding?error=Workspace%20name%20must%20be%202-120%20characters');const s=await createClient();const {data,error}=await s.auth.getClaims();const claims=data?.claims;if(error||!claims?.sub)redirect('/login');try{await ensurePersonalWorkspace(s,claims.sub,name)}catch{redirect('/onboarding?error=Unable%20to%20create%20workspace')}redirect('/dashboard')}
