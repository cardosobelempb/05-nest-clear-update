import { Module } from '@nestjs/common'

import { BcryptHasher } from './infrastructure/cryptography/bcrypt-hasher'
import { JwtEncrypter } from './infrastructure/cryptography/jwt-encrypter'

@Module({
  providers: [

    {
      provide: 'Encrypter',
      useClass: JwtEncrypter,
    },
    {
      provide: 'HashGenerator',
      useClass: BcryptHasher,
    },
    {
      provide: 'HashComparer',
      useClass: BcryptHasher,
    },
  ],
  exports: [

    {
      provide: 'Encrypter',
      useClass: JwtEncrypter,
    },
    {
      provide: 'HashGenerator',
      useClass: BcryptHasher,
    },
    {
      provide: 'HashComparer',
      useClass: BcryptHasher,
    },
  ],
})
export class CryptoGraphyModule {}
