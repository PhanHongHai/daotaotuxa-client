import { flatten, reduce } from 'lodash';
import { takeLatest } from 'redux-saga/effects';
import { createAction as ReduxCreateAction, handleActions as handleReduxActions } from 'redux-actions';

function createAction(type) {
	const action = ReduxCreateAction(type);
	action.is = aType => action.toString() === aType;
	return action;
}

function createAsyncAction(action, type) {
	return {
		[`${action}Request`]: createAction(`${type}_REQUEST`),
		[`${action}Success`]: createAction(`${type}_SUCCESS`),
		[`${action}Failure`]: createAction(`${type}_FAILURE`),
	};
}

function handleActions(actions, initialState) {
	return handleReduxActions(
		reduce(
			actions,
			(reducer, handler, action) => {
				// eslint-disable-next-line
				reducer[action] = (state, act) =>
					handler(state.set('action', action), act);
				return reducer;
			},
			{},
		),
		initialState,
	);
}

function createReducers(stateContext, reducers, initialState) {
	return {
		[stateContext]: handleReduxActions(
			reduce(
				flatten(reducers),
				(reducer, action) => {
					// eslint-disable-next-line
					reducer[action.on] = action.reducer;
					return reducer;
				},
				{},
			),
			initialState,
		),
	};
}

function createSagas(sagas) {
	return flatten(sagas).map(
		saga =>
			function* take() {
				yield takeLatest(saga.on, saga.worker);
			},
	);
}

const Redux = {
	createAction,
	createAsyncAction,
	handleActions,
	createReducers,
	createSagas,
};

export default Redux;
