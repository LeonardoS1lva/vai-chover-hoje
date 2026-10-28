<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <template v-if="condition.icon === 'sunny'">
      <g stroke="#E6A51A" stroke-width="3.5" stroke-linecap="round">
        <path d="M32 6v6M32 52v6M6 32h6M52 32h6M13.6 13.6l4.2 4.2M46.2 46.2l4.2 4.2M50.4 13.6l-4.2 4.2M17.8 46.2l-4.2 4.2" />
      </g>
      <circle cx="32" cy="32" r="13" fill="#FFD34E" stroke="#E6A51A" stroke-width="3" />
    </template>

    <template v-else-if="condition.icon === 'partly-cloudy'">
      <circle cx="43" cy="21" r="10" fill="#FFD34E" stroke="#E6A51A" stroke-width="2.5" />
      <path
        d="M45 45H20.5a10 10 0 0 1-1.1-19.9 13 13 0 0 1 24.7 3.5A8.3 8.3 0 0 1 45 45Z"
        fill="#DCEAF0"
        stroke="#69889A"
        stroke-width="3"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="condition.icon === 'fog'">
      <path
        d="M44 34H20a8 8 0 0 1-1-16 11 11 0 0 1 21 3A7 7 0 0 1 44 34Z"
        fill="#DCEAF0"
        stroke="#69889A"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <g stroke="#69889A" stroke-width="3" stroke-linecap="round">
        <path d="M13 42h38M17 50h30M23 58h18" />
      </g>
      <path v-if="condition.frozen" d="M50 40v8m-3-6 6 4m0-4-6 4" stroke="#43A6CF" stroke-width="2" stroke-linecap="round" />
    </template>

    <template v-else-if="condition.icon === 'drizzle' || condition.icon === 'rain'">
      <path
        d="M45 38H20a9 9 0 0 1-1-18 12 12 0 0 1 23 3.2A8 8 0 0 1 45 38Z"
        fill="#DCEAF0"
        stroke="#69889A"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path
        v-for="x in dropPositions"
        :key="x"
        :d="`M${x} 45c0 2-2.5 4.2-2.5 6.5a2.5 2.5 0 0 0 5 0C${x + 2.5} 49.2 ${x} 47 ${x} 45Z`"
        fill="#39A9DB"
      />
      <path v-if="condition.frozen" d="M49 45v9m-3.5-6 7 4m0-4-7 4" stroke="#43A6CF" stroke-width="2" stroke-linecap="round" />
    </template>

    <template v-else-if="condition.icon === 'snow'">
      <path
        d="M45 37H20a9 9 0 0 1-1-18 12 12 0 0 1 23 3.2A8 8 0 0 1 45 37Z"
        fill="#DCEAF0"
        stroke="#69889A"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <g
        v-for="x in flakePositions"
        :key="x"
        :transform="`translate(${x} 49)`"
        stroke="#43A6CF"
        stroke-width="2.2"
        stroke-linecap="round"
      >
        <path d="M0-5v10M-4.3-2.5l8.6 5M-4.3 2.5l8.6-5" />
      </g>
    </template>

    <template v-else-if="condition.icon === 'storm'">
      <path
        d="M45 34H20a9 9 0 0 1-1-18 12 12 0 0 1 23 3.2A8 8 0 0 1 45 34Z"
        fill="#AFC4D0"
        stroke="#607D8B"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path d="M34 34 25 48h7l-2 11 11-16h-7l3-9Z" fill="#FFD34E" stroke="#E6A51A" stroke-width="2" stroke-linejoin="round" />
      <path
        v-if="condition.intensity >= 2"
        d="m49 35-6 9h4l-1 7 7-11h-4l2-5Z"
        fill="#FFD34E"
        stroke="#E6A51A"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <circle
        v-for="hail in hailPositions"
        :key="hail.x"
        :cx="hail.x"
        :cy="hail.y"
        :r="hail.r"
        fill="#43A6CF"
      />
    </template>

    <template v-else>
      <path
        d="M45 42H20a10 10 0 0 1-1-20 13 13 0 0 1 24 3.5A8.5 8.5 0 0 1 45 42Z"
        fill="#DCEAF0"
        stroke="#69889A"
        stroke-width="3"
        stroke-linejoin="round"
      />
    </template>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { getWeatherCondition } from '../services/weatherConditions.js'

const props = defineProps({
  code: { type: [Number, String], default: null },
  size: { type: String, default: '56px' },
})

const condition = computed(() => getWeatherCondition(props.code))
const dropPositions = computed(() => [22, 32, 42].slice(0, condition.value.intensity || 1))
const flakePositions = computed(() => [22, 32, 42].slice(0, condition.value.intensity || 1))
const hailPositions = computed(() =>
  condition.value.hail
    ? [
        { x: 47, y: 48, r: 2.5 },
        { x: 53, y: 54, r: 2 },
        { x: 45, y: 57, r: 1.5 },
      ].slice(0, condition.value.intensity || 1)
    : [],
)
</script>
