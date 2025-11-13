import api from '@/api/axios'
import { normalizeData } from '@/utiles/normalizeWeatherData'

export const getWeather = async (q = 'tokyo', days = 7) => {
  const response = await api.get('forecast.json', {
    params: {
      q: q,
      days: days,
      aqi: 'yes',
      alerts: 'no',
    },
  })
  return normalizeData(response.data)
}
