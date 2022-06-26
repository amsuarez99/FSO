import { useEnvironment } from '../hooks/useEnvironment'

const Notifications = () => {
  const { notification } = useEnvironment()
  if (!notification) return

  const dangerStyles = {
    border: '3px solid red',
    backgroundColor: 'gray',
  }

  const successStyles = {
    border: '3px solid green',
    backgroundColor: 'gray',
  }

  const neutralStyles = {
    border: '3px solid indigo',
    backgroundColor: 'gray',
  }

  return (
    <div
      style={{
        ...(notification.status === 'neutral' && neutralStyles),
        ...(notification.status === 'danger' && dangerStyles),
        ...(notification.status === 'success' && successStyles),
      }}
    >
      {notification.message}
    </div>
  )
}
export default Notifications
