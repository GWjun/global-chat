import ky from 'ky'
import { BASE_URL } from '@routes/path.ts'

export const baseFetcher = ky.create({
  prefixUrl: BASE_URL,
})

export const authFetcher = baseFetcher.extend({
  hooks: {},
})
