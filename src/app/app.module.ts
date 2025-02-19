import { Module } from '@nestjs/common'
import { AppService } from './application/services/app.service'
import { PrismaService } from '../shared/enterprise/database/prisma/prisma.servoce'
import { AppController } from './infra/controllers/app.controller'
import { UserModule } from 'src/user/user.module'
import { TimeModule } from 'src/time/time.module'
import { ServiceModule } from 'src/service/service.module'
import { AppointmentModule } from 'src/appointment/appointment.module'

@Module({
  imports: [UserModule, TimeModule, ServiceModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
