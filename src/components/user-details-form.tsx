'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth'
import { UserQuery } from '@/lib/queries'
import { cn } from '@/lib/utils'
import { useQuery } from '@apollo/client'
import { LoaderCircleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface UserDetailsFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserDetailsForm({ className, ...props }: UserDetailsFormProps) {
  const { t } = useTranslation()
  const { getUserId, signOut } = useAuth()
  const { loading, error, data } = useQuery(UserQuery, {
    variables: { id: getUserId() },
    onCompleted: (data) => {
      console.log('User details:', data)
    }
  })

  if (loading) {
    return (
      <div className='flex justify-center p-8'>
        <LoaderCircleIcon className='w-6 h-6 animate-spin' />
      </div>
    )
  }

  if (error) {
    console.error(error)

    return (
      <div className='flex flex-col gap-2'>
        <p className='px-8 text-center text-sm text-muted-foreground'>
          {t('user_error')}
        </p>
        <Button variant='ghost' className='self-center' onClick={signOut}>
          {t('user_signout')}
        </Button>
      </div>
    )
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className='flex flex-col gap-2'>
        <div className='grid gap-1'>
          <Label htmlFor='email'>{t('user_firstname')}</Label>
          <Input
            id='firstName'
            name='firstName'
            defaultValue={data?.user?.firstName || ''}
            autoCapitalize='none'
            autoCorrect='off'
            disabled
          />
        </div>
        <div className='grid gap-1'>
          <Label htmlFor='lastName'>{t('user_lastname')}</Label>
          <Input
            id='lastName'
            name='lastName'
            defaultValue={data?.user?.lastName || ''}
            autoCapitalize='none'
            autoCorrect='off'
            disabled
          />
        </div>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
        </div>
        <Button variant='ghost' onClick={signOut}>
          {t('user_signout')}
        </Button>
      </div>
    </div>
  )
}
