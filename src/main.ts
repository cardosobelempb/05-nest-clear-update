import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })
  app.setGlobalPrefix('api/v1')
  await app.listen(process.env.PORT ?? 3333)
}
bootstrap()
