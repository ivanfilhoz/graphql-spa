import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const TOKEN_KEY = 'token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function useAuth() {
  const navigate = useNavigate()
  const client = useApolloClient()

  const signIn = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    client.clearStore()
    navigate('/')
  }

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY)
    client.clearStore()
    navigate('/')
  }

  const getUserId = () => {
    const token = getToken()

    if (!token) {
      return null
    }

    try {
      const [, payload] = token.split('.')
      const data = JSON.parse(atob(payload))
      return data.id
    } catch (error) {
      return null
    }
  }

  return { signIn, signOut, getUserId }
}
