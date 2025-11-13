<script setup>
import CloudRainIcon from '@/assets/weather-icons/cloud-rain.svg'
import CloudThunderIcon from '@/assets/weather-icons/cloud-thunder.svg'
import MoonCloudIcon from '@/assets/weather-icons/moon-cloud.svg'
import MoonCloudsIcon from '@/assets/weather-icons/moon-clouds.svg'
import MoonFullCloudIcon from '@/assets/weather-icons/moon-full-cloud.svg'
import MoonFullIcon from '@/assets/weather-icons/moon-full.svg'
import MoonIcon from '@/assets/weather-icons/moon.svg'
import PartlyCloudyIcon from '@/assets/weather-icons/partly-cloudy.svg'
import SunCloudIcon from '@/assets/weather-icons/sun-cloud.svg'
import SunHazeIcon from '@/assets/weather-icons/sun-haze.svg'
import SunRainIcon from '@/assets/weather-icons/sun-rain.svg'
import SunThunderIcon from '@/assets/weather-icons/sun-thunder.svg'
import SunTwoCloudsIcon from '@/assets/weather-icons/sun-two-clouds.svg'
import SunIcon from '@/assets/weather-icons/sun.svg'
import ThunderRainIcon from '@/assets/weather-icons/thunder-rain.svg'
import { computed, onMounted, watch } from 'vue'

const props = defineProps({
  condition: String,
  isDay: {
    default: 1,
  },
})

const weatherIconMap = [
  {
    icon: 'sun',
    component: SunIcon,
    conditions: ['Sunny', 'Clear', 'Hot', 'Dry'],
  },
  {
    icon: 'sun-haze',
    component: SunHazeIcon,
    conditions: ['Mist', 'Fog', 'Freezing fog', 'Haze'],
  },
  {
    icon: 'sun-cloud',
    component: SunCloudIcon,
    conditions: [
      'Patchy light drizzle',
      'Patchy light rain',
      'Patchy light snow',
      'Patchy rain nearby',
      'Patchy snow nearby',
      'Patchy sleet nearby',
      'Patchy freezing drizzle nearby',
    ],
  },
  {
    icon: 'sun-two-clouds',
    component: SunTwoCloudsIcon,
    conditions: ['Cloudy', 'Overcast'],
  },
  {
    icon: 'partly-cloudy',
    component: PartlyCloudyIcon,
    conditions: [
      'Partly Cloudy',
      'Patchy rain possible',
      'Patchy snow possible',
      'Patchy sleet possible',
      'Patchy freezing drizzle possible',
    ],
  },
  {
    icon: 'sun-thunder',
    component: SunThunderIcon,
    conditions: ['Thundery outbreaks in nearby', 'Patchy light rain with thunder'],
  },
  {
    icon: 'cloud-thunder',
    component: CloudThunderIcon,
    conditions: [
      'Moderate or heavy rain with thunder',
      'Moderate or heavy snow with thunder',
      'Thunderstorm',
      'Moderate or heavy rain with thunder night',
      'Moderate or heavy snow with thunder night',
      'Thunderstorm night',
    ],
  },
  {
    icon: 'sun-rain',
    component: SunRainIcon,
    conditions: [
      'Light rain shower',
      'Patchy light rain',
      'Light rain',
      'Moderate rain at times',
      'Moderate rain',
    ],
  },
  {
    icon: 'cloud-rain',
    component: CloudRainIcon,
    conditions: [
      'Heavy rain at times',
      'Heavy rain',
      'Torrential rain shower',
      'Moderate or heavy rain shower',
      'Heavy rain at times night',
      'Heavy rain night',
      'Torrential rain shower night',
      'Moderate or heavy rain shower night',
    ],
  },
  {
    icon: 'thunder-rain',
    component: ThunderRainIcon,
    conditions: [
      'Moderate or heavy rain with thunder',
      'Moderate or heavy snow with thunder',
      'Thunderstorm with heavy rain',
      'Moderate or heavy rain with thunder night',
      'Moderate or heavy snow with thunder night',
      'Thunderstorm with heavy rain night',
    ],
  },
  {
    icon: 'moon',
    component: MoonIcon,
    conditions: ['Clear night', 'Calm night', 'Fair night'],
  },
  {
    icon: 'moon-cloud',
    component: MoonCloudIcon,
    conditions: ['Partly Cloudy night', 'Patchy clouds night', 'Light cloud night'],
  },
  {
    icon: 'moon-full',
    component: MoonFullIcon,
    conditions: ['Clear night', 'Full moon visible night'],
  },
  {
    icon: 'moon-full-cloud',
    component: MoonFullCloudIcon,
    conditions: ['Partly Cloudy night', 'Patchy rain possible night'],
  },
  {
    icon: 'moon-clouds',
    component: MoonCloudsIcon,
    conditions: ['Cloudy night', 'Overcast night'],
  },
]

const currentIcon = computed(() => {
  if (!props.condition) return weatherIconMap[0]

  let normalized = props.condition.toLowerCase().trim()

  if (!props.isDay || props.isDay === false) {
    normalized += ' night'
  }

  const match = weatherIconMap.find((i) => i.conditions.some((c) => c.toLowerCase() === normalized))

  return match || weatherIconMap[0]
})
</script>

<template>
  <component class="icon" v-if="currentIcon" :is="currentIcon.component" />
</template>

<style lang="scss" scoped>
.icon {
  width: 100%;
  height: 100%;
}
</style>
