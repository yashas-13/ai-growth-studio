import {ResourceDetailPage} from '@/features/resources/resource-detail'
export default async function Page({params}:{params:Promise<{campaignId:string}>}){const {campaignId}=await params;return <ResourceDetailPage resource="campaigns" id={campaignId} path="/campaigns"/>}
