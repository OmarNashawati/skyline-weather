<script setup>
import UpArrow from '@/assets/icon/arrow-up.svg'
import SunsetIcon from '@/assets/icon/sunset.svg'
import SunriseIcon from '@/assets/icon/sunrise.svg'

import HighlightCard from '../ui/HighlightCard.vue'
import Loading from '../ui/Loading.vue'
import { computed } from 'vue'

const props = defineProps(['data', 'loading'])

const humidityLevel = computed(() => {
  const humidity = props.data.humidity
  if (humidity < 30) return 'Low'
  if (humidity <= 60) return 'Normal' // 30 <= humidity <= 60
  return 'High' // humidity > 60
})

const visibilityStatus = computed(() => {
  return props.data.vis_km < 10 ? 'Not Clear' : 'Clear'
})
</script>

<template>
  <div class="today-highlights">
    <h2>Today's Highlights</h2>

    <Loading v-if="loading" />
    <div v-if="!loading" class="cards-warp">
      <HighlightCard title="UV Index">
        <p class="value">{{ data.uv }}</p>
      </HighlightCard>

      <HighlightCard title="Wind Status">
        <p class="value">
          {{ data.wind_kph }}
          <span class="unit">km/h</span>
        </p>

        <div class="container">
          <UpArrow
            class="wind-direction-icon"
            :style="{ transform: `rotate(${data.wind_degree}deg)` }"
          />
          <span>{{ data.wind_dir }}</span>
        </div>
      </HighlightCard>

      <HighlightCard title="Sunrise & Sunset">
        <div class="sunstate">
          <SunriseIcon class="icon" />
          <div>
            <p>
              {{ data.sunrise }}
            </p>
          </div>
        </div>

        <div class="sunstate">
          <SunsetIcon class="icon" />
          <div>
            <p>
              {{ data.sunset }}
            </p>
          </div>
        </div>
      </HighlightCard>

      <HighlightCard title="Humidity">
        <p class="value">{{ data.humidity }} <span class="unit">%</span></p>
        <p>
          {{ humidityLevel }}
        </p>
      </HighlightCard>

      <HighlightCard title="Visibility">
        <p class="value">{{ data.vis_km }} <span class="unit">km</span></p>
        <p>{{ visibilityStatus }}</p>
      </HighlightCard>

      <HighlightCard title="Air Quality">
        <p class="value">{{ data.air_quality_co }} <span class="unit">CO2</span></p>
        <p>{{ data.air_quality_us_epa_index_string }}</p>
      </HighlightCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.today-highlights {
  h2 {
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .cards-warp {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .value {
    font-size: 2rem;
    font-weight: 500;

    .unit {
      font-size: 1rem;
      color: var(--text-soft);
    }
  }

  .sunstate {
    display: flex;
    gap: 8px;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    .icon {
      // background: var(--text-soft);
      color: var(--text-soft);
      border-radius: 100%;
      width: 25px;
    }
  }

  .container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .wind-direction-icon {
    width: 25px;
    height: 25px;
  }
}
</style>
