import { HashGenerator } from '@/shared/application/cryptography/hash-generator'
import { Module } from '@nestjs/common'

import { UserPrismaRepository } from './application/repositories/prisma/user-prisma.repository'
import { UserSignupUseCase } from './application/use-cases/user/user-signup.usecase'
import { DatabaseModule } from './database.module'
import { UserFindManyController } from './infrastructure/controllers/user/user-find-many/user-find-many.controller'
import { UserSignUpController } from './infrastructure/controllers/user/user-signup/user-signup.controller'
import { BcryptHasher } from './infrastructure/cryptography/bcrypt-hasher'

@Module({
  imports: [DatabaseModule],
  controllers: [UserSignUpController, UserFindManyController],
  providers: [

        {
          provide: 'HashGenerator',
          useClass: BcryptHasher
        },
        {
          provide: UserSignupUseCase,
          useFactory: (
            hashGenerator: HashGenerator,
            userPrismaRepository: UserPrismaRepository,
          ) => {
            return new UserSignupUseCase(
              hashGenerator,
              userPrismaRepository,
            )
          },
          inject: ['HashGenerator', 'UserPrismaRepository'],
        },
  ],
})
export class UserModule {}
