import fetcher from '~/utils/fetcher';
import { toNormalizedList } from './schemas';
import { throwErrorUnlessOk } from '~/utils/errorUnlessOk';
import { fromImageApiArray } from './adapters';

export const fetchSubredditImages = (subreddit: string): Promise<ImagesMap> => {
  return fetcher(
    `gallery/r/${subreddit}`,
    () => import(/* webpackChunkName: "mocks" */ '../../../_mocks/images'),
    (mocks) => mocks.fetchSubredditImages(),
  ).then(throwErrorUnlessOk).then((json) =>
    toNormalizedList(
      fromImageApiArray(json.data)
    )
  );
};
