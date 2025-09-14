export interface AuditableEntity {
  createdAt: Date;
  updatedAt?: Date;
}

export interface IEntity<T> {
  id: T;
}
