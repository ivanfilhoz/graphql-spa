import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom/vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LoginMutation } from '../src/lib/queries'
import Login from '../src/routes/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  }
])

const Page = () => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: LoginMutation,
          variables: {
            identifier: 'name@acme.com',
            password: 'password'
          }
        },
        result: {
          data: {
            login: {
              jwt: 'mockjwt'
            }
          }
        }
      }
    ]}
  >
    <RouterProvider router={router} />
  </MockedProvider>
)

describe('/login', () => {
  it('should render email and password inputs', () => {
    const { getByPlaceholderText } = render(<Page />)
    expect(getByPlaceholderText('login_email_placeholder')).toBeInTheDocument()
    expect(
      getByPlaceholderText('login_password_placeholder')
    ).toBeInTheDocument()
  })

  it('should render login button', () => {
    const { getByText } = render(<Page />)
    expect(getByText('login_continue')).toBeInTheDocument()
  })
})
