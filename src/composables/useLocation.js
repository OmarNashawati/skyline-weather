import { ref } from 'vue'

export function useLocation() {
  const location = ref(null)
  const error = ref(null)

  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            location.value = `${latitude},${longitude}`
            resolve(location.value)
          },
          (err) => {
            switch (err.code) {
              case err.PERMISSION_DENIED:
                error.value = 'User denied the request for Geolocation.'
                break
              case err.POSITION_UNAVAILABLE:
                error.value = 'Location information is unavailable.'
                break
              case err.TIMEOUT:
                error.value = 'The request to get user location timed out.'
                break
              default:
                error.value = 'An unknown error occurred.'
                break
            }
            reject(error.value)
          },
        )
      } else {
        error.value = 'Geolocation is not supported by this browser.'
        reject(error.value)
      }
    })
  }

  return { getCurrentLocation, error }
}
