import { HashGenerator } from '@/shared/application/cryptography/hash-generator'
import { Module } from '@nestjs/common'

import { UserPrismaRepository } from './application/repositories/prisma/user-prisma.repository'
import { UserSignupUseCase } from './application/use-cases/user/user-signup.usecase'
import { CryptoGraphyModule } from './cryptography.module'
import { DatabaseModule } from './database.module'
import { UserFindManyController } from './infrastructure/controllers/user/user-find-many/user-find-many.controller'
import { UserSignUpController } from './infrastructure/controllers/user/user-signup/user-signup.controller'

@Module({
  imports: [DatabaseModule, CryptoGraphyModule],
  controllers: [UserSignUpController, UserFindManyController],
  providers: [
    {
      provide: UserSignupUseCase,
      useFactory: (
        hashGenerator: HashGenerator,
        userPrismaRepository: UserPrismaRepository,
      ) => {
        return new UserSignupUseCase(hashGenerator, userPrismaRepository)
      },
      inject: [HashGenerator, UserPrismaRepository],
    },
  ],
})
export class UserModule {}
