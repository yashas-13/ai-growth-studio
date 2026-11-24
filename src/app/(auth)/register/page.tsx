import {AuthPage} from '@/features/auth/components/auth-page'
export default async function Page({searchParams}:{searchParams:Promise<{error?:string;message?:string}>}){const p=await searchParams;return <AuthPage mode="register" error={p.error} message={p.message}/>}
