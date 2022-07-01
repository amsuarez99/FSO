import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  deleteBlog,
  likeBlog,
  commentBlog,
} from '../../../reducers/blogReducer'
import useField from '../../../hooks/useField'

const UploadComment = (props) => {
  const name = useField('text')
  return (
    <>
      <input {...name} placeholder="Comment this post!" />
      <button onClick={() => props.handleUpload(name.value)}>
        add comment
      </button>
    </>
  )
}

export const Blog = ({ blog, ...props }) => {
  const comments = blog.comments.map((comment, idx) => (
    <li key={idx}>{comment}</li>
  ))

  return (
    <div className="blog">
      <h3>{blog.title}</h3>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={props.likeBlog}>like</button>
      </div>
      <div>{blog.author}</div>
      {props.isBlogFromUser && (
        <button
          onClick={() => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
              props.deleteBlog()
          }}
        >
          delete
        </button>
      )}
      <h4>comments</h4>
      <UploadComment handleUpload={props.uploadComment} />
      <ul>{comments}</ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch, props) => {
  const blogId = props.blog.id
  return {
    likeBlog() {
      dispatch(likeBlog(blogId))
    },
    deleteBlog() {
      dispatch(deleteBlog(blogId))
    },
    uploadComment(comment) {
      dispatch(commentBlog(blogId, comment))
    },
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isBlogFromUser: state.user.id === ownProps.blog.user?.id,
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  uploadComment: PropTypes.func.isRequired,
  isBlogFromUser: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
