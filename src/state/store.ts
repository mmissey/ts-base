import { createStore, applyMiddleware, Store } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import combinedReducers from './rootReducer';
import epics from './rootEpic';
import AnalyticsMiddleware from './analyticsMiddleware';

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    combinedReducers,
    {},
    applyMiddleware.apply(null, [
      epicMiddleware,
      AnalyticsMiddleware,
    ]),
);

epicMiddleware.run(combineEpics(...epics));

export default store;
