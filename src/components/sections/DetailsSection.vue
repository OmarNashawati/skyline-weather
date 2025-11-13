<script setup>
import RadioButton from '../ui/RadioButton.vue'
import DayHighLights from './DayHighLights.vue'
import WeekWeaher from './WeekWeaher.vue'
import { unitsStore } from '@/stores/unitsStore'

const props = defineProps(['data', 'loading'])
const store = unitsStore()
</script>

<template>
  <section class="details-section">
    <div class="header">
      <div class="units-weapper">
        <RadioButton
          text="°C"
          value="C"
          :model-value="store.temperatureUnit"
          @update:model-value="store.setTemperatureUnit"
        />

        <RadioButton
          text="°F"
          value="F"
          :model-value="store.temperatureUnit"
          @update:model-value="store.setTemperatureUnit"
        />
      </div>
    </div>

    <DayHighLights :data="data" :loading="loading" />
    <WeekWeaher :days="data.days" :loading="loading" />
  </section>
</template>

<style lang="scss" scoped>
.details-section {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .header {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: end;

    .units-weapper {
      display: flex;
      gap: 8px;
    }
  }
}
</style>
