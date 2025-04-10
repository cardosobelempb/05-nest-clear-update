export namespace Category {
  export interface Props  {
    id?: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date | null;
    userId: string;
  };
}
