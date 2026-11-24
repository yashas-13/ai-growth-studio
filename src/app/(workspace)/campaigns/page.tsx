import {ResourcePage} from '@/features/resources/resource-page'
export default async function Page({searchParams}:{searchParams:Promise<{error?:string;saved?:string;deleted?:string}>}){return <ResourcePage resource="campaigns" path="/campaigns" searchParams={searchParams}/>}
