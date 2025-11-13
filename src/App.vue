<script setup>
import SummarySection from './components/sections/SummarySection.vue'
import DetailsSection from './components/sections/DetailsSection.vue'
import { onMounted } from 'vue'
import { useWeather } from './composables/useWeather'
import { useLocation } from './composables/useLocation'

const { fetchWeather, result, error, loading } = useWeather()
const { getCurrentLocation } = useLocation()

const getWeatherOnCurrentLocation = async () => {
  try {
    const coords = await getCurrentLocation()
    fetchWeather(coords)
  } catch (err) {
    if (err.code === err.PERMISSION_DENIED) {
      console.warn('Location denied. Falling back to default city.')
      fetchWeather('London')
    } else {
      console.error(err)
    }
  }
}

const search = (q) => {
  try {
    fetchWeather(q)
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await getWeatherOnCurrentLocation()
})
</script>

<template>
  <main>
    <SummarySection
      :loading="loading"
      :data="result"
      :error="error"
      @onsearch="search"
      @currentLocation="getWeatherOnCurrentLocation"
    />

    <DetailsSection v-if="!error" :loading="loading" :data="result" />
  </main>
</template>

<style lang="scss" scoped>
main {
  max-width: 1440px;
  margin: 0 auto;
  height: 100vh;
  display: flex;

  @media (max-width: 680px) {
    flex-direction: column;
    height: fit-content;
  }
}
</style>
