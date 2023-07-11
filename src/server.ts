import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { Server } from 'http'

process.on('uncaughtException', error => {
  console.log('uncaught Exception is detected', error)
  process.exit(1)
})

let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      console.log(`application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }

  process.on('unhandledRejection', error => {
    console.log('unhandled Rejection is detected, we closing server...')
    if (server) {
      server.close(() => {
        console.log(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})
