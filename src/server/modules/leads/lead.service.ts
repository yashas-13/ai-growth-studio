import 'server-only'
import {createClient} from '@/lib/supabase/server'
import type {CreateLeadInput} from '@/lib/validation'
import {listWorkspaceLeads,encodeLeadCursor,type ListLeadsQuery} from './lead.repository'
export async function getLeads(workspaceId:string,q:ListLeadsQuery){const rows=await listWorkspaceLeads(workspaceId,q),hasMore=rows.length>q.take,items=hasMore?rows.slice(0,q.take):rows;return {items,nextCursor:hasMore&&items.length?encodeLeadCursor(items[items.length-1]):null}}
export async function addLead(workspaceId:string,actorUserId:string,input:CreateLeadInput){const s=await createClient();const {data:lead,error}=await s.from('leads').insert({workspace_id:workspaceId,name:input.name,company:input.company,email:input.email??null,industry:input.industry??null,source:input.source??null,created_by:actorUserId}).select().single();if(error)throw error;return lead}
