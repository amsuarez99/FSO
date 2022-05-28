import { useEnvironment } from "../hooks/useEnvironment"
import { useForm } from "../hooks/useForm"
import loginService from "../services/login"

export const LogIn = () => {
  const { login } = useEnvironment()
  const [credentials, handleChange, reset] = useForm({
    username: '',
    password: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    loginService.login(credentials)
      .then(login)
      .catch(console.error)
      .finally(() => reset)
  }

  return (
  <>
    <h1>Log in to application</h1>
    <form>
      <label>
        username
        <input type='text' name='username' value={credentials.username ?? ''} onChange={handleChange} />
      </label>
      <label>
        password
        <input type='text' name='password' value={credentials.password ?? ''} onChange={handleChange} />
      </label>
      <button type='submit' onClick={handleSubmit}>
        Login
      </button>
    </form>
  </>
  )
}

export const LogOut = () => {
  const {logout} = useEnvironment()
  return <button onClick={logout}>LogOut</button>
}
