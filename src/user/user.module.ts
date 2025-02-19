import { Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class UserModule {}
