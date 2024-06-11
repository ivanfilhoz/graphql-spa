import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom/vitest'
import { render, waitFor } from '@testing-library/react'
import { beforeEach } from 'node:test'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { UserQuery } from '../src/lib/queries'
import User from '../src/routes/user'

const router = createBrowserRouter([
  {
    path: '/',
    element: <User />
  }
])

const Page = () => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: UserQuery,
          variables: {
            id: '1'
          }
        },
        result: {
          data: {
            user: {
              id: '1',
              email: 'name@acme.com',
              firstName: 'John',
              lastName: 'Doe'
            }
          }
        }
      }
    ]}
  >
    <RouterProvider router={router} />
  </MockedProvider>
)

describe('/user', () => {
  beforeEach(() => {
    vi.mock('../src/lib/auth', () => {
      return {
        useAuth: () => ({ getUserId: () => '1' })
      }
    })
  })

  it('should render first name and last name inputs', () => {
    const { getByLabelText } = render(<Page />)
    waitFor(() => {
      expect(getByLabelText('user_firstname')).toBeInTheDocument()
      expect(getByLabelText('user_lastname')).toBeInTheDocument()
    })
  })

  it('should render logout button', () => {
    const { getByText } = render(<Page />)
    waitFor(() => {
      expect(getByText('user_signout')).toBeInTheDocument()
    })
  })
})
