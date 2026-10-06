const REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse'
let lastRequestAt = 0

async function respectRateLimit() {
  const waitTime = Math.max(0, 1000 - (Date.now() - lastRequestAt))

  if (waitTime > 0) {
    await new Promise((resolve) => setTimeout(resolve, waitTime))
  }

  lastRequestAt = Date.now()
}

export async function getLocationName({ latitude, longitude }) {
  await respectRateLimit()

  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    format: 'jsonv2',
    addressdetails: '1',
    'accept-language': 'pt-BR',
  })
  const response = await fetch(`${REVERSE_URL}?${params}`, {
    headers: { 'Accept-Language': 'pt-BR' },
  })

  if (!response.ok) {
    throw new Error(`Nominatim respondeu com status ${response.status}.`)
  }

  const data = await response.json()
  const address = data.address

  if (!address) {
    throw new Error('O Nominatim não retornou um endereço.')
  }

  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.hamlet ||
    address.county

  if (!city) {
    return null
  }

  const countryCode = address.country_code?.toLowerCase()
  const stateCode = address['ISO3166-2-lvl4']?.split('-').at(-1)
  const state = countryCode === 'br' ? stateCode || address.state : address.state
  const locationParts = [city, state]

  if (countryCode !== 'br' && address.country) {
    locationParts.push(address.country)
  }

  return locationParts.filter(Boolean).join(', ')
}
