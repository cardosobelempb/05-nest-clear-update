import { Module } from '@nestjs/common'
import { EnvService } from '../shared/infrastructure/env/env.service'

@Module({
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
