import { Layout, Breadcrumb } from 'antd'
import Header from './Header'
const MainLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header />
      <Layout.Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{children}</div>
      </Layout.Content>
      <Layout.Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Layout.Footer>
    </Layout>
  )
}

export default MainLayout
