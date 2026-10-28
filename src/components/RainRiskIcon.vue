<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <template v-if="type === 'sun'">
      <g stroke="#E6A51A" stroke-width="3.5" stroke-linecap="round">
        <path d="M32 5v7M32 52v7M5 32h7M52 32h7M13 13l5 5M46 46l5 5M51 13l-5 5M18 46l-5 5" />
      </g>
      <circle cx="32" cy="32" r="14" fill="#FFD34E" stroke="#E6A51A" stroke-width="3" />
    </template>

    <template v-else-if="type === 'soft-sun'">
      <g stroke="#EAC768" stroke-width="2.5" stroke-linecap="round">
        <path d="M39 8v5M39 35v5M25 26h5M48 26h5M29 16l3.5 3.5M45.5 32.5 49 36M49 16l-3.5 3.5" />
      </g>
      <circle cx="39" cy="26" r="10" fill="#FFEAA6" stroke="#EAC768" stroke-width="2" />
      <path
        d="M43 47H19a8 8 0 0 1-1-16 10 10 0 0 1 19.5 2.6A7 7 0 0 1 43 47Z"
        fill="#EDF3F5"
        stroke="#91AAB6"
        stroke-width="2.5"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="type === 'drops'">
      <path
        d="M46 39H19a9 9 0 0 1-1-18 12 12 0 0 1 23 3.2A8 8 0 0 1 46 39Z"
        fill="#DCEAF0"
        stroke="#69889A"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path d="M25 45c0 2-2.5 4.2-2.5 6.5a2.5 2.5 0 0 0 5 0C27.5 49.2 25 47 25 45Z" fill="#39A9DB" />
      <path d="M40 45c0 2-2.5 4.2-2.5 6.5a2.5 2.5 0 0 0 5 0C42.5 49.2 40 47 40 45Z" fill="#39A9DB" />
    </template>

    <template v-else-if="type === 'umbrella'">
      <path d="M11 31a21 21 0 0 1 42 0c-4.2-4.5-8.4-4.5-12.6 0-4.2-4.5-8.4-4.5-12.6 0-4.2-4.5-8.4-4.5-12.6 0-1.4-1.5-2.8-2.4-4.2-2.8Z" fill="#4BA8D2" stroke="#287FA8" stroke-width="2.5" stroke-linejoin="round" />
      <path d="M32 31v19a6 6 0 0 1-12 0" stroke="#287FA8" stroke-width="3" stroke-linecap="round" />
      <path d="m18 8-2 5m30-5 2 5M32 4v5" stroke="#39A9DB" stroke-width="2.5" stroke-linecap="round" />
    </template>

    <template v-else>
      <path
        d="M46 35H19a9 9 0 0 1-1-18 12 12 0 0 1 23 3.2A8 8 0 0 1 46 35Z"
        fill="#718996"
        stroke="#536D79"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path d="m19 42-4 7m18-7-4 7m18-7-4 7M26 53l-3 6m18-6-3 6" stroke="#278FCA" stroke-width="3.5" stroke-linecap="round" />
    </template>
  </svg>
</template>

<script setup>
defineProps({
  type: { type: String, required: true },
  size: { type: String, default: '68px' },
})
</script>
