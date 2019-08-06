import ActionTypes from './actionTypes'
import { createAction, ActionsUnion } from '~/state/actionHelpers';

export const Actions = {
    fetchImages: (subreddit: string) =>
        createAction(ActionTypes.fetchImages, { subreddit }),
    fetchImagesSuccess: (images: ImagesMap) =>
        createAction(ActionTypes.fetchImagesSuccess, { images }),
    fetchImagesFailure: (error: string) =>
        createAction(ActionTypes.fetchImagesFailure, { error }),
};
export type Actions = ActionsUnion<typeof Actions>;

export default Actions;
