import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import SectorAction from './Action';
import SectorApi from '../../../apis/TrainingSector';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* hanldeGetSectors(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SectorApi.getAndSearchSector, req);
		if (!res.errors) {
			yield put(SectorAction.getSectorsSuccess(res));
		} else {
			yield put(SectorAction.getSectorsFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SectorAction.getSectorsFailure());
		message.error('Lấy danh sách ngành đào tạo không thành công ! Xin thử lại');
	}
}
function* hanldeGetSubjectsForSector(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SectorApi.getSubjectForSector, req);
		if (!res.errors) {
			yield put(SectorAction.getSubjectsForSectorSuccess(res));
		} else {
			yield put(SectorAction.getSubjectsForSectorFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SectorAction.getSubjectsForSectorFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}
function* hanldeGetSubjectsOfSector(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SectorApi.getSubjectOfSector, req);
		if (!res.errors) {
			yield put(SectorAction.getSubjectsOfSectorSuccess(res));
		} else {
			yield put(SectorAction.getSubjectsOfSectorFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SectorAction.getSubjectsOfSectorFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}
function* hanldeAddSubjectToSector(action) {
	try {
		const { req, cb, pageCurrent, keyword } = action.payload;
		const res = yield call(SectorApi.addSubjectToSector, req);
		if (!res.errors) {
			yield put(SectorAction.addSubjectToSectorSuccess(res));
			yield put(
				SectorAction.getSubjectsForSectorRequest({ req: { ...pageCurrent, keyword, sectorID: req && req.sectorID } }),
			);
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm môn học vào ngành thành công' });
		} else {
			yield put(SectorAction.addSubjectToSectorFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SectorAction.addSubjectToSectorFailure());
		message.error('Thêm môn học vào ngành không thành công ! Xin thử lại');
	}
}
function* hanldeRemoveSubjectFromSector(action) {
	try {
		const { ID, sectorID, cb } = action.payload;
		const res = yield call(SectorApi.removeSubjectFromSector, ID);
		if (!res.errors) {
			yield put(SectorAction.removeSubjectFromSectorSuccess(res));
			yield put(SectorAction.getSubjectsOfSectorRequest({ req: { limit: 10, page: 1, sectorID } }));
			if (cb && typeof cb === 'function') yield cb({ isRemoved: true, msg: 'Xóa môn học ra khỏi ngành thành công' });
		} else {
			yield put(SectorAction.removeSubjectFromSectorFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SectorAction.removeSubjectFromSectorFailure());
		message.error('Xóa môn học khỏi ngành không thành công ! Xin thử lại');
	}
}
function* hanldeSearchSector(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SectorApi.getAndSearchSector, req);
		if (!res.errors) {
			yield put(SectorAction.searchSectorSuccess(res));
		} else {
			yield put(SectorAction.searchSectorFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SectorAction.searchSectorFailure());
		message.error('Tìm kiếm ngành đào tạo không thành công ! Xin thử lại');
	}
}
function* handleCreateSector(action) {
	try {
		const {
			req,
			pageCurrent: { limit, page },
			keyword,
			cb,
		} = action.payload;
		const res = yield call(SectorApi.createSector, req);
		if (!res.errors) {
			yield put(SectorAction.createSectorSuccess());
			yield put(SectorAction.getSectorsRequest({ req: { limit, page, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ msg: 'Thêm mới ngành thành công', isCreated: true });
		} else {
			yield put(SectorAction.createSectorFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SectorAction.createSectorFailure());
		message.error('Thêm mới ngành không thành công ! Xin thử lại');
	}
}
function* handleUpdateSector(action) {
	try {
		const {
			req,
			ID,
			pageCurrent: { limit, page },
			keyword,
			cb,
		} = action.payload;
		const res = yield call(SectorApi.updateSector, { req, ID });
		if (!res.errors) {
			yield put(SectorAction.updateSectorSuccess());
			yield put(SectorAction.getSectorsRequest({ req: { limit, page, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ msg: 'Cập nhật ngành thành công', isUpdated: true });
		} else {
			yield put(SectorAction.updateSectorFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SectorAction.updateSectorFailure());
		message.error('Cập nhật ngành không thành công ! Xin thử lại');
	}
}
function* handleDeleteSector(action) {
	try {
		const {
			ID,
			pageCurrent: { limit, page },
			keyword,
			cb,
		} = action.payload;
		const res = yield call(SectorApi.deleteSector, ID);
		if (!res.errors) {
			yield put(SectorAction.deleteSectorSuccess());
			yield put(SectorAction.getSectorsRequest({ req: { limit, page, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ msg: 'Xóa ngành thành công', isDeleted: true });
		} else {
			yield put(SectorAction.deleteSectorFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SectorAction.deleteSectorFailure());
		message.error('Xóa ngành không thành công ! Xin thử lại');
	}
}

const getSectorsSaga = {
	on: SectorAction.getSectorsRequest,
	worker: hanldeGetSectors,
};
const getSubjectsForSectorSaga = {
	on: SectorAction.getSubjectsForSectorRequest,
	worker: hanldeGetSubjectsForSector,
};
const getSubjectsOfSectorSaga = {
	on: SectorAction.getSubjectsOfSectorRequest,
	worker: hanldeGetSubjectsOfSector,
};
const addSubjectToSectorSaga = {
	on: SectorAction.addSubjectToSectorRequest,
	worker: hanldeAddSubjectToSector,
};
const removeSubjectFromSectorSaga = {
	on: SectorAction.removeSubjectFromSectorRequest,
	worker: hanldeRemoveSubjectFromSector,
};

const searchSectorSaga = {
	on: SectorAction.searchSectorRequest,
	worker: hanldeSearchSector,
};

const createSectorSaga = {
	on: SectorAction.createSectorRequest,
	worker: handleCreateSector,
};

const updateSectorSaga = {
	on: SectorAction.updateSectorRequest,
	worker: handleUpdateSector,
};

const deleteSectorSaga = {
	on: SectorAction.deleteSectorRequest,
	worker: handleDeleteSector,
};

export default createSagas([
	getSectorsSaga,
	searchSectorSaga,
	createSectorSaga,
	updateSectorSaga,
	deleteSectorSaga,
	getSubjectsForSectorSaga,

	getSubjectsOfSectorSaga,
	addSubjectToSectorSaga,
	removeSubjectFromSectorSaga,
]);
