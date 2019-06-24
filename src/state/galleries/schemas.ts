import { normalize, schema } from 'normalizr';
import get from 'lodash/get';

const gallerySchema = new schema.Entity(
  'galleries',
  {},
  { idAttribute: 'id' },
);
const galleriesListSchema = [gallerySchema];

export const toNormalized = (adaptedGallery: Gallery) => {
  const normalized = normalize(adaptedGallery, gallerySchema);
  return get(normalized, 'entities.galleries', {});
};

export const toNormalizedList = (adaptedGalleryArray: Gallery[]) => {
  const normalized = normalize(adaptedGalleryArray, galleriesListSchema);
  return get(normalized, 'entities.galleries', {});
};
