import { UserAuthForm } from '@/components/user-auth-form'
import { useAuth } from '@/lib/auth'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const { getUserId } = useAuth()

  if (getUserId()) {
    return <Navigate to='/user' />
  }

  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Sign In</h1>
        <p className='text-sm text-muted-foreground'>
          Enter your credentials below to continue
        </p>
      </div>
      <UserAuthForm />
      <p className='px-8 text-center text-sm text-muted-foreground'>
        By clicking continue, you agree to our{' '}
        <a href='#' className='underline underline-offset-4 hover:text-primary'>
          Terms of Service
        </a>{' '}
        and{' '}
        <a href='#' className='underline underline-offset-4 hover:text-primary'>
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}
