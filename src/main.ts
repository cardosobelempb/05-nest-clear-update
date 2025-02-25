import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { ConfigService } from '@nestjs/config'
import { EnvType } from './shared/env/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })

  const configService = app.get<ConfigService<EnvType, true>>(ConfigService)
  const appPort = configService.get('APP_PORT', { infer: true })
  const prefixUrl = configService.get('PREFIX_URL', { infer: true })

  app.setGlobalPrefix(prefixUrl)
  await app.listen(appPort)
}
bootstrap()
