import { UserDetailsForm } from '@/components/user-details-form'
import { useAuth } from '@/lib/auth'
import { Navigate } from 'react-router-dom'

export default function User() {
  const { getUserId } = useAuth()

  if (!getUserId()) {
    return <Navigate to='/login' />
  }

  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>My Account</h1>
        <p className='text-sm text-muted-foreground'>See your details below</p>
      </div>
      <UserDetailsForm />
    </div>
  )
}
