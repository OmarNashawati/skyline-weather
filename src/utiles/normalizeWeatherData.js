export const normalizeData = (response) => {
  const current = response?.current
  const location = response?.location
  const forecast = response?.forecast

  const condition = current?.condition
  const air_quality = current?.air_quality
  const usEpaIndex = air_quality?.['us-epa-index']

  return {
    region: location?.region || 'N/A',
    country: location?.country || 'N/A',
    time: location?.localtime || 'N/A',

    condition: condition?.text,
    icon: condition?.icon,

    isDay: current.is_day || 0,
    temp_c: current.temp_c || 0,
    temp_f: current.temp_f || 0,
    wind_mph: current.wind_mph || 0,
    wind_kph: current.wind_kph || 0,
    wind_degree: current.wind_degree || 0,
    wind_dir: current.wind_dir || 'N/A',
    vis_km: current.vis_km || 0,
    vis_miles: current.vis_miles || 0,
    uv: current.uv || 0,
    humidity: current.humidity || 0,

    rain_probability: forecast?.forecastday?.[0]?.day.daily_chance_of_rain || 0,
    sunrise: forecast?.forecastday?.[0]?.astro?.sunrise || 'N/A',
    sunset: forecast?.forecastday?.[0]?.astro?.sunset || 'N/A',

    air_quality_co: air_quality?.co,
    air_quality_us_epa_index: usEpaIndex,
    air_quality_us_epa_index_string: airQualityUsEpaIndex(usEpaIndex),

    days: getDaysData(forecast.forecastday),
  }
}

function getDaysData(forecastday) {
  const days = []

  forecastday.forEach((d) => {
    days.push({
      date: d.date,
      temp_c: d.day.avgtemp_c || 0,
      temp_f: d.day.avgtemp_f || 0,
      maxtemp_c: d.day.maxtemp_c || 0,
      mintemp_c: d.day.mintemp_c || 0,
      maxtemp_f: d.day.maxtemp_f || 0,
      mintemp_f: d.day.mintemp_f || 0,
      condition: d.day.condition.text || 0,
      icon: d.day.condition.icon || 0,
    })
  })

  return days
}

function airQualityUsEpaIndex(index) {
  switch (index) {
    case 1:
      return 'Good'
    case 2:
      return 'Moderate'
    case 3:
      return 'Unhealthy for sensitive group'
    case 4:
      return 'Unhealthy'
    case 5:
      return 'Very Unhealthy'
    case 6:
      return 'Hazardous'
  }
}
