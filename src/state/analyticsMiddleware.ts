import Images from "~/state/images/actions";
import Users from "~/state/users/actions";
import Galleries from "~/state/galleries/actions";
import { Dispatch } from "redux";

interface BaseActions {
  images: Images;
  users: Users;
  galleries: Galleries;
}

/**
 * Narrows to { images: ImagesActions, users: never, etc }
 */
type FilteredActions<A, B> = {
  [Key in keyof B]: A extends B[Key] ? B[Key] : never
};

const incomingAction = Images.fetchImages("wheredidthesodago");
type IncomingFiltered = FilteredActions<typeof incomingAction, BaseActions>;

/**
 * Narrows to ResourceActions
 */
type ActionType<A> = FilteredActions<A, BaseActions>[keyof BaseActions];
type IncomingType = ActionType<typeof incomingAction>;

type AllActions = ActionType<BaseActions[keyof BaseActions]>;

const logEvent = <A extends AllActions>(resource: string, action: A) => {
  console.log(
    `#### fired ${resource} - Action ${action.type}`,
    action.payload || ""
  );
};

type LogFunction<A> = (action: ActionType<A>) => void;

const logFunctions = {
  images: logEvent.bind(this, "IMAGES"),
  users: logEvent.bind(this, "USERS"),
  galleries: logEvent.bind(this, "GALLERIES")
};

const trackEvent = <A extends AllActions>(action: ActionType<A>) => {
  const { type } = action;
  const resource = type.split(".")[0] as keyof typeof logFunctions;
  const logFn: LogFunction<A> = logFunctions[resource];
  logFn(action);
};

const analyticsMiddleware = ({
  dispatch,
  getState
}: {
  dispatch: Dispatch;
  getState(): RootState;
}) => {
  return (next: any) => <A extends AllActions>(action: ActionType<A>) => {
    trackEvent(action);
    return next(action);
  };
};

export default analyticsMiddleware;
