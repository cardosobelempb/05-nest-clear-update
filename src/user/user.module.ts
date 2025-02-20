import { Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { UserSignUpController } from './infra/controllers/user-signup/user-signup.controller'

@Module({
  imports: [],
  controllers: [UserSignUpController],
  providers: [PrismaService],
})
export class UserModule {}
