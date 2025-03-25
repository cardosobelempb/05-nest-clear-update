export namespace Category {
  export type Props = {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date | null;
    userId: string;
  };
}
