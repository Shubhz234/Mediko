import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='flex items-center h-screen justify-center bg-black/45'><SignIn /></div>
}