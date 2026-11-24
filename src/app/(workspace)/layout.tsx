import type {ReactNode} from 'react'
import {redirect} from 'next/navigation'
import {createClient} from '@/lib/supabase/server'
export const dynamic='force-dynamic'
export default async function WorkspaceLayout({children}:{children:ReactNode}){const s=await createClient();const {data,error}=await s.auth.getClaims();const claims=data?.claims;if(error||!claims?.sub)redirect('/login');const {data:membership,error:membershipError}=await s.from('memberships').select('workspace_id').eq('user_id',claims.sub).limit(1).maybeSingle();if(membershipError)throw new Error('Unable to load workspace membership');if(!membership)redirect('/onboarding');return children}
