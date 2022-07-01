import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import Blog from '../../../components/Blog'
import New from '../New'

const BlogList = () => {
  const blogs = useSelector((state) =>
    state.blogs ? [...state.blogs].sort((a, b) => b.likes - a.likes) : null
  )
  if (blogs === null) return <Loader />
  return (
    <>
      <New />
      <div className="blogs">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default BlogList
