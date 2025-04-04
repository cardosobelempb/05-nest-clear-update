import { UserMeService } from '@/application/use-cases/user/user-me.service'
import { UserMeController } from '@/infrastructure/controllers/user/user-me.controller'
import { HashGenerator } from '@/shared/application/cryptography/hash-generator'
import { Module } from '@nestjs/common'

import { UserRepository } from '../application/repositories/user.repository'
import { UserFindByIdUseCase } from '../application/use-cases/user/user-find-by-id.usercase'
import { UserManyUseCase } from '../application/use-cases/user/user-many.usercase'
import { UserSignupUseCase } from '../application/use-cases/user/user-signup.usecase'
import { UserFindByIdController } from '../infrastructure/controllers/user/user-find-by-id.controller'
import { UserManyController } from '../infrastructure/controllers/user/user-many.controller'
import { UserSignUpController } from '../infrastructure/controllers/user/user-signup.controller'
import { CryptoGraphyModule } from './cryptography.module'
import { DatabaseModule } from './database.module'

@Module({
  imports: [DatabaseModule, CryptoGraphyModule],
  controllers: [
    UserSignUpController,
    UserManyController,
    UserFindByIdController,
    UserMeController,
  ],
  providers: [
    {
      provide: UserSignupUseCase,
      useFactory: (
        hashGenerator: HashGenerator,
        userRepository: UserRepository,
      ) => {
        return new UserSignupUseCase(hashGenerator, userRepository)
      },
      inject: [HashGenerator, 'UserRepository'],
    },
    {
      provide: UserManyUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new UserManyUseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: UserFindByIdUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new UserFindByIdUseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: UserMeService,
      useFactory: (userRepository: UserRepository) => {
        return new UserMeService(userRepository)
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}
