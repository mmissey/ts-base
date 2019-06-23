import { Action, ActionCreatorsMapObject } from 'redux';

export interface ActionWithPayload<T, P> extends Action<T> {
  payload: P;
}
// Overload the createAction function types
export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload?: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? {type} : {type, payload};
}

/**
 * `A` is an object with a bunch of key: createAction() in it.
 *  Type ActionsUnion is all of the return types for each of those createActions (SimpleAction, ActionWithPayload)
 */
export type ActionsUnion< A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
