import { getWeather } from '@/services/weatherService'
import { ref } from 'vue'

export function useWeather() {
  const result = ref({})
  const loading = ref(false)
  const error = ref(null)

  const fetchWeather = async (q) => {
    loading.value = true
    error.value = null

    try {
      const data = await getWeather(q)
      result.value = data
    } catch (err) {
      if (err.response) {
        error.value = `Error: ${err.response.status} - ${err.response.data.error.message || 'API Issue'}`
      } else if (err.request) {
        error.value = 'Network Error: Check your connection or API status.'
      } else {
        error.value = `Request Failed: ${err.message}`
      }
    } finally {
      loading.value = false
    }
  }

  return { result, loading, error, fetchWeather }
}
