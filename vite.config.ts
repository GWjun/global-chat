import { defineConfig, mergeConfig } from 'vite'
import {
  defineConfig as defineVitestConfig,
  coverageConfigDefaults,
} from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const viteConfig = defineConfig({
  plugins: [react(), tsconfigPaths()],
})

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      include: ['src/**'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        'src/__mock__/**',
        'src/apis/**',
        'src/components/_common/**',
        'src/components/lib/**',
      ],
      reporter: 'text',
    },
  },
})

export default mergeConfig(viteConfig, vitestConfig)
