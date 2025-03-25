import { Appointment } from '../appointment/appointment';
import { AvailableTime } from '../available-time/available-time';
import { Category } from '../category/category';
import { Service } from '../service/service';

export namespace User {
  export enum Roles {
    ADMIN,
    CLIENT,
    SUPPLIER
  }

  export type Props = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    isActive: boolean;
    role: Roles;
    createdAt: Date;
    updatedAt?: Date | null;

    availablesTimes: AvailableTime.Props[];
    services: Service.Prpos[];
    categories: Category.Props[];
    appointments: Appointment.Props[];
  };
}
