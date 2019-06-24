import values from 'lodash/values';
import { createSelector, OutputSelector } from 'reselect';

const imagesById = (state: RootState) => state.images;

export const getImagesToArray: OutputSelector<
  RootState,
  Image[],
  (res: ImagesMap) => Image[]
> = createSelector([imagesById], (images): Image[] => values(images));
