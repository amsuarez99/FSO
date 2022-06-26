import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl, {
    headers: {
      'Authorization': token
    }
  })
  return response.data
}

const postBlog = async (post) => {
  const response = await axios.post(baseUrl, post, {
    headers: {
      'Authorization': token
    }
  })

  return response.data
}

const deleteBlog = async (postId) => {
  const response = await axios.delete(`${baseUrl}/${postId}`, {
    headers: {
      'Authorization': token
    }
  })

  return response.data
}

const likeBlog = async (postId) => {
  const response = await axios.put(`${baseUrl}/like/${postId}`, null, {
    headers: {
      'Authorization': token
    }
  })
  return response.data
}

const blogService = { getAll, setToken, postBlog, likeBlog, deleteBlog }

export default blogService