import { Appointment } from "./appointment";
import { AvailableTime } from "./available-time";
import { Category } from "./category";
import { Service } from "./service";

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
    services: Service.Props[];
    categories: Category.Props[];
    appointments: Appointment.Props[];
  };
}
