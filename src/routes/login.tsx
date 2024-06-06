import { UserAuthForm } from '@/components/user-auth-form'
import { useAuth } from '@/lib/auth'
import { Trans, useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const { t } = useTranslation()
  const { getUserId } = useAuth()

  if (getUserId()) {
    return <Navigate to='/user' />
  }

  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          {t('login_title')}
        </h1>
        <p className='text-sm text-muted-foreground'>{t('login_subtitle')}</p>
      </div>
      <UserAuthForm />
      <p className='px-8 text-center text-sm text-muted-foreground'>
        <Trans i18nKey='login_terms'>
          By clicking continue, you agree to our{' '}
          <a
            href='#terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href='#privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            Privacy Policy
          </a>
          .
        </Trans>
      </p>
    </div>
  )
}
