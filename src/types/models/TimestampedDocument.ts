export type TimestampedDocument = {
  updatedAt?: Date;
  createdAt?: Date;
  isStale?: () => boolean;
};
