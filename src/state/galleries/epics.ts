import { ActionsObservable, ofType } from 'redux-observable';
import {
  catchError,
  flatMap,
  switchMap,
} from 'rxjs/operators';
import {from, of, Observable } from 'rxjs';

import * as Galleries from './actions';
import ActionTypes from './actionTypes';
import {
  fetchGallery,
} from './service';

const fetchGalleryEpic = (action$: ActionsObservable<ReturnType<typeof Galleries.Actions.fetchGallery>>):
Observable<
  ReturnType<
| typeof Galleries.Actions.fetchGallery
| typeof Galleries.Actions.fetchGallerySuccess
| typeof Galleries.Actions.fetchGalleryFailure
  >
> =>
  action$.pipe(
    ofType(ActionTypes.fetchGallery),
    switchMap(({ payload: { id } }) =>
      from(fetchGallery(id)).pipe(
        flatMap((res) => {
          return of(Galleries.Actions.fetchGallerySuccess(res));
        }),
        catchError((e) => of(
          Galleries.Actions.fetchGalleryFailure(e),
        ))
      )
    )
  );

export default [ fetchGalleryEpic ];
