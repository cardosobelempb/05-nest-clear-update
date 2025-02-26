import { Module } from '@nestjs/common'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { UserSignUpController } from './infrastructure/controllers/user/user-signup/user-signup.controller'
import { UserFindManyController } from './infrastructure/controllers/user/user-find-many/user-find-many.controller'

@Module({
  imports: [],
  controllers: [UserSignUpController, UserFindManyController],
  providers: [PrismaService],
})
export class UserModule {}
