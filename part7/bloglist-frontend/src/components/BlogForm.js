import { connect } from 'react-redux'
import { postBlog } from '../reducers/blogReducer'

const BlogForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        title
        <input type="text" name="title" />
      </label>
      <label>
        author
        <input type="text" name="author" />
      </label>
      <label>
        url
        <input type="text" name="url" />
      </label>
      <button id="submitPost" type="submit">
        Post
      </button>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(event) {
      event.preventDefault()
      const blog = new FormData(event.currentTarget)
      dispatch(
        postBlog({
          title: blog.get('title'),
          author: blog.get('author'),
          url: blog.get('url'),
        })
      )
    },
  }
}

export default connect(null, mapDispatchToProps)(BlogForm)
