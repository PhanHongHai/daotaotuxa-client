import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducer from './reducer';
import saga from './saga';

const isDev = process.env.NODE_ENV === 'development';
const middleware = isDev ? [logger] : [];
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware, ...middleware)));

saga.forEach(sg => {
	sagaMiddleware.run(sg);
});

export default store;
