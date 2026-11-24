import {ResourcePage} from '@/features/resources/resource-page'
export default async function Page({searchParams}:{searchParams:Promise<{error?:string;saved?:string;deleted?:string}>}){return <ResourcePage resource="brand_profiles" path="/brand" searchParams={searchParams}/>}
