import ActionTypes from './actionTypes';
import * as Galleries from './actions';

const galleries = (state: GalleriesMap = {}, action: Galleries.Actions) => {
  switch (action.type) {
    case ActionTypes.fetchGallerySuccess:
      return { ...state, ...action.payload.galleries};
    default:
      return state;
  }
};

export default galleries;
