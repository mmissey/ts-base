import fetcher from '~/utils/fetcher';
import { toNormalizedList } from './schemas';
import { throwErrorUnlessOk } from '~/utils/errorUnlessOk';
import { fromGalleryApiArray } from './adapters';

export const fetchGallery = (id: string): Promise<GalleriesMap> => {
  return fetcher(
    `gallery/album/${id}`,
    () => import(/* webpackChunkName: "mocks" */ '../../../_mocks/galleries'),
    (mocks) => mocks.fetchGallery(),
  ).then(throwErrorUnlessOk).then((json) =>
    toNormalizedList(
      fromGalleryApiArray(json.data)
    )
  );
};
