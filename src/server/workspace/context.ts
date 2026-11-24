import 'server-only'
import {redirect} from 'next/navigation'
import {createClient} from '@/lib/supabase/server'
export async function getWorkspaceContext(){
 const supabase=await createClient()
 const {data,error}=await supabase.auth.getClaims()
 const claims=data?.claims
 if(error||!claims?.sub)redirect('/login')
 const {data:membership,error:membershipError}=await supabase.from('memberships').select('workspace_id,role').eq('user_id',claims.sub).limit(1).maybeSingle()
 if(membershipError)throw new Error('Unable to load workspace membership')
 if(!membership)redirect('/onboarding')
 const {data:workspace,error:workspaceError}=await supabase.from('workspaces').select('id,name,slug').eq('id',membership.workspace_id).single()
 if(workspaceError||!workspace)throw new Error('Unable to load workspace')
 return {supabase,userId:claims.sub as string,email:typeof claims.email==='string'?claims.email:'',role:membership.role,workspace}
}
