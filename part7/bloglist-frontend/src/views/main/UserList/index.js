import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'

const Users = () => {
  const users = useSelector((state) => state.users)

  if (users === null) return <Loader />
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <th>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </th>
            <th>{user.blogs.length}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
