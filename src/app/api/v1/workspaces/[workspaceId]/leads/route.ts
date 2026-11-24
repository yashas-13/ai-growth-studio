import {NextRequest} from 'next/server'
import {z} from 'zod'
import {createLeadSchema} from '@/lib/validation'
import {AppError} from '@/server/http/app-error'
import {requireWorkspaceAccess} from '@/server/auth/workspace-access'
import {failure,success} from '@/server/http/api-response'
import {getLeads,addLead} from '@/server/modules/leads/lead.service'
export const runtime='nodejs'
export const dynamic='force-dynamic'
const querySchema=z.object({q:z.string().trim().max(120).optional(),status:z.enum(['NEW','QUALIFIED','CONTACTED','CONVERTED','DISQUALIFIED']).optional(),take:z.coerce.number().int().min(1).max(100).default(25),cursor:z.string().max(256).optional()})
type RouteContext={params:Promise<{workspaceId:string}>}
export async function GET(request:NextRequest,{params}:RouteContext){try{const {workspaceId}=await params;z.uuid().parse(workspaceId);await requireWorkspaceAccess(workspaceId,'workspace:read');const q=querySchema.parse(Object.fromEntries(request.nextUrl.searchParams));return success(await getLeads(workspaceId,{search:q.q,status:q.status,take:q.take,cursor:q.cursor}))}catch(error){return failure(error)}}
export async function POST(request:NextRequest,{params}:RouteContext){try{const {workspaceId}=await params;z.uuid().parse(workspaceId);const actor=await requireWorkspaceAccess(workspaceId,'workspace:write');if(!request.headers.get('content-type')?.toLowerCase().includes('application/json'))throw new AppError('BAD_REQUEST','Content-Type must be application/json');const body=await request.text();if(Buffer.byteLength(body,'utf8')>16*1024)throw new AppError('BAD_REQUEST','Request body exceeds 16 KB');const input=createLeadSchema.parse(JSON.parse(body));return success(await addLead(workspaceId,actor.userId,input),201)}catch(error){return failure(error)}}
