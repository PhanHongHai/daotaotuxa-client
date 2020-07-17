import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Tabs, Card, Button, Icon, Modal, Input } from 'antd';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import { DetailSubjectStyle } from './styled';

import BreadCrumb from '../../../components/BreadCrumb';

import customMess from '../../../utils/customMessage';
import FormEditSubject from './Component/FormEditSubject';
import TableContent from './Component/TableContent';
import ModalCreateContent from './Component/ModalCreateContent';
import ModalEditContent from './Component/ModalEditContent';

const { TabPane } = Tabs;
const { confirm } = Modal;


function DetailSubject(props) {
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [visibleEdit, setVisibleEdit] = useState(false);
	const [typeDocument, setTypeDocument] = useState('');
	const [keyword, setKeyword] = useState('');
	const [pageCurrent, setPageCurrent] = useState({ limit: 10, page: 1 });
	const refInput = useRef(null);
	const { classID,subjectID } = useParams();
	const history = useHistory();
	const {
		getDetailSubjectStatus,
		updateSubjectStatus,
		deleteSubjectStatus,
		detailSubject,
		getDetailSubjectReq,
		updateSubjectReq,
		deleteSubjectReq,
		getDetailDocumentReq,
		getDocumetsReq,
		createDocumentReq,
		updateDocumentReq,
		deleteDocumentReq,
		getDocumentsStatus,
		getDetailDocumentStatus,
		createDocumentStatus,
		updateDocumentStatus,
		deleteDocumentStatus,
		deleteFileDocStatus,
		documents,
		detailDocument,
		removeFileDocReq,
	} = props;

	useEffect(() => {
		getDetailSubjectReq({
			subjectID,
		});
	}, [subjectID, getDetailSubjectReq]);

	const loadingGetSubject = getDetailSubjectStatus === 'FETCHING';
	const loadingUpdateSubject = updateSubjectStatus === 'FETCHING';
	const loadingDeleteSubject = deleteSubjectStatus === 'FETCHING';
	const loadingGetDocuments = getDocumentsStatus === 'FETCHING';
	const loadingGetDetailDoc = getDetailDocumentStatus === 'FETCHING';
	const loadingCreateDoc = createDocumentStatus === 'FETCHING';
	const loadingUpdateDoc = updateDocumentStatus === 'FETCHING';
	const loadingDeleteDoc = deleteDocumentStatus === 'FETCHING';
	const loadingDeleteFileDoc = deleteFileDocStatus === 'FETCHING';

	const breadcrumb = [
		{
			icon: 'home',
			path: '/teacher/dashboard',
			text: '',
		},
		{
			icon: 'audit',
			path: `/teacher/dashboard/lop-hoc/${classID}`,
			text: 'Lớp Học',
		},
	];

	const handleDelete = () => {
		confirm({
			title: `Bạn có muốn xóa môn học : ${detailSubject && detailSubject.name} ?`,
			onOk() {
				deleteSubjectReq({
					ID: detailSubject && detailSubject._id,
					pageCurrent,
					keyword,
					type: typeDocument,
					cb: res => {
						if (res.isRedirect) {
							history.push(`/teacher/dashboard/lop-hoc/${classID}`);
							customMess('notification', 'success', res.msg);
						}
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};
	const handleSearch = value => {
		setKeyword(value);
		getDocumetsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
				type: typeDocument,
			},
		});
	};
	const handleReload = () => {
		setKeyword('');
		refInput.current.input.state.value = '';
		setPageCurrent({ limit: 10, page: 1 });
		getDocumetsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				type: typeDocument,
				subjectID,
			},
		});
	};
	const openEditDoc = async docID => {
		await getDetailDocumentReq({
			ID: docID,
		});
		setTimeout(() => setVisibleEdit(true), 500);
	};
	const handleChangePage = page => {
		setPageCurrent({
			page: Number(page.current),
			limit: 10,
		});
		getDocumetsReq({
			page: Number(page.current),
			limit: 10,
			type: typeDocument,
			keyword,
		});
	};
	const handleChangeTab = key => {
		setTypeDocument(key);
		if (key !== 'info')
			getDocumetsReq({
				req: {
					limit: 10,
					page: 1,
					keyword: '',
					type: key,
					subjectID,
				},
			});
	};
	const handleDeleteContent = row => {
		confirm({
			title: `Bạn có muốn xóa nội dung : ${row && row.title} ?`,
			onOk() {
				deleteDocumentReq({
					ID: row && row._id,
					cb: res => {
						if (res && res.isDeleted) customMess('notification', 'success', res.msg);
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};
	return (
		<DetailSubjectStyle>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon='empy' visible={false} pageCurrentText="Chi tiết môn học" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Tabs type="card tab-custom" onChange={handleChangeTab}>
					<TabPane
						tab={
							<span className="title-tab">
								<Icon type="info-circle" />
								&ensp;Thông tin môn học
							</span>
						}
						key="info"
					>
						<Card className="phh-card" loading={loadingGetSubject}>
							<div className="mt-10">
								<FormEditSubject
									updateReq={updateSubjectReq}
									deleteReq={handleDelete}
									loadingUpdate={loadingUpdateSubject}
									loadingDelete={loadingDeleteSubject}
									info={detailSubject}
								/>
							</div>
						</Card>
					</TabPane>
					<TabPane
						tab={
							<span className="title-tab">
								<Icon type="read" />
								&ensp; Bài học
							</span>
						}
						key="lesson"
					>
						<Card className="phh-card">
							<div className="phh-group-search mb-10 mt-10 flex" style={{ alignItems: 'center' }}>
								<Input.Search
									ref={refInput}
									addonBefore={
										<Button
											className="btn-reload"
											style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
											icon="sync"
											loading={loadingGetDocuments}
											onClick={handleReload}
										>
											Làm mới
										</Button>
									}
									placeholder="Nhập từ khóa.."
									enterButton
									onSearch={handleSearch}
								/>
								<span className="group-btn">
									<Button icon="plus" style={{ height: '40px' }} onClick={() => setVisibleCreate(true)} />
								</span>
							</div>
							<TableContent
								onChangePage={handleChangePage}
								data={documents && documents.data}
								pagination={documents && documents.pagination}
								loading={loadingGetDocuments}
								loadingGetDetal={loadingGetDetailDoc}
								openEdit={openEditDoc}
								openDelete={handleDeleteContent}
								loadingDelete={loadingDeleteDoc}
							/>
						</Card>
					</TabPane>
					<TabPane
						tab={
							<span className="title-tab">
								<Icon type="form" />
								&ensp; Bài tập
							</span>
						}
						key="homework"
					>
						<Card className="phh-card">
							<div className="phh-group-search mb-10 mt-10 flex" style={{ alignItems: 'center' }}>
								<Input.Search
									ref={refInput}
									addonBefore={
										<Button
											className="btn-reload"
											style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
											icon="sync"
											loading={loadingGetDocuments}
											onClick={handleReload}
										>
											Làm mới
										</Button>
									}
									placeholder="Nhập từ khóa.."
									enterButton
									onSearch={handleSearch}
								/>
								<span className="group-btn">
									<Button icon="plus" style={{ height: '40px' }} onClick={() => setVisibleCreate(true)} />
								</span>
							</div>
							<TableContent
								onChangePage={handleChangePage}
								data={documents && documents.data}
								pagination={documents && documents.pagination}
								loading={loadingGetDocuments}
								loadingGetDetal={loadingGetDetailDoc}
								openEdit={openEditDoc}
								openDelete={handleDeleteContent}
								loadingDelete={loadingDeleteDoc}
							/>
						</Card>
					</TabPane>
					<TabPane
						tab={
							<span className="title-tab">
								<Icon type="file" />
								&ensp; Đề cương
							</span>
						}
						key="document"
					>
						<Card className="phh-card">
							<div className="phh-group-search mb-10 mt-10 flex" style={{ alignItems: 'center' }}>
								<Input.Search
									ref={refInput}
									addonBefore={
										<Button
											className="btn-reload"
											style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
											icon="sync"
											loading={loadingGetDocuments}
											onClick={handleReload}
										>
											Làm mới
										</Button>
									}
									placeholder="Nhập từ khóa.."
									enterButton
									onSearch={handleSearch}
								/>
								<span className="group-btn">
									<Button icon="plus" style={{ height: '40px' }} onClick={() => setVisibleCreate(true)} />
								</span>
							</div>
							<TableContent
								onChangePage={handleChangePage}
								data={documents && documents.data}
								pagination={documents && documents.pagination}
								loading={loadingGetDocuments}
								loadingGetDetal={loadingGetDetailDoc}
								openEdit={openEditDoc}
								openDelete={handleDeleteContent}
								loadingDelete={loadingDeleteDoc}
							/>
						</Card>
					</TabPane>
				</Tabs>
			</div>
			<ModalCreateContent
				pageCurrent={pageCurrent}
				createDocReq={createDocumentReq}
				loadingCreate={loadingCreateDoc}
				visible={visibleCreate}
				setVisible={setVisibleCreate}
				subjectID={subjectID}
				type={typeDocument}
				keyword={keyword}
			/>
			<ModalEditContent
				pageCurrent={pageCurrent}
				updateReq={updateDocumentReq}
				loadingUpdate={loadingUpdateDoc}
				loadingRemoveFile={loadingDeleteFileDoc}
				visible={visibleEdit}
				setVisible={setVisibleEdit}
				removeFile={removeFileDocReq}
				data={detailDocument}
				type={typeDocument}
				subjectID={subjectID}
				keyword={keyword}
			/>
		</DetailSubjectStyle>
	);
}

DetailSubject.propTypes = {
	getDetailSubjectStatus: PropTypes.string.isRequired,
	updateSubjectStatus: PropTypes.string.isRequired,
	deleteSubjectStatus: PropTypes.string.isRequired,
	detailSubject: PropTypes.objectOf(PropTypes.any).isRequired,
	getDocumentsStatus: PropTypes.string.isRequired,
	getDetailDocumentStatus: PropTypes.string.isRequired,
	createDocumentStatus: PropTypes.string.isRequired,
	updateDocumentStatus: PropTypes.string.isRequired,
	deleteDocumentStatus: PropTypes.string.isRequired,
	deleteFileDocStatus: PropTypes.string.isRequired,
	documents: PropTypes.objectOf(PropTypes.any).isRequired,
	detailDocument: PropTypes.objectOf(PropTypes.any).isRequired,
	getDetailSubjectReq: PropTypes.func.isRequired,
	getDetailDocumentReq: PropTypes.func.isRequired,
	getDocumetsReq: PropTypes.func.isRequired,
	createDocumentReq: PropTypes.func.isRequired,
	updateDocumentReq: PropTypes.func.isRequired,
	deleteDocumentReq: PropTypes.func.isRequired,
	updateSubjectReq: PropTypes.func.isRequired,
	deleteSubjectReq: PropTypes.func.isRequired,
	removeFileDocReq: PropTypes.func.isRequired,
};


export default DetailSubject;
