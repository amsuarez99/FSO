import { useEnvironment } from "../hooks/useEnvironment"
import { useForm } from "../hooks/useForm"
import loginService from "../services/login"

export const LogIn = () => {
  const { login, showNotification } = useEnvironment()
  const [credentials, handleChange, reset] = useForm({
    username: '',
    password: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    loginService.login(credentials)
      .then((loggedUser) => {
        login(loggedUser)
        showNotification(`${loggedUser.username} has logged in`, 'success')
      })
      .catch((error) => {
        showNotification(`Could not log in`, 'danger')
        console.error(error)
      })
      .finally(() => reset())
  }

  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleSubmit}>
        <label>
          username
          <input type='text' name='username' value={credentials.username ?? ''} onChange={handleChange} />
        </label>
        <label>
          password
          <input type='password' name='password' value={credentials.password ?? ''} onChange={handleChange} />
        </label>
        <button type='submit'>
          Login
        </button>
      </form>
    </>
  )
}

export const LogOut = () => {
  const { logout } = useEnvironment()
  return <button onClick={logout}>LogOut</button>
}
