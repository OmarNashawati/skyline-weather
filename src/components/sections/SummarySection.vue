<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Loading from '../ui/Loading.vue'
import Search from '../ui/Search.vue'
import WeatherIcon from '../ui/WeatherIcon.vue'
import { unitsStore } from '@/stores/unitsStore'

const props = defineProps(['data', 'loading', 'error'])
const emit = defineEmits(['onsearch', 'currentLocation'])
const store = unitsStore()

const displayTemp = computed(() => {
  if (store.temperatureUnit === 'C') {
    return { value: props.data.temp_c, unit: '°C' }
  }
  return { value: props.data.temp_f, unit: '°F' }
})

const time = ref(new Date())

let frameId

function updateTime() {
  time.value = new Date()
  frameId = requestAnimationFrame(updateTime)
}

const formattedDay = computed(() => {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(time.value)
})

const formattedTime = computed(() => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h12',
  }).format(time.value)
})

onMounted(() => {
  frameId = requestAnimationFrame(updateTime)
})

onUnmounted(() => {
  cancelAnimationFrame(frameId)
})
</script>

<template>
  <section class="left-side-section">
    <Search @onsearch="(q) => emit('onsearch', q)" @currentLocation="emit('currentLocation')" />

    <Loading v-if="loading" />
    <div v-if="error" class="error-message">
      {{ error || 'Failed to fetch weather data.' }}
    </div>

    <div v-if="!loading && !error" class="inner-div">
      <div class="today-weather-icon">
        <WeatherIcon :condition="data.condition" :isDay="data.isDay" class="weather-icon" />
      </div>

      <div class="temperature-wrapper">
        <span class="value">{{ displayTemp.value }}</span>
        <span class="unit">{{ displayTemp.unit }}</span>
      </div>

      <div class="date">
        <span class="day"> {{ formattedDay }},</span>
        <span class="time">{{ formattedTime }}</span>
      </div>

      <hr style="border-top: 1px solid var(--text-soft)" />

      <div class="current-weather">
        <div class="current-weather-icon">
          <WeatherIcon :condition="data.condition" :isDay="data.isDay" />
        </div>
        <p>{{ data.condition }}</p>
      </div>

      <div class="rain-possibility">
        <div class="current-rain-possibility-icon">
          <WeatherIcon condition="Heavy rain" class="weather-icon" />
        </div>
        <p>Rain possibility - {{ data.rain_probability }}%</p>
      </div>

      <div class="location">
        <p>{{ data.region }}, {{ data.country }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.left-side-section {
  width: 25%;
  padding: 2rem;
  background: var(--white);
  display: flex;
  flex-direction: column;

  @media (max-width: 680px) {
    max-width: none;
    width: 100%;
  }

  .inner-div {
    margin-top: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
  }

  .today-weather-icon {
    width: 50%;
  }

  .temperature-wrapper {
    display: flex;

    .value {
      font-size: 4rem;
      line-height: 1;
      font-weight: 200;
    }

    .unit {
      font-weight: 500;
      font-size: 2rem;
      line-height: 1;
    }
  }

  .date {
    display: flex;
    gap: 8px;
    .day {
      font-weight: bold;
    }

    .time {
      color: var(--text-soft);
    }
  }

  .rain-possibility,
  .current-weather {
    display: flex;
    align-items: center;
    gap: 1rem;

    .current-weather-icon,
    .current-rain-possibility-icon {
      height: 20px;
    }
  }

  .location {
    border: 1px solid var(--text-soft);
    padding: 1rem;
    font-size: 0.8rem;
    border-radius: 0.5rem;
  }
}
</style>
