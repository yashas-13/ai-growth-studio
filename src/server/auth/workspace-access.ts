import 'server-only'
import {createClient} from '@/lib/supabase/server'
import {AppError} from '@/server/http/app-error'
import {getAuthenticatedSession} from './session'
export type WorkspacePermission='workspace:read'|'workspace:write'|'workspace:admin'
const permissions:Record<string,WorkspacePermission[]>={OWNER:['workspace:read','workspace:write','workspace:admin'],ADMIN:['workspace:read','workspace:write','workspace:admin'],MEMBER:['workspace:read','workspace:write'],VIEWER:['workspace:read']}
export async function requireWorkspaceAccess(workspaceId:string,permission:WorkspacePermission){const session=await getAuthenticatedSession();if(!session)throw new AppError('UNAUTHENTICATED','Authentication is required');const s=await createClient();const {data,error}=await s.from('memberships').select('role').eq('user_id',session.user.id).eq('workspace_id',workspaceId).maybeSingle();if(error)throw new AppError('INTERNAL_ERROR','Unable to verify workspace membership');if(!data)throw new AppError('FORBIDDEN','You do not have access to this workspace');if(!permissions[data.role]?.includes(permission))throw new AppError('FORBIDDEN','Your workspace role does not allow this action');return {userId:session.user.id,workspaceId,role:data.role}}
