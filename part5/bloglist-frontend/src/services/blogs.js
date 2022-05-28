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

const blogService = { getAll, setToken }

export default blogService