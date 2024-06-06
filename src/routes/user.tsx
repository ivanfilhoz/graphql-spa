import { UserDetailsForm } from '@/components/user-details-form'
import { useAuth } from '@/lib/auth'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

export default function User() {
  const { t } = useTranslation()
  const { getUserId } = useAuth()

  if (!getUserId()) {
    return <Navigate to='/login' />
  }

  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          {t('user_title')}
        </h1>
        <p className='text-sm text-muted-foreground'>{t('user_subtitle')}</p>
      </div>
      <UserDetailsForm />
    </div>
  )
}
