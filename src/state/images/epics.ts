import { ActionsObservable, ofType } from 'redux-observable';
import {
  catchError,
  flatMap,
  switchMap,
} from 'rxjs/operators';
import {from, of, Observable } from 'rxjs';

import * as Images from './actions';
import ActionTypes from './actionTypes';
import {
  fetchSubredditImages,
} from './service';

const fetchImagesEpic = (action$: ActionsObservable<ReturnType<typeof Images.Actions.fetchImages>>):
Observable<
  ReturnType<
  | typeof Images.Actions.fetchImages
  | typeof Images.Actions.fetchImagesSuccess
  | typeof Images.Actions.fetchImagesFailure
  >
> =>
  action$.pipe(
    ofType(ActionTypes.fetchImages),
    switchMap(({ payload: { subreddit } }) =>
      from(fetchSubredditImages(subreddit)).pipe(
        flatMap((res) => {
          return of(Images.Actions.fetchImagesSuccess(res));
        }),
        catchError((e) => of(
          Images.Actions.fetchImagesFailure(e),
        ))
      )
    )
  );

export default [ fetchImagesEpic ];
