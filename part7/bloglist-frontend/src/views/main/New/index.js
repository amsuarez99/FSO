import Togglable from '../../../components/Togglable'
import BlogForm from '../../../components/BlogForm'

const New = () => (
  <div>
    <h3>Post a new Blog</h3>
    <Togglable label={'create post'}>
      <BlogForm />
    </Togglable>
  </div>
)

export default New
