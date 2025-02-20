import { Module } from '@nestjs/common'
import { AppointmentModule } from 'src/appointment/appointment.module'
import { ServiceModule } from 'src/service/service.module'
import { TimeModule } from 'src/time/time.module'
import { UserModule } from 'src/user/user.module'
import { PrismaService } from '../shared/enterprise/database/prisma/prisma.servoce'

@Module({
  imports: [UserModule, TimeModule, ServiceModule, AppointmentModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
