import { createContext, useState, useContext, useCallback } from 'react'
import blogService from '../services/blogs'

const environment = createContext({})
const getInitialUser = () => {
  const loggedUser = window.localStorage.getItem('blogUser')
  if (!loggedUser) return {}
  const user = JSON.parse(loggedUser)
  blogService.setToken(user.token)
  return { user }
}

export const EnvironmentProvider = ({ children }) => {
  const env = useState(getInitialUser)
  return <environment.Provider value={env}>{children}</environment.Provider>
}

// TODO: Notifications can be abstracted to their own hook
export const useEnvironment = () => {
  const [context, setContext] = useContext(environment)

  const login = useCallback(
    (user) => {
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setContext((prev) => ({
        ...prev,
        user,
      }))
    },
    [setContext]
  )

  const logout = useCallback(() => {
    window.localStorage.removeItem('blogUser')
    setContext((prev) => ({
      ...prev,
      user: null,
    }))
  }, [setContext])

  const showNotification = useCallback((message, status) => {
    setContext((prev) => {
      if (prev.notification) {
        // clear the timer if there is a notification clear pending
        clearTimeout(prev.notification.timerId)
      }

      const newTimerId = setTimeout(() => {
        setContext((prev) => ({
          ...prev,
          notification: null,
        }))
      }, 5000)
      return {
        ...prev,
        notification: {
          timerId: newTimerId,
          message,
          status,
        },
      }
    })
  }, [])

  return {
    showNotification,
    notification: context.notification,
    login,
    logout,
    user: context.user,
  }
}
