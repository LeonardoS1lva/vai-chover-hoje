import { ref } from 'vue'
import { useGeolocation } from './useGeolocation.js'
import { getLocationName } from '../services/nominatim.js'
import { getTodayForecast } from '../services/openMeteo.js'

export function useRainCheck() {
  const { getCurrentPosition } = useGeolocation()
  const forecast = ref(null)
  const errorType = ref(null)
  const isLoading = ref(false)

  async function checkWeather() {
    if (isLoading.value) {
      return
    }

    isLoading.value = true
    errorType.value = null
    forecast.value = null

    let coordinates

    try {
      coordinates = await getCurrentPosition()
    } catch (error) {
      console.error('Não foi possível obter a localização do usuário.', error)
      errorType.value = 'location'
      isLoading.value = false
      return
    }

    const [weatherResult, locationResult] = await Promise.allSettled([
      getTodayForecast(coordinates),
      getLocationName(coordinates),
    ])

    if (weatherResult.status === 'rejected') {
      console.error('Não foi possível consultar a previsão meteorológica.', weatherResult.reason)
      errorType.value = 'weather'
      isLoading.value = false
      return
    }

    if (locationResult.status === 'rejected') {
      console.warn('Não foi possível identificar o nome da localização.', locationResult.reason)
    }

    forecast.value = {
      ...weatherResult.value,
      location: locationResult.status === 'fulfilled' ? locationResult.value : null,
    }
    isLoading.value = false
  }

  return { forecast, errorType, isLoading, checkWeather }
}
