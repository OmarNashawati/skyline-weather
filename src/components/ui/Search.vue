<script setup>
import SearchIcon from '@/assets/icon/search.svg'
import TimesIcon from '@/assets/icon/x-circle.svg'
import MappinIcon from '@/assets/icon/map-pin.svg'
import { ref } from 'vue'

const emit = defineEmits(['onsearch', 'currentLocation'])
const searchQuery = ref('')

const handleSearch = () => {
  emit('onsearch', searchQuery.value)
}
</script>

<template>
  <form class="search" @submit.prevent="handleSearch">
    <SearchIcon class="icon-button" @click="handleSearch" />

    <input type="text" placeholder="Search for places" v-model="searchQuery" />

    <TimesIcon v-if="searchQuery" class="icon-button" @click="searchQuery = ''" />

    <MappinIcon class="icon-button" @click="emit('currentLocation')" />
  </form>
</template>

<style lang="scss" scoped>
.search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    display: inline-block;
    padding: 8px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    flex: 1 1 auto;
  }

  .icon-button {
    width: 30px;
    cursor: pointer;
  }
}
</style>
