import ActionTypes from "./actionTypes";
import * as Images from "./actions";

const images = (state: ImagesMap = {}, action: Images.Actions) => {
  switch (action.type) {
    case ActionTypes.fetchImages:
      // set loading state or something
      console.log(`fetching ${action.payload.subreddit}`);
      return state;

    case ActionTypes.fetchImagesSuccess:
      return { ...state, ...action.payload.images };

    case ActionTypes.fetchImagesFailure:
      // clear loading, set error state
      console.log(`Error fetching. Error: ${action.payload.error}`);
      return state;
    default:
      return state;
  }
};

export default images;
