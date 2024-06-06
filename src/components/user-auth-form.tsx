'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/auth'
import { LoginMutation } from '@/lib/queries'
import { cn } from '@/lib/utils'
import { useMutation } from '@apollo/client'
import { LoaderCircleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { signIn } = useAuth()

  const [login, { loading }] = useMutation(LoginMutation, {
    onError: () => {
      toast({
        title: t('login_error_title'),
        description: t('login_error_description')
      })
    },
    onCompleted: (data) => {
      signIn(data.login.jwt)
    }
  })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    login({
      variables: {
        identifier: data.get('email') as string,
        password: data.get('password') as string
      }
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              {t('login_email')}
            </Label>
            <Input
              id='email'
              name='email'
              placeholder={t('login_email_placeholder')}
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={loading}
              required
            />
          </div>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='password'>
              {t('login_password')}
            </Label>
            <Input
              id='password'
              name='password'
              placeholder={t('login_password_placeholder')}
              type='password'
              autoCapitalize='none'
              autoCorrect='off'
              disabled={loading}
              required
            />
          </div>
          <Button disabled={loading}>
            {loading && (
              <LoaderCircleIcon className='mr-2 h-4 w-4 animate-spin' />
            )}
            {t('login_continue')}
          </Button>
        </div>
      </form>
    </div>
  )
}
