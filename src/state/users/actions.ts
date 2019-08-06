import ActionTypes from './actionTypes'
import { createAction, ActionsUnion } from '~/state/actionHelpers';

export const Actions = {
    fetchUser: (id: string) =>
        createAction(ActionTypes.fetchUser, { id }),
    fetchUserSuccess: (user: UsersMap) =>
        createAction(ActionTypes.fetchUserSuccess, { user }),
    fetchUserFailure: (error: string) =>
        createAction(ActionTypes.fetchUserFailure, { error }),
};
export type Actions = ActionsUnion<typeof Actions>;

export default Actions;
