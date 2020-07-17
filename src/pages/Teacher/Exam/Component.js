import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Card, Button, Modal } from 'antd';
import { useHistory } from 'react-router-dom';

import BreadCrumb from '../../../components/BreadCrumb';
import TableDataExam from './Component/TableExam';
import customMess from '../../../utils/customMessage';
import ModalPreivewExam from './Component/ModalViewExam';
import ModalCreateExamAuto from './Component/ModalCreateExamAuto';

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
];

const { confirm } = Modal;

function ExamComponent(props) {
	const {
		getExamsStatus,
		removeExamStatus,
		createExamAutoStatus,
		getExamsReq,
		removeExamReq,
		exams,
		authAccountReq,
		createExamAutoReq,
		authPasswordStatus,
		totalQuestion,
		getTotalQuestionStatus,
		getTotalQuestionReq,
	} = props;

	const history = useHistory();
	const refSearch = useRef(null);
	const [pageCurrent, setPageCurrent] = useState({ limit: 10, page: 1 });
	const [keyword, setKeyword] = useState('');
	const [visibleViewExam, setVisibleViewExam] = useState(false);
	const [infoExam, setinfoExam] = useState({});
	const [visibleCreateExamAuto, setVisibleCreateExamAuto] = useState(false);

	useEffect(() => {
		getExamsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
			},
		});
		getTotalQuestionReq({
			req: {
				typeLevel1: 2,
				typeLevel2: 2,
				typeLevel3: 2,
				typeLevel4: 2,
			},
		});
	}, [getExamsReq]);

	const loadingGetExams = getExamsStatus === 'FETCHING';
	const loadingRemoveExam = removeExamStatus === 'FETCHING';
	const loadingAuthPassowrd = authPasswordStatus === 'FETCHING';
	const loadingCreateExamAuto = createExamAutoStatus === 'FETCHING';
	const loadingGetTotalQuestion = getTotalQuestionStatus === 'FETCHING';

	const handleRemoveExam = dataExam => {
		confirm({
			title: 'Bạn có muốn xóa câu hỏi này ?',
			onOk() {
				removeExamReq({
					ID: dataExam._id,
					pageCurrent,
					keyword,
					cb: res => {
						if (res.isDeleted) customMess('notification', 'success', res.msg);
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};
	const handleSearchExam = value => {
		setKeyword(setKeyword);
		getExamsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
			},
		});
	};
	const onChangeTable = page => {
		setPageCurrent({
			limit: Number(page.limit),
			page: Number(page.current),
		});
		getExamsReq({
			req: {
				limit: Number(page.limit),
				page: Number(page.current),
				keyword,
			},
		});
	};
	const handleViewExam = data => {
		setinfoExam(data);
		setVisibleViewExam(true);
	};
	const handleReload = () => {
		setKeyword('');
		setPageCurrent({ limit: 10, page: 1 });
		refSearch.current.input.state.value = '';
		getExamsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
			},
		});
	};

	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="none" visible={false} pageCurrentText="Quản lý đề thi" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row>
					<Col span={24}>
						<Card
							className="phh-card"
							title="Danh sách đề thi"
							extra={
								<span className="group-btn">
									<Button type="primary" icon="plus" onClick={() => history.push('/teacher/dashboard/quan-ly-de-thi/them-de-thi')}>
										Tạo mới thủ công
									</Button>
									<Button icon="plus" className="ml-5" onClick={() => setVisibleCreateExamAuto(true)}>
										Tạo mới tự động
									</Button>
								</span>
							}
						>
							<div className="phh-group-search mb-10">
								<Input.Search
									addonBefore={
										<Button
											className="btn-reload"
											style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
											icon="sync"
											onClick={handleReload}
										>
											Làm mới
										</Button>
									}
									ref={refSearch}
									placeholder="Nhập từ khóa.."
									enterButton="Tìm kiếm"
									onSearch={handleSearchExam}
								/>
							</div>
							<TableDataExam
								loading={loadingGetExams}
								loadingRemove={loadingRemoveExam}
								data={exams && exams.data}
								pagination={exams && exams.pagination}
								handleRemoveExam={handleRemoveExam}
								onChangeTable={onChangeTable}
								handleViewExam={handleViewExam}
							/>
						</Card>
					</Col>
				</Row>
			</div>
			<ModalPreivewExam
				visible={visibleViewExam}
				setVisible={setVisibleViewExam}
				data={infoExam}
				authAccountReq={authAccountReq}
				loadingAuth={loadingAuthPassowrd}
			/>
			<ModalCreateExamAuto
				visible={visibleCreateExamAuto}
				setVisible={setVisibleCreateExamAuto}
				loadingCreate={loadingCreateExamAuto}
				createReq={createExamAutoReq}
				totalQuestion={totalQuestion}
				loadingGetTotalQuestion={loadingGetTotalQuestion}
				getTotalQuestionReq={getTotalQuestionReq}
				pageCurrent={pageCurrent}
				keyword={keyword}
			/>
		</div>
	);
}

ExamComponent.propTypes = {
	getExamsStatus: PropTypes.string.isRequired,
	removeExamStatus: PropTypes.string.isRequired,
	authPasswordStatus: PropTypes.string.isRequired,
	createExamAutoStatus: PropTypes.string.isRequired,
	getTotalQuestionStatus: PropTypes.string.isRequired,
	getExamsReq: PropTypes.func.isRequired,
	removeExamReq: PropTypes.func.isRequired,
	authAccountReq: PropTypes.func.isRequired,
	createExamAutoReq: PropTypes.func.isRequired,
	getTotalQuestionReq: PropTypes.func.isRequired,
	exams: PropTypes.objectOf(PropTypes.any).isRequired,
	totalQuestion: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExamComponent;
