<script setup>
import { unitsStore } from '@/stores/unitsStore'
import WeatherIcon from './WeatherIcon.vue'
import { computed } from 'vue'

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
})
const store = unitsStore()

const time = computed(() => {
  const date = new Date(props.day.date)

  if (isNaN(date)) {
    console.log('Invalid date format:', props.day.date)
    return 'N/A'
  }

  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
})

const displayTemp = computed(() => {
  if (store.temperatureUnit === 'C') {
    return { min: props.day.mintemp_c, max: props.day.maxtemp_c }
  }
  return { min: props.day.mintemp_f, max: props.day.maxtemp_f }
})
</script>

<template>
  <div class="day-card">
    <p class="day">
      {{ time }}
    </p>

    <WeatherIcon :condition="day.condition" class="icon" />

    <p class="temperature">
      {{ displayTemp.max }}° <span>{{ displayTemp.min }}°</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.day-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: 100px;
  background: var(--background);
  padding: 1rem;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    flex: 1;
  }

  .icon {
    width: 65px;
    height: 65px;
  }

  p {
    font-size: 0.8rem;
    text-align: center;
  }

  .condition {
    flex: 1;
  }

  .temperature {
    font-weight: 600;

    span {
      padding-left: 4px;
      font-weight: 400;
      color: var(--text-soft);
    }
  }
}
</style>
