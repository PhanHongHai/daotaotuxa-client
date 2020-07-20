import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import Action from './Action';
import ClassApi from '../../../apis/Class';
import TrainingSectorApi from '../../../apis/TrainingSector';
import SubjectApi from '../../../apis/Subject';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetDetailClass() {
	try {
		const res = yield call(ClassApi.getInfoClassByAccount);
		if (!res.errors) {
			yield put(Action.getDetailClassByTeacherSuccess(res));
		} else {
			yield put(Action.getDetailClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getDetailClassByTeacherFailure());
		message.error('Lấy thông tin lớp không thành công ! Xin thử lại');
	}
}
function* handleGetStudentOfClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ClassApi.getAndSearchStudentOfClassByTeacher, req);
		if (!res.errors) {
			yield put(Action.getStudentOfClassByTeacherSuccess(res));
		} else {
			yield put(Action.getStudentOfClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getStudentOfClassByTeacherFailure());
		message.error('Lấy thông tin học viên của lớp không thành công ! Xin thử lại');
	}
}

function* handleGetSubjectOfClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(TrainingSectorApi.getSubjectOfSectorGroupFile, req);
		if (!res.errors) {
			yield put(Action.getSubjectOfClassByTeacherSuccess(res));
		} else {
			yield put(Action.getSubjectOfClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getSubjectOfClassByTeacherFailure());
		message.error('Lấy thông tin môn học của lớp không thành công ! Xin thử lại');
	}
}

function* handleCreateSubjectOfClass(action) {
	try {
		const { req, pageCurrent, keyword, sectorID, cb } = action.payload;
		const res = yield call(SubjectApi.createSubject, req);
		if (!res.errors) {
			yield put(Action.createSubjectByTeacherSuccess());
			yield put(Action.getSubjectOfClassByTeacherSuccess({ req: { ...pageCurrent, keyword, sectorID } }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới môn học thành công' });
		} else {
			yield put(Action.createSubjectByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.createSubjectByTeacherFailure());
		message.error('Tạo môn học không thành công ! Xin thử lại');
	}
}

function* handleUpdateClass(action) {
	try {
		const { req, ID, cb } = action.payload;
		const res = yield call(ClassApi.updateClass, { req, ID });
		if (!res.errors) {
			yield put(Action.updateClassByTeacherSuccess());
			yield put(Action.getDetailClassByTeacherRequest({ ID }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Cập nhật trạng thái lớp học thành công' });
		} else {
			yield put(Action.updateClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.updateClassByTeacherFailure());
		message.error('Cập nhật trạng thái lớp học không thành công ! Xin thử lại');
	}
}

const getDetailClassSaga = {
	on: Action.getDetailClassByTeacherRequest,
	worker: handleGetDetailClass,
};

const getStudentOfClassSaga = {
	on: Action.getStudentOfClassByTeacherRequest,
	worker: handleGetStudentOfClass,
};
const getSubjectOfClassSaga = {
	on: Action.getSubjectOfClassByTeacherRequest,
	worker: handleGetSubjectOfClass,
};
const createSubjectOfClassSaga = {
	on: Action.createSubjectByTeacherRequest,
	worker: handleCreateSubjectOfClass,
};

const updateClasByTeacherSaga = {
	on: Action.updateClassByTeacherRequest,
	worker: handleUpdateClass,
};

export default createSagas([
	getDetailClassSaga,
	getStudentOfClassSaga,
	getSubjectOfClassSaga,
	createSubjectOfClassSaga,
	updateClasByTeacherSaga
]);
