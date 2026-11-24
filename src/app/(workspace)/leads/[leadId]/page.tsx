import {ResourceDetailPage} from '@/features/resources/resource-detail'
export default async function Page({params}:{params:Promise<{leadId:string}>}){const {leadId}=await params;return <ResourceDetailPage resource="leads" id={leadId} path="/leads"/>}
