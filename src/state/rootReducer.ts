/* eslint-disable import/prefer-default-export */
import { combineReducers } from "redux";

import { default as images } from "./images/reducer";
import { default as galleries } from "./galleries/reducer";
import { default as users } from "./users/reducer";

export default combineReducers<RootState>({
  images,
  galleries,
  users
});
