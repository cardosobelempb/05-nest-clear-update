import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { EnvService } from './shared/infrastructure/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })

  const envService = app.get(EnvService)
  const appPort = envService.get('APP_PORT')
  const prefixUrl = envService.get('PREFIX_URL')

  app.setGlobalPrefix(prefixUrl)
  await app.listen(appPort)
}
bootstrap()
