import { execSync } from 'node:child_process'

const configs = [
  'vite.config.countryFlag.js',
  'vite.config.currentForm.js',
  'vite.config.scoreRenderer.js',
  'vite.config.teamFilter.js'
]

for (const config of configs) {
  execSync(`vite build --config ${config}`, { stdio: 'inherit' })
}