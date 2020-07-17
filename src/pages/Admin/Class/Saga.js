import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import ClassAction from './Action';
import ClassAPI from '../../../apis/Class';
import AccountAPI from '../../../apis/Account';
import AnalysisApi from '../../../apis/Analysis';
import SectorAPI from '../../../apis/TrainingSector';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* hanldeGetInfoTeacherByClassID(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(ClassAPI.getInfoTeacherByClassID, ID);
		if (!res.errors) {
			yield put(ClassAction.getInfoTeacherByClassIDSuccess(res));
		} else {
			yield put(ClassAction.getInfoTeacherByClassIDFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getInfoTeacherByClassIDFailure());
		message.error('Lấy thông tin giảng viên không thành công ! Xin thử lại');
	}
}
function* hanldeGetSectors(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SectorAPI.getAll, req);
		if (!res.errors) {
			yield put(ClassAction.getSectorsForClassSuccess(res));
		} else {
			yield put(ClassAction.getSectorsForClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getSectorsForClassFailure());
		message.error('Lấy danh sách ngành đào tạo không thành công ! Xin thử lại');
	}
}
function* hanldeGetTeachers(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountAPI.getAndSearchAccountNonClass, req);
		if (!res.errors) {
			yield put(ClassAction.getTeachersSuccess(res));
		} else {
			yield put(ClassAction.getTeachersFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getTeachersFailure());
		message.error('Lấy danh sách giảng viên không thành công ! Xin thử lại');
	}
}
function* hanldeGetStudents(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountAPI.getAndSearchAccountNonClass, req);
		if (!res.errors) {
			yield put(ClassAction.getStudentsForClassSuccess(res));
		} else {
			yield put(ClassAction.getStudentsForClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getStudentsForClassFailure());
		message.error('Lấy danh sách học viên không thành công ! Xin thử lại');
	}
}
function* hanldeGetStudentOfClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ClassAPI.getAndSearchStudentOfClass, req);
		if (!res.errors) {
			yield put(ClassAction.getStudentOfClassSuccess(res));
		} else {
			yield put(ClassAction.getStudentOfClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getStudentOfClassFailure());
		message.error('Lấy danh sách học viên không thành công ! Xin thử lại');
	}
}

function* hanldeSearchTeacher(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountAPI.getAndSearch, req);
		if (!res.errors) {
			yield put(ClassAction.searchTeacherForClassSuccess(res));
		} else {
			yield put(ClassAction.searchTeacherForClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.searchTeacherForClassFailure());
		message.error('Tìm kiếm giảng viên không thành công ! Xin thử lại');
	}
}
function* hanldeGetClasses(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ClassAPI.getAndSearchClass, req);
		if (!res.errors) {
			yield put(ClassAction.getClassesSuccess(res));
		} else {
			yield put(ClassAction.getClassesFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getClassesFailure());
		message.error('Lấy danh sách lớp không thành công ! Xin thử lại');
	}
}
function* hanldeSearchClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ClassAPI.getAndSearchClass, req);
		if (!res.errors) {
			yield put(ClassAction.searchClassSuccess(res));
		} else {
			yield put(ClassAction.searchClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.searchClassFailure());
		message.error('Tìm kiếm lớp không thành công ! Xin thử lại');
	}
}
function* hanldeFilterClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ClassAPI.filterClass, req);
		if (!res.errors) {
			yield put(ClassAction.filterClassSuccess(res));
		} else {
			yield put(ClassAction.filterClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.filterClassFailure());
		message.error('Lọc trạng thái lớp không thành công ! Xin thử lại');
	}
}
function* hanldeGetDetailClass(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(ClassAPI.getDetailClass, ID);
		if (!res.errors) {
			yield put(ClassAction.getDetailClassSuccess(res));
		} else {
			yield put(ClassAction.getDetailClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getDetailClassFailure());
		message.error('Lấy dữ liệu lớp không thành công ! Xin thử lại');
	}
}

function* hanldeCreateClass(action) {
	try {
		const { req, cb, pageCurrent } = action.payload;
		const res = yield call(ClassAPI.createClass, req);
		if (!res.errors) {
			yield put(ClassAction.createClassSuccess());
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Tạo lớp học thành công' });
			yield put(
				ClassAction.getClassesRequest({
					req: { ...pageCurrent },
				}),
			);
		} else {
			yield put(ClassAction.createClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.createClassFailure());
		message.error('Tạo lớp học không thành công ! Xin thử lại');
	}
}
function* hanldeUpdateClass(action) {
	try {
		const { req, ID, cb, pageCurrent } = action.payload;
		const res = yield call(ClassAPI.updateClass, { req, ID });
		if (!res.errors) {
			yield put(ClassAction.updateClassSuccess());
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật lớp học thành công' });
			yield put(
				ClassAction.getClassesRequest({
					req: { ...pageCurrent },
				}),
			);
		} else {
			yield put(ClassAction.updateClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.updateClassFailure());
		message.error('Cập nhật lớp học không thành công ! Xin thử lại');
	}
}
function* hanldeUpdateDetailClass(action) {
	try {
		const { req, ID, cb } = action.payload;
		const res = yield call(ClassAPI.updateClass, { req, ID });
		if (!res.errors) {
			yield put(ClassAction.updateDetailClassSuccess());
			yield put(ClassAction.getDetailClassRequest({ ID }));
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật lớp học thành công' });
		} else {
			yield put(ClassAction.updateDetailClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.updateDetailClassFailure());
		message.error('Cập nhật lớp học không thành công ! Xin thử lại');
	}
}
function* hanldeDeleteClass(action) {
	try {
		const { ID, cb, pageCurrent } = action.payload;
		const res = yield call(ClassAPI.deleteClass, ID);
		if (!res.errors) {
			yield put(ClassAction.deleteClassSuccess());
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa lớp học thành công' });
			yield put(
				ClassAction.getClassesRequest({
					req: { ...pageCurrent },
				}),
			);
		} else {
			yield put(ClassAction.deleteClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.deleteClassFailure());
		message.error('Xóa lớp học không thành công ! Xin thử lại');
	}
}
function* hanldeAddStudentToClass(action) {
	try {
		const { req, cb, pageCurrent, keyword, classID } = action.payload;
		const res = yield call(ClassAPI.addAccountToClass, req);
		if (!res.errors) {
			yield put(ClassAction.addStudentToClassSuccess());
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Thêm học viên vào lớp thành công' });
			yield put(
				ClassAction.getStudentsForClassRequest({
					req: { ...pageCurrent, keyword, type: 'student' },
				}),
			);
			yield put(ClassAction.getStudentOfClassRequest({ req: { keyword: '', page: 1, limit: 3, classID } }));
		} else {
			yield put(ClassAction.addStudentToClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.addStudentToClassFailure());
		message.error('Thêm học viên vào lớp không thành công ! Xin thử lại');
	}
}
function* hanldeAddTeacherToClass(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(ClassAPI.addAccountToClass, req);
		if (!res.errors) {
			yield put(ClassAction.addTeacherToClassSuccess());
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật giảng viên vào lớp thành công' });
			yield put(ClassAction.getInfoTeacherByClassIDRequest({ ID: req && req.classID }));
			yield put(
				ClassAction.getTeachersRequest({
					req: { limit: 5, page: 1, keyword: '', type: 'teacher' },
				}),
			);
		} else {
			yield put(ClassAction.addTeacherToClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.addTeacherToClassFailure());
		message.error('Cập nhật giảng viên vào lớp không thành công ! Xin thử lại');
	}
}
function* hanldeRemoveStudentToClass(action) {
	try {
		const { ID, classID, cb, pageCurrent, keyword } = action.payload;
		const res = yield call(ClassAPI.removeStudentOfClass, ID);
		if (!res.errors) {
			yield put(ClassAction.removeStudentToClassSuccess());
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa học viên khỏi lớp thành công' });
			yield put(
				ClassAction.getStudentOfClassRequest({
					req: { ...pageCurrent, keyword, classID },
				}),
			);
			yield put(ClassAction.getStudentsForClassRequest({ req: { keyword: '', page: 1, limit: 3, type: 'student' } }));
		} else {
			yield put(ClassAction.removeStudentToClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.removeStudentToClassFailure());
		message.error('Xóa học viên khỏi lớp không thành công ! Xin thử lại');
	}
}
function* hanldeAddStudentToDetailClass(action) {
	try {
		const { req, cb, ID } = action.payload;
		const res = yield call(ClassAPI.deleteClass, req);
		if (!res.errors) {
			yield put(ClassAction.addStudentToDetailClassSuccess());
			yield put(ClassAction.getDetailClassRequest({ ID }));
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Thêm học viên vào lớp thành công' });
		} else {
			yield put(ClassAction.addStudentToDetailClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.addStudentToDetailClassFailure());
		message.error('Thêm học viên vào lớp không thành công ! Xin thử lại');
	}
}
function* hanldeRemoveStudentToDetailClass(action) {
	try {
		const { ID, cb, classID } = action.payload;
		const res = yield call(ClassAPI.deleteClass, ID);
		if (!res.errors) {
			yield put(ClassAction.removeStudentToDetailClassSuccess());
			yield put(ClassAction.getDetailClassRequest({ ID: classID }));
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa học viên khỏi lớp thành công' });
		} else {
			yield put(ClassAction.removeStudentToDetailClassFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.removeStudentToDetailClassFailure());
		message.error('Xóa học viên khỏi lớp không thành công ! Xin thử lại');
	}
}
function* hanldeGetTotalClassAllTime() {
	try {
		const res = yield call(AnalysisApi.getTotalClassAllTime,{});
		if (!res.errors) {
			yield put(ClassAction.getTotalsClassAllTimeSuccess(res));
		} else {
			yield put(ClassAction.getTotalsClassAllTimeFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getTotalsClassAllTimeFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}
function* hanldeGetTotalClassByGroupDate(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AnalysisApi.getTotalClassByGroupDate, req);
		if (!res.errors) {
			yield put(ClassAction.getTotalsClassByGroupDateSuccess(res));
		} else {
			yield put(ClassAction.getTotalsClassByGroupDateFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getTotalsClassByGroupDateFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}
function* handleGetReportClassByTrainingType(action) {
	try {
		const { req , cb} = action.payload;
		const res = yield call(AnalysisApi.getReportClassByTrainingType, req);
		if (!res.errors) {
			yield put(ClassAction.getReportClassByTrainingTypeSuccess());
			if(cb && typeof cb === 'function') yield cb({data:res});
		} else {
			yield put(ClassAction.getReportClassByTrainingTypeFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		console.log(error);
		yield put(ClassAction.getReportClassByTrainingTypeFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}
function* handleGetReportClassByTrainingSector(action) {
	try {
		const { req , cb} = action.payload;
		const res = yield call(AnalysisApi.getReportClassByTrainingSector, req);
		if (!res.errors) {
			yield put(ClassAction.getReportClassByTrainingSectorSuccess());
			if(cb && typeof cb === 'function') yield cb({data:res});
		} else {
			yield put(ClassAction.getReportClassByTrainingSectorFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getReportClassByTrainingSectorFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}

function* handleGetReportTotalStudentByTrainingType(action) {
	try {
		const { req , cb} = action.payload;
		const res = yield call(AnalysisApi.getReportStudentByTrainingType, req);
		if (!res.errors) {
			yield put(ClassAction.getReportTotalStudentByTrainingTypeSuccess());
			if(cb && typeof cb === 'function') yield cb({data:res});
		} else {
			yield put(ClassAction.getReportTotalStudentByTrainingTypeFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
	
		yield put(ClassAction.getReportTotalStudentByTrainingTypeFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}
function* handleGetReportTotalStudentByTrainingSector(action) {
	try {
		const { req , cb} = action.payload;
		const res = yield call(AnalysisApi.getReportStudentByTrainingSector, req);
		if (!res.errors) {
			yield put(ClassAction.getReportTotalStudentByTrainingSectorSuccess());
			if(cb && typeof cb === 'function') yield cb({data:res});
		} else {
			yield put(ClassAction.getReportTotalStudentByTrainingSectorFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getReportTotalStudentByTrainingSectorFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}

function* handleGetReportTotalClassByYear(action) {
	try {
		const { req , cb} = action.payload;
		const res = yield call(AnalysisApi.getReportTotalClassByYear, req);
		if (!res.errors) {
			yield put(ClassAction.getReportTotalClassByYearSuccess());
			if(cb && typeof cb === 'function') yield cb({data:res});
		} else {
			yield put(ClassAction.getReportTotalClassByYearFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ClassAction.getReportTotalClassByYearFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}

const getInfoTeacherByClassIDSaga = {
	on: ClassAction.getInfoTeacherByClassIDRequest,
	worker: hanldeGetInfoTeacherByClassID,
};

const getSectorsSaga = {
	on: ClassAction.getSectorsForClassRequest,
	worker: hanldeGetSectors,
};

const getTeachersSaga = {
	on: ClassAction.getTeachersRequest,
	worker: hanldeGetTeachers,
};

const getStudentsSaga = {
	on: ClassAction.getStudentsForClassRequest,
	worker: hanldeGetStudents,
};

const getStudentOfClassSaga = {
	on: ClassAction.getStudentOfClassRequest,
	worker: hanldeGetStudentOfClass,
};

const searchTeacherSaga = {
	on: ClassAction.searchTeacherForClassRequest,
	worker: hanldeSearchTeacher,
};

const getClassesSaga = {
	on: ClassAction.getClassesRequest,
	worker: hanldeGetClasses,
};
const searchClassSaga = {
	on: ClassAction.searchClassRequest,
	worker: hanldeSearchClass,
};
const filterClassSaga = {
	on: ClassAction.filterClassRequest,
	worker: hanldeFilterClass,
};
const getDetailClassSaga = {
	on: ClassAction.getDetailClassRequest,
	worker: hanldeGetDetailClass,
};
const createClassSaga = {
	on: ClassAction.createClassRequest,
	worker: hanldeCreateClass,
};
const updateClassSaga = {
	on: ClassAction.updateClassRequest,
	worker: hanldeUpdateClass,
};
const updateDetailClassSaga = {
	on: ClassAction.updateDetailClassRequest,
	worker: hanldeUpdateDetailClass,
};
const deleteClassSaga = {
	on: ClassAction.deleteClassRequest,
	worker: hanldeDeleteClass,
};
const addStudentToClassSaga = {
	on: ClassAction.addStudentToClassRequest,
	worker: hanldeAddStudentToClass,
};
const addTeacherToClassSaga = {
	on: ClassAction.addTeacherToClassRequest,
	worker: hanldeAddTeacherToClass,
};
const removeStudentClassSaga = {
	on: ClassAction.removeStudentToClassRequest,
	worker: hanldeRemoveStudentToClass,
};
const addStudentToDetailClassSaga = {
	on: ClassAction.addStudentToDetailClassRequest,
	worker: hanldeAddStudentToDetailClass,
};
const removeStudentDetailClassSaga = {
	on: ClassAction.removeStudentToDetailClassRequest,
	worker: hanldeRemoveStudentToDetailClass,
};
const getTotalClassAlltimeSaga = {
	on: ClassAction.getTotalsClassAllTimeRequest,
	worker: hanldeGetTotalClassAllTime,
};
const getTotalClassByGroupDateSaga = {
	on: ClassAction.getTotalsClassByGroupDateRequest,
	worker: hanldeGetTotalClassByGroupDate,
};
const getReportClassByTrainingTypeSaga = {
	on: ClassAction.getReportClassByTrainingTypeRequest,
	worker: handleGetReportClassByTrainingType,
};

const getReportClassByTrainingSectorSaga = {
	on: ClassAction.getReportClassByTrainingSectorRequest,
	worker: handleGetReportClassByTrainingSector,
};

const getReportTotalStudentByTrainingTypeSaga = {
	on: ClassAction.getReportTotalStudentByTrainingTypeRequest,
	worker: handleGetReportTotalStudentByTrainingType,
};

const getReportTotalStudentByTrainingSectorSaga = {
	on: ClassAction.getReportTotalStudentByTrainingSectorRequest,
	worker: handleGetReportTotalStudentByTrainingSector,
};

const getReportTotalClassByYearSaga = {
	on: ClassAction.getReportTotalClassByYearRequest,
	worker: handleGetReportTotalClassByYear,
};

export default createSagas([
	getInfoTeacherByClassIDSaga,
	getTeachersSaga,
	getSectorsSaga,
	searchTeacherSaga,
	getClassesSaga,
	searchClassSaga,
	filterClassSaga,
	getDetailClassSaga,
	createClassSaga,
	updateClassSaga,
	updateDetailClassSaga,
	deleteClassSaga,
	getStudentsSaga,
	getStudentOfClassSaga,
	addStudentToClassSaga,
	addTeacherToClassSaga,
	removeStudentClassSaga,
	addStudentToDetailClassSaga,
	removeStudentDetailClassSaga,
	getTotalClassAlltimeSaga,
	getTotalClassByGroupDateSaga,
	getReportClassByTrainingTypeSaga,
	getReportClassByTrainingSectorSaga,
	getReportTotalStudentByTrainingTypeSaga,
	getReportTotalStudentByTrainingSectorSaga,
	getReportTotalClassByYearSaga
]);
