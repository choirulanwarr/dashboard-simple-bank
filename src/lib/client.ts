import { createGrpcWebTransport } from '@connectrpc/connect-web'
import { createClient } from '@connectrpc/connect'
import { SimpleBank } from '../gen/simple_bank_connect'

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:9090'

const transport = createGrpcWebTransport({
  baseUrl,
  interceptors: [
    (next) => async (req) => {
      const token = localStorage.getItem('access_token')
      if (token) {
        req.header.set('Authorization', `Bearer ${token}`)
      }
      try {
        return await next(req)
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        if (msg.toLowerCase().includes('unauthenticated')) {
          localStorage.removeItem('access_token')
          window.location.href = '/login'
        }
        throw err
      }
    },
  ],
})

export const client = createClient(SimpleBank, transport)
