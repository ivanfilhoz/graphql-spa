import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { useAuth } from '@/lib/auth'
import { resources, setLanguageConfig } from '@/lib/i18n'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function Root() {
  const { t, i18n } = useTranslation()
  const { getUserId } = useAuth()
  const { pathname } = useLocation()

  if (pathname === '/') {
    return getUserId() ? <Navigate to='/user' /> : <Navigate to='/login' />
  }

  const setLang = (language: keyof typeof resources) => {
    i18n.changeLanguage(language)
    setLanguageConfig(language)
  }

  return (
    <div className='container relative flex h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          Acme Inc
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>&ldquo;{t('root_phrase')}&rdquo;</p>
            <footer className='text-sm'>Dieter Rams</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='absolute top-4 right-4 flex gap-1'>
          {Object.keys(resources).map((lang) => (
            <Button
              key={lang}
              variant='ghost'
              size='sm'
              onClick={() => setLang(lang as keyof typeof resources)}
            >
              {lang.toUpperCase()}
            </Button>
          ))}
        </div>
        <Outlet />
        <Toaster />
      </div>
    </div>
  )
}
