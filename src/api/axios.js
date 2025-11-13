import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
})

const API_KEY = import.meta.env.VITE_API_KEY

api.interceptors.request.use(
  (config) => {
    if (config.method === 'get' && API_KEY) {
      config.params = {
        ...config.params,
        key: API_KEY,
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null

    if (status === 401) {
      console.error('API Error: Unauthorized (401).')
    } else if (status === 404) {
      console.error(`API Error: Resource not found at ${error.config.url}`)
    }

    return Promise.reject(error)
  },
)

export default api
