// src/lib/prisma.js
import { PrismaClient } from '../generated/prisma'

let prisma

if (typeof globalThis.prisma !== 'undefined') {
  prisma = globalThis.prisma
} else {
  prisma = new PrismaClient({
    log: [
      { level: 'warn', emit: 'event' },
      { level: 'info', emit: 'event' },
      { level: 'error', emit: 'event' },
    ],
  })

  prisma.$on('warn', (e) => {
    console.warn('[Prisma warn]', e)
  })

  prisma.$on('info', (e) => {
    console.info('[Prisma info]', e)
  })

  prisma.$on('error', (e) => {
    console.error('[Prisma error]', e)
  })

  if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma
  }
}

export default prisma
