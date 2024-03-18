import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '../../server/src/trpc/trpc.router'

export default defineNuxtPlugin(() => {
    const client = createTRPCNuxtClient<AppRouter>({
        links: [
            httpBatchLink({
                url: 'http://localhost:3001/trpc',
            }),
        ],
    })

    return {
        provide: {
            client,
        },
    }
})
