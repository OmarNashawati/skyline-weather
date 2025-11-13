import { defineStore } from 'pinia'
import { ref } from 'vue'

export const unitsStore = defineStore('unitsStore', () => {
  const temperatureUnit = ref(getUserSettings() || 'C')

  function setTemperatureUnit(unit) {
    temperatureUnit.value = unit
    saveUserSettings()
  }

  function saveUserSettings() {
    localStorage.setItem('temperatureUnit', temperatureUnit.value)
  }

  function getUserSettings() {
    return localStorage.getItem('temperatureUnit')
  }

  return { temperatureUnit, setTemperatureUnit }
})
