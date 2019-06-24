import values from 'lodash/values';
import { createSelector, OutputSelector } from 'reselect';

const usersById = (state: RootState) => state.users;

export const getUsersToArray: OutputSelector<
  RootState,
  User[],
  (res: UsersMap) => User[]
> = createSelector([usersById], (users): User[] => values(users));
