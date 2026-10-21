<template>
  <q-page
    class="weather-page column items-center justify-center q-pa-lg bg-blue-grey-1 text-blue-grey-10"
  >
    <div class="app-shell column full-width">
      <header class="app-header row items-center q-gutter-x-sm q-px-xs q-py-sm">
        <q-avatar
          class="brand-mark"
          size="34px"
          rounded
          color="light-blue-1"
          text-color="light-blue-9"
          aria-hidden="true"
        >
          <q-icon name="water_drop" size="20px" />
        </q-avatar>
        <span class="brand-name text-blue-grey-8 text-body1 text-weight-medium">
          vai chover hoje?
        </span>
      </header>

      <main class="weather-content column col">
        <q-card
          class="weather-panel column col items-center justify-center q-py-xl q-px-lg text-center"
          flat
          bordered
          tag="section"
          aria-live="polite"
          aria-atomic="true"
        >
          <div v-if="isLoading" class="state-content column items-center full-width">
            <div class="weather-symbol flex flex-center bg-light-blue-1 q-mb-lg" aria-hidden="true">
              <q-spinner-dots color="primary" size="34px" />
            </div>
            <p class="eyebrow text-overline text-blue-grey-5 text-weight-bold q-ma-none q-mb-md">
              SÓ UM INSTANTE
            </p>
            <h1 class="state-title state-title--loading text-blue-grey-9 q-ma-none">
              Verificando o tempo...
            </h1>
            <p class="supporting-copy text-blue-grey-6 text-body2 q-mt-md q-mb-none">
              Buscando sua localização e a previsão para hoje.
            </p>
          </div>

          <div v-else-if="errorType" class="state-content column items-center full-width">
            <div
              class="weather-symbol flex flex-center bg-grey-2 text-blue-grey-6 q-mb-lg"
              aria-hidden="true"
            >
              <q-icon :name="errorType === 'location' ? 'location_off' : 'cloud_off'" size="30px" />
            </div>
            <p class="eyebrow text-overline text-blue-grey-5 text-weight-bold q-ma-none q-mb-md">
              {{ errorType === 'location' ? 'LOCALIZAÇÃO' : 'PREVISÃO' }}
            </p>
            <h1 class="state-title state-title--error text-blue-grey-9 q-ma-none">
              {{
                errorType === 'location'
                  ? 'Não foi possível obter sua localização.'
                  : 'Não foi possível consultar a previsão.'
              }}
            </h1>
            <p class="supporting-copy text-blue-grey-6 text-body2 q-mt-md q-mb-none">
              {{
                errorType === 'location'
                  ? 'Precisamos da sua localização para verificar a chance de chuva onde você está.'
                  : 'Confira sua conexão e tente consultar novamente.'
              }}
            </p>
            <q-btn
              class="retry-button q-mt-lg q-px-lg text-weight-medium"
              color="primary"
              unelevated
              rounded
              no-caps
              label="Tentar novamente"
              @click="checkWeather"
            />
          </div>

          <div v-else-if="forecast" class="state-content column items-center full-width">
            <div
              class="weather-symbol flex flex-center q-mb-lg"
              :class="forecast.willRain ? 'bg-light-blue-1' : 'bg-amber-1'"
              aria-hidden="true"
            >
              <span>{{ forecast.willRain ? '☔' : '☀️' }}</span>
            </div>
            <p class="eyebrow text-overline text-blue-grey-5 text-weight-bold q-ma-none q-mb-md">
              PREVISÃO DE HOJE
            </p>
            <h1
              class="state-title q-ma-none"
              :class="forecast.willRain ? 'text-light-blue-9' : 'text-amber-9'"
            >
              {{ forecast.willRain ? 'VAI CHOVER' : 'NÃO VAI CHOVER' }}
            </h1>
            <p
              class="rain-probability row items-baseline justify-center q-gutter-x-sm text-blue-grey-7 text-body1 q-mt-lg q-mb-none"
            >
              <strong class="text-h5 text-weight-bold text-blue-grey-10"
                >{{ forecast.probability }}%</strong
              >
              <span>chance máxima hoje</span>
            </p>
            <section
              class="hourly-forecast column full-width q-mt-lg"
              aria-label="Probabilidade de chuva por horário"
            >
              <div
                class="row items-baseline justify-between q-gutter-x-sm"
                aria-live="polite"
              >
                <span class="text-body2 text-blue-grey-7">Por horário</span>
                <strong class="text-subtitle1 text-weight-bold text-blue-grey-10">
                  {{ selectedHourlyForecast.time.slice(11, 13) }}h ·
                  {{ selectedHourlyForecast.probability }}%
                </strong>
              </div>
              <q-slider
                v-model="selectedHourIndex"
                :min="0"
                :max="forecast.hourly.length - 1"
                :step="1"
                :disable="forecast.hourly.length < 2"
                color="light-blue-8"
                track-color="blue-grey-2"
                thumb-color="light-blue-9"
                markers
                snap
                aria-label="Selecionar horário da previsão"
              />
              <div class="row justify-between text-caption text-blue-grey-5">
                <span>{{ forecast.hourly[0].time.slice(11, 13) }}h</span>
                <span>{{ forecast.hourly[forecast.hourly.length - 1].time.slice(11, 13) }}h</span>
              </div>
            </section>
            <p
              v-if="forecast.location"
              class="location-name row items-center q-gutter-x-xs text-blue-grey-8 text-weight-medium q-mt-lg q-mb-none"
            >
              <q-icon class="text-blue-grey-5" name="place" size="18px" aria-hidden="true" />
              {{ forecast.location }}
            </p>
            <p v-else class="location-name text-blue-grey-6 text-weight-medium q-mt-lg q-mb-none">
              Sua localização
            </p>
            <p class="updated-label text-blue-grey-5 text-caption q-mt-sm q-mb-none">
              Hoje <span aria-hidden="true">·</span> Atualizado agora
            </p>
          </div>
        </q-card>

        <footer
          class="app-footer row justify-between q-gutter-x-md q-px-xs q-pt-lg q-pb-sm text-blue-grey-5 text-caption"
        >
          <span>Uma resposta simples para o seu dia.</span>
          <a
            class="text-blue-grey-6"
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
import { computed, onMounted, ref, watch } from 'vue'
import { useRainCheck } from '../../composables/useRainCheck.js'

const { forecast, errorType, isLoading, checkWeather } = useRainCheck()
const selectedHourIndex = ref(0)
const selectedHourlyForecast = computed(() => forecast.value.hourly[selectedHourIndex.value])

watch(forecast, () => {
  selectedHourIndex.value = 0
})

onMounted(checkWeather)
</script>
