const RAIN_RISK_LEVELS = [
  {
    max: 5,
    title: 'CHANCE MUITO BAIXA',
    icon: 'sun',
    background: 'bg-amber-1',
    text: 'text-amber-9',
  },
  {
    max: 20,
    title: 'BAIXA CHANCE DE CHUVA',
    icon: 'soft-sun',
    background: 'bg-amber-1',
    text: 'text-amber-8',
  },
  {
    max: 50,
    title: 'PODE CHOVER HOJE',
    icon: 'drops',
    background: 'bg-light-blue-1',
    text: 'text-light-blue-9',
  },
  {
    max: 80,
    title: 'ALTA CHANCE DE CHUVA',
    icon: 'umbrella',
    background: 'bg-blue-grey-1',
    text: 'text-blue-grey-9',
  },
  {
    max: 100,
    title: 'CHANCE MUITO ALTA',
    icon: 'heavy-rain',
    background: 'bg-blue-grey-2',
    text: 'text-blue-grey-10',
  },
]

export function getRainRisk(probability) {
  const value = Math.min(100, Math.max(0, probability))
  return RAIN_RISK_LEVELS.find((level) => value <= level.max) || RAIN_RISK_LEVELS[0]
}
