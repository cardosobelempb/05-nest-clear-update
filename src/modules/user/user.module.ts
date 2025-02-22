import { Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { UserSignUpController } from './infra/controllers/user-signup/user-signup.controller'
import { UserFindManyController } from './infra/controllers/user-find-many/user-find-many.controller'

@Module({
  imports: [],
  controllers: [UserSignUpController, UserFindManyController],
  providers: [PrismaService],
})
export class UserModule {}
