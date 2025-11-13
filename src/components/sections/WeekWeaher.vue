<script setup>
import DayOfWeekCard from '../ui/DayOfWeekCard.vue'
import Loading from '../ui/Loading.vue'

const props = defineProps(['days', 'loading'])
</script>

<template>
  <div class="week-weather">
    <h2>Next Week</h2>

    <Loading v-if="loading" />

    <div v-if="!loading" class="days-wrap">
      <DayOfWeekCard v-for="day in days" :day="day" :key="day.date" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.week-weather {
  h2 {
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .days-wrap {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
}
</style>
