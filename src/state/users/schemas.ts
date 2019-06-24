import { normalize, schema } from 'normalizr';
import get from 'lodash/get';

const userSchema = new schema.Entity(
  'users',
  {},
  { idAttribute: 'id' },
);
const userListSchema = [userSchema];

export const toNormalized = (adaptedUser: User) => {
  const normalized = normalize(adaptedUser, userSchema);
  return get(normalized, 'entities.users', {});
};

export const toNormalizedList = (adaptedNotificationArray: User[]) => {
  const normalized = normalize(adaptedNotificationArray, userListSchema);
  return get(normalized, 'entities.users', {});
};
