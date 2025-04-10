import { Appointment } from './appointment';

export namespace AvailableTime {
  export type Props = {
    id?: string;
    time: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date | null;
    userId: string;
    appointments: Appointment.Props[];
  };
}
