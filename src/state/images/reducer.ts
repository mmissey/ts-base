import ActionTypes from './actionTypes';
import * as Images from './actions';

const images = (state: ImagesMap = {}, action: Images.Actions) => {
  switch (action.type) {
    case ActionTypes.fetchImagesSuccess:
      return { ...state, ...action.payload.images};
    default:
      return state;
  }
};

export default images;
