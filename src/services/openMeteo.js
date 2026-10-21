export const RAIN_PROBABILITY_THRESHOLD = 50

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

export async function getTodayForecast({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'weather_code',
    hourly: 'precipitation_probability',
    timezone: 'auto',
    forecast_days: '1',
  })
  const response = await fetch(`${FORECAST_URL}?${params}`)

  if (!response.ok) {
    throw new Error(`Open-Meteo respondeu com status ${response.status}.`)
  }

  const data = await response.json()
  const currentTime = data.current?.time
  const times = data.hourly?.time
  const probabilities = data.hourly?.precipitation_probability

  if (
    typeof currentTime !== 'string' ||
    !Array.isArray(times) ||
    !Array.isArray(probabilities) ||
    times.length !== probabilities.length
  ) {
    throw new Error('A resposta da previsão está incompleta.')
  }

  const today = currentTime.slice(0, 10)
  const hourly = times.reduce((values, time, index) => {
    if (
      typeof time === 'string' &&
      time.slice(0, 10) === today &&
      time >= currentTime &&
      typeof probabilities[index] === 'number'
    ) {
      values.push({ time, probability: probabilities[index] })
    }

    return values
  }, [])

  if (hourly.length === 0) {
    throw new Error('A previsão de hoje não está disponível.')
  }

  const probability = Math.max(...hourly.map(({ probability }) => probability))

  return {
    probability,
    hourly,
    weatherCode: data.current?.weather_code,
    willRain: probability >= RAIN_PROBABILITY_THRESHOLD,
  }
}
