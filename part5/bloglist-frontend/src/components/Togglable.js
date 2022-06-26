import { useState } from "react"
const Togglable = ({ label, children }) => {
  const [hidden, setHidden] = useState(true)


  if (hidden) return (
    <button onClick={() => setHidden(false)}>{label}</button>
  )

  return (
    <>
      {children}
      <button onClick={() => setHidden(true)}>cancel</button>
    </>
  )
}

export default Togglable