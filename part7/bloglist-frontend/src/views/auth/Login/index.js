import { useDispatch } from 'react-redux'
import { login } from '../../../reducers/userReducer'
import { useForm } from '../../../hooks/useForm'

const Login = () => {
  const [credentials, handleChange, reset] = useForm({
    username: '',
    password: '',
  })
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(login(credentials))
    reset()
  }

  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleSubmit}>
        <label>
          username
          <input
            id="username"
            type="text"
            name="username"
            value={credentials.username ?? ''}
            onChange={handleChange}
          />
        </label>
        <label>
          password
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password ?? ''}
            onChange={handleChange}
          />
        </label>
        <button id="login" type="submit">
          Login
        </button>
      </form>
    </>
  )
}

export default Login
