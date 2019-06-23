import { normalize, schema } from 'normalizr';
import get from 'lodash/get';

const imageSchema = new schema.Entity(
  'images',
  {},
  { idAttribute: 'id' },
);
const imageListSchema = [imageSchema];

export const toNormalized = (adaptedImage: Image) => {
  const normalized = normalize(adaptedImage, imageSchema);
  return get(normalized, 'entities.images', {});
};

export const toNormalizedList = (adaptedNotificationArray: Image[]) => {
  const normalized = normalize(adaptedNotificationArray, imageListSchema);
  return get(normalized, 'entities.images', {});
};
