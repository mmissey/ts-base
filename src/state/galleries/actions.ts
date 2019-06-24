import ActionTypes from './actionTypes'
import { createAction, ActionsUnion } from '../../state/actionHelpers';

export const Actions = {
    fetchGallery: (id: string) =>
        createAction(ActionTypes.fetchGallery, { id }),
    fetchGallerySuccess: (galleries: GalleriesMap) =>
        createAction(ActionTypes.fetchGallerySuccess, { galleries }),
    fetchGalleryFailure: (error: string) =>
        createAction(ActionTypes.fetchGalleryFailure, { error }),
};
export type Actions = ActionsUnion<typeof Actions>;

export default Actions;
