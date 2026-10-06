export function useGeolocation() {
  function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocalização não é suportada por este navegador.'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
        (error) => reject(error),
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 },
      )
    })
  }

  return { getCurrentPosition }
}
