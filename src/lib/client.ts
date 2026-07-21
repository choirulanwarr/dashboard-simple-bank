import { createConnectTransport } from '@connectrpc/connect-web'
import { createClient } from '@connectrpc/connect'
import { SimpleBank } from '../gen/simple_bank_connect'

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:9090'

const transport = createConnectTransport({
  baseUrl,
  interceptors: [
    (next) => async (req) => {
      const token = localStorage.getItem('access_token')
      if (token) {
        req.header.set('Authorization', `Bearer ${token}`)
      }
      return next(req)
    },
  ],
})

export const client = createClient(SimpleBank, transport)
