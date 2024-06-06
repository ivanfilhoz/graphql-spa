'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { UserQuery } from '@/queries'
import { useQuery } from '@apollo/client'
import { LoaderCircleIcon } from 'lucide-react'

interface UserDetailsFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserDetailsForm({ className, ...props }: UserDetailsFormProps) {
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
          An error occurred while fetching your details. Please try again later.
        </p>
        <Button variant='ghost' className='self-center' onClick={signOut}>
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className='grid gap-2'>
        <div className='grid gap-1'>
          <Label htmlFor='email'>First name</Label>
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
          <Label htmlFor='lastName'>Last name</Label>
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
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>Or</span>
          </div>
        </div>
        <Button variant='ghost' onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </div>
  )
}
