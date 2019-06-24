import fetcher from '~/utils/fetcher';
import { toNormalizedList } from './schemas';
import { throwErrorUnlessOk } from '~/utils/errorUnlessOk';
import { fromUserApiArray } from './adapters';

export const fetchUser = (id: string): Promise<UsersMap> => {
  return fetcher(
    `account/${id}`,
    () => import(/* webpackChunkName: "mocks" */ '../../../_mocks/users'),
    (mocks) => mocks.fetchUser(),
  ).then(throwErrorUnlessOk).then((json) =>
    toNormalizedList(
      fromUserApiArray(json.data)
    )
  );
};
