import { HashGenerator } from '@/shared/application/cryptography/hash-generator'
import { Module } from '@nestjs/common'

import { UserPrismaRepository } from './application/repositories/prisma/user-prisma.repository'
import { UserFindByIdUseCase } from './application/use-cases/user/user-find-by-id.usercase'
import { UserManyUseCase } from './application/use-cases/user/user-many.usercase'
import { UserSignupUseCase } from './application/use-cases/user/user-signup.usecase'
import { CryptoGraphyModule } from './cryptography.module'
import { DatabaseModule } from './database.module'
import { UserFindByIdController } from './infrastructure/controllers/user/user-find-by-id.controller'
import { UserManyController } from './infrastructure/controllers/user/user-many.controller'
import { UserSignUpController } from './infrastructure/controllers/user/user-signup.controller'

@Module({
  imports: [DatabaseModule, CryptoGraphyModule],
  controllers: [UserSignUpController, UserManyController, UserFindByIdController],
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
    {
      provide: UserManyUseCase,
      useFactory: (
        userPrismaRepository: UserPrismaRepository,
      ) => {
        return new UserManyUseCase(userPrismaRepository)
      },
      inject: [UserPrismaRepository],
    },
    {
      provide: UserFindByIdUseCase,
      useFactory: (
        userPrismaRepository: UserPrismaRepository,
      ) => {
        return new UserFindByIdUseCase(userPrismaRepository)
      },
      inject: [UserPrismaRepository],
    },
  ],
})
export class UserModule {}
