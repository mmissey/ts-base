import fetcher from '../../utils/fetcher';
import { toNormalizedList } from './schemas';
import { throwErrorUnlessOk } from '../../utils/errorUnlessOk';

export const fetchSubredditImages = (subreddit: string): Promise<ImagesMap> => {
  return fetcher(
    `gallery/r/${subreddit}`
  ).then(throwErrorUnlessOk).then((json) => toNormalizedList(json.data));
};
