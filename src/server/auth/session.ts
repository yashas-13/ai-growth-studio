import 'server-only'
import {createClient} from '@/lib/supabase/server'
export type AuthenticatedSession={user:{id:string;email:string};sessionId:string}
export async function getAuthenticatedSession():Promise<AuthenticatedSession|null>{const s=await createClient();const {data,error}=await s.auth.getClaims();const claims=data?.claims;if(error||!claims?.sub)return null;return {user:{id:claims.sub,email:typeof claims.email==='string'?claims.email:''},sessionId:typeof claims.session_id==='string'?claims.session_id:claims.sub}}
