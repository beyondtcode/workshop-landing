import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mondayApiPlugin } from './vite-plugin-monday-api.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.MONDAY_API_TOKEN) process.env.MONDAY_API_TOKEN = env.MONDAY_API_TOKEN
  if (env.MONDAY_BOARD_ID) process.env.MONDAY_BOARD_ID = env.MONDAY_BOARD_ID

  return {
    plugins: [react(), tailwindcss(), mondayApiPlugin()],
  }
})
