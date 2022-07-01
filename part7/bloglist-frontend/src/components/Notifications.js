import { useSelector } from 'react-redux'

const Notifications = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification.shown) return

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
      {notification.content}
    </div>
  )
}

export default Notifications
