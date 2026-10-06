<template>
  <q-page class="weather-page">
    <div class="app-shell">
      <header class="app-header">
        <div class="brand-mark" aria-hidden="true">
          <q-icon name="water_drop" size="20px" />
        </div>
        <span class="brand-name">vai chover hoje?</span>
      </header>

      <main class="weather-content">
        <section class="weather-panel" aria-live="polite" aria-atomic="true">
          <div v-if="isLoading" class="state-content">
            <div class="weather-symbol weather-symbol--loading" aria-hidden="true">
              <q-spinner-dots color="primary" size="34px" />
            </div>
            <p class="eyebrow">SÓ UM INSTANTE</p>
            <h1 class="state-title state-title--loading">Verificando o tempo...</h1>
            <p class="supporting-copy">Buscando sua localização e a previsão para hoje.</p>
          </div>

          <div v-else-if="errorType" class="state-content">
            <div class="weather-symbol weather-symbol--error" aria-hidden="true">
              <q-icon :name="errorType === 'location' ? 'location_off' : 'cloud_off'" size="30px" />
            </div>
            <p class="eyebrow">{{ errorType === 'location' ? 'LOCALIZAÇÃO' : 'PREVISÃO' }}</p>
            <h1 class="state-title state-title--error">
              {{
                errorType === 'location'
                  ? 'Não foi possível obter sua localização.'
                  : 'Não foi possível consultar a previsão.'
              }}
            </h1>
            <p class="supporting-copy">
              {{
                errorType === 'location'
                  ? 'Precisamos da sua localização para verificar a chance de chuva onde você está.'
                  : 'Confira sua conexão e tente consultar novamente.'
              }}
            </p>
            <q-btn
              class="retry-button"
              color="primary"
              unelevated
              rounded
              no-caps
              label="Tentar novamente"
              @click="checkWeather"
            />
          </div>

          <div v-else-if="forecast" class="state-content">
            <div
              class="weather-symbol"
              :class="forecast.willRain ? 'weather-symbol--rain' : 'weather-symbol--sun'"
              aria-hidden="true"
            >
              <span>{{ forecast.willRain ? '☔' : '☀️' }}</span>
            </div>
            <p class="eyebrow">PREVISÃO DE HOJE</p>
            <h1 class="state-title" :class="forecast.willRain ? 'text-rain' : 'text-sun'">
              {{ forecast.willRain ? 'VAI CHOVER' : 'NÃO VAI CHOVER' }}
            </h1>
            <p class="rain-probability">
              <strong>{{ forecast.probability }}%</strong>
              <span>de chance de chuva</span>
            </p>
            <p v-if="forecast.location" class="location-name">
              <q-icon name="place" size="18px" aria-hidden="true" />
              {{ forecast.location }}
            </p>
            <p v-else class="location-name location-name--generic">Sua localização</p>
            <p class="updated-label">Hoje <span aria-hidden="true">·</span> Atualizado agora</p>
          </div>
        </section>

        <footer class="app-footer">
          <span>Uma resposta simples para o seu dia.</span>
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
          >
            © OpenStreetMap
          </a>
        </footer>
      </main>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRainCheck } from '../../composables/useRainCheck.js'

const { forecast, errorType, isLoading, checkWeather } = useRainCheck()

onMounted(checkWeather)
</script>
