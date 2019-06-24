import { ActionsObservable, ofType } from 'redux-observable';
import {
  catchError,
  flatMap,
  switchMap,
} from 'rxjs/operators';
import {from, of, Observable } from 'rxjs';

import * as Users from './actions';
import ActionTypes from './actionTypes';
import {
  fetchUser,
} from './service';

const fetchUserEpic = (action$: ActionsObservable<ReturnType<typeof Users.Actions.fetchUser>>):
Observable<
  ReturnType<
| typeof Users.Actions.fetchUser
| typeof Users.Actions.fetchUserSuccess
| typeof Users.Actions.fetchUserFailure
  >
> =>
  action$.pipe(
    ofType(ActionTypes.fetchUser),
    switchMap(({ payload: { id } }) =>
      from(fetchUser(id)).pipe(
        flatMap((res) => {
          return of(Users.Actions.fetchUserSuccess(res));
        }),
        catchError((e) => of(
          Users.Actions.fetchUserFailure(e),
        ))
      )
    )
  );

export default [ fetchUserEpic ];
