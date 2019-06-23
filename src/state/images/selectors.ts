import values from 'lodash/values';
import { createSelector, OutputSelector } from 'reselect';

const imagesById = (state: RootState) => state.images;

export const getImagesToArray: OutputSelector<
  any,
  Image[],
  (res: ImagesMap) => Image[]
> = createSelector([imagesById], (images): Image[] => values(images));
