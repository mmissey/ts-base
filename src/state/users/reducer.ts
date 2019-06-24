import ActionTypes from './actionTypes';
import * as Users from './actions';

const users = (state: UsersMap = {}, action: Users.Actions) => {
  switch (action.type) {
    case ActionTypes.fetchUserSuccess:
      return { ...state, ...action.payload.user};
    default:
      return state;
  }
};

export default users;
