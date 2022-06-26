import { useState } from "react"
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, likeBlog, deleteBlog, isBlogFromUser }) => {
  const [details, setDetails] = useState(false)
  const buttonText = details ? 'hide' : 'view'
  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setDetails(prev => !prev)}>{buttonText}</button>
      {details &&
        <>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <button onClick={likeBlog}>like</button>
          </div>
          <div>
            {blog.author}
          </div>
          {isBlogFromUser && <button onClick={() => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
              deleteBlog()
          }}>delete</button>}
        </>
      }
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  isBlogFromUser: PropTypes.bool.isRequired,
}


export default Blog