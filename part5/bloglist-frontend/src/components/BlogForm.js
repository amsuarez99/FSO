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

export default BlogForm
