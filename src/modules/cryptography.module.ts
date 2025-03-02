import { Encrypter } from '@/shared/application/cryptography/encrypter'
import { HashComparer } from '@/shared/application/cryptography/hash-comparer'
import { HashGenerator } from '@/shared/application/cryptography/hash-generator'
import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { BcryptHasher } from './infrastructure/cryptography/bcrypt-hasher'
import { JwtEncrypter } from './infrastructure/cryptography/jwt-encrypter'

@Module({
  providers: [
    {
      provide: Encrypter,
      useFactory: (jwtService: JwtService) => {
        return new JwtEncrypter(jwtService)
      },
      inject: [JwtService],
    },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [
    {
      provide: Encrypter,
      useFactory: (jwtService: JwtService) => {
        return new JwtEncrypter(jwtService)
      },
      inject: [JwtService],
    },
    HashComparer,
    HashGenerator,
  ],
})
export class CryptoGraphyModule {}
