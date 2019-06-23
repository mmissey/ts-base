/* eslint-disable import/prefer-default-export */
import { combineReducers } from 'redux';

import { default as images } from './images/reducer';

export default combineReducers<RootState>({
    images
});
