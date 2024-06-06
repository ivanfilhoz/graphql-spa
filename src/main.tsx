import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  concat
} from '@apollo/client'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './globals.css'
import './lib/i18n'

import { getToken } from '@/lib/auth'
import Login from './routes/login'
import Root from './routes/root'
import User from './routes/user'

const httpLink = new HttpLink({
  uri: 'https://cms.trial-task.k8s.ext.fcse.io/graphql'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getToken()

  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'user',
        element: <User />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
)
