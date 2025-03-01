import { Module } from "@nestjs/common";

import { BcryptHasher } from "./bcrypt-hasher";
import { JwtEncrypter } from "./jwt-encrypter";

@Module({
  providers: [
    {
      provide: 'Encrypter',
      useClass: JwtEncrypter
    },
    {
      provide: 'HashGenerator',
      useClass: BcryptHasher
    },
    {
      provide: 'HashComparer',
      useClass: BcryptHasher
    }
  ],
  exports: [
    {
      provide: 'Encrypter',
      useClass: JwtEncrypter
    },
    {
      provide: 'HashGenerator',
      useClass: BcryptHasher
    },
    {
      provide: 'HashComparer',
      useClass: BcryptHasher
    }
  ]
})
export class CryptoGraphyModule { }
