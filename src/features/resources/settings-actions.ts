'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {z} from 'zod'
import type {Json} from '@/types/database'
import {getWorkspaceContext} from '@/server/workspace/context'
const zones=['Asia/Kolkata','UTC','America/New_York','Europe/London','Asia/Singapore'],locales=['en-IN','en-US','en-GB']
export async function saveWorkspacePreferences(form:FormData){
 const name=String(form.get('name')??'').trim(),timezone=String(form.get('timezone')??'Asia/Kolkata'),locale=String(form.get('locale')??'en-IN'),{supabase,userId,workspace,role}=await getWorkspaceContext()
 if(!['OWNER','ADMIN'].includes(role))redirect('/settings?error=Only%20workspace%20admins%20can%20change%20settings')
 if(name.length<2||name.length>120||!zones.includes(timezone)||!locales.includes(locale))redirect('/settings?error=Invalid%20workspace%20preferences')
 const {error}=await supabase.from('workspaces').update({name}).eq('id',workspace.id);if(error)redirect('/settings?error='+encodeURIComponent(error.message))
 const {error:prefsError}=await supabase.from('workspace_preferences').upsert({workspace_id:workspace.id,timezone,locale,updated_by:userId});if(prefsError)redirect('/settings?error='+encodeURIComponent(prefsError.message))
 revalidatePath('/settings');revalidatePath('/dashboard');redirect('/settings?saved=1')
}
export async function saveProviderConnection(form:FormData){
 const category=String(form.get('category')??''),provider=String(form.get('provider')??'').trim().toLowerCase(),display_name=String(form.get('display_name')??'').trim(),endpoint=String(form.get('endpoint')??'').trim(),model=String(form.get('model')??'').trim(),enabled=form.get('enabled')==='on'
 if(!['AI','ADS','ANALYTICS','CRM','EMAIL'].includes(category)||! /^[a-z0-9_-]{2,80}$/.test(provider)||!display_name||display_name.length>120)redirect('/settings/ai?error=Invalid%20provider%20configuration')
 if(endpoint&&!z.url().safeParse(endpoint).success)redirect('/settings/ai?error=Endpoint%20must%20be%20a%20valid%20URL')
 const {supabase,userId,workspace,role}=await getWorkspaceContext();if(!['OWNER','ADMIN'].includes(role))redirect('/settings/ai?error=Only%20workspace%20admins%20can%20configure%20providers')
 const {error}=await supabase.from('provider_connections').upsert({workspace_id:workspace.id,category,provider,display_name,endpoint:endpoint||null,model:model||null,enabled,status:'NOT_CONFIGURED',created_by:userId,settings:{secret_storage:'environment_or_vault_only'}},{onConflict:'workspace_id,category,provider'})
 if(error)redirect('/settings/ai?error='+encodeURIComponent(error.message));revalidatePath('/settings/ai');revalidatePath('/settings/integrations');redirect('/settings/ai?saved=1')
}
export async function updateMemberRole(form:FormData){
 const id=String(form.get('id')??''),role=String(form.get('role')??'');if(!z.uuid().safeParse(id).success||!['ADMIN','MEMBER','VIEWER'].includes(role))redirect('/settings/team?error=Invalid%20membership%20update')
 const {supabase,workspace,role:actor}=await getWorkspaceContext();if(actor!=='OWNER')redirect('/settings/team?error=Only%20the%20workspace%20owner%20can%20change%20roles')
 const {error}=await supabase.from('memberships').update({role:role as 'ADMIN'|'MEMBER'|'VIEWER'}).eq('id',id).eq('workspace_id',workspace.id);if(error)redirect('/settings/team?error='+encodeURIComponent(error.message));revalidatePath('/settings/team');redirect('/settings/team?saved=1')
}
export async function saveNotificationPreferences(form:FormData){
 const events=['security_alerts','campaign_approvals','lead_assignment','ai_usage_threshold','connector_sync_failures'] as const
 const preferences=Object.fromEntries(events.map(k=>[k,form.get(k)==='on'])) as Record<typeof events[number],boolean>
 const {supabase,userId,workspace,role}=await getWorkspaceContext();if(!['OWNER','ADMIN'].includes(role))redirect('/settings/notifications?error=Only%20workspace%20admins%20can%20change%20notification%20preferences')
 const {error}=await supabase.from('workspace_preferences').upsert({workspace_id:workspace.id,updated_by:userId,notification_preferences:preferences as Json})
 if(error)redirect('/settings/notifications?error='+encodeURIComponent(error.message));revalidatePath('/settings/notifications');redirect('/settings/notifications?saved=1')
}
