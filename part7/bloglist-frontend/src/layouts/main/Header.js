import { useNavigate } from 'react-router-dom'
import { LogOut } from '../../components/Auth'
// import Notifications from '../../components/Notifications'

import { Layout, Menu } from 'antd'

const Header = () => {
  // const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  return (
    <Layout.Header>
      {/* <Notifications /> */}
      <Menu
        theme="dark"
        mode="horizontal"
        items={[
          { label: 'blogs', key: 'blogs', onClick: () => navigate('/blogs') },
          { label: 'users', key: 'users', onClick: () => navigate('/users') },
        ]}
      />
      <div style={{ float: 'right' }}>
        <LogOut />
      </div>
      {/* <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          width: '100%',
          backgroundColor: '#F4F4F4',
          padding: '1rem',
          gap: '1rem',
        }}
      >
        <div></div>
        <p>{user?.name} logged in!</p>
      </div> */}
      {/* <h1>blogs</h1> */}
    </Layout.Header>
  )
}

export default Header
