'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { LoginMutation } from '@/queries'
import { useMutation } from '@apollo/client'
import { LoaderCircleIcon } from 'lucide-react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast()
  const { signIn } = useAuth()

  const [login, { loading }] = useMutation(LoginMutation, {
    onError: () => {
      toast({
        title: 'Oops!',
        description:
          'Could not log in. Please check your credentials and try again.'
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
              Email
            </Label>
            <Input
              id='email'
              name='email'
              placeholder='name@example.com'
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
              Password
            </Label>
            <Input
              id='password'
              name='password'
              placeholder='password'
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
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}
