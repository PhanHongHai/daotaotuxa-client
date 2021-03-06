import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Card, Button, Modal, Select } from 'antd';
import { useHistory } from 'react-router-dom';

import BreadCrumb from '../../../components/BreadCrumb';
import TableDataQuestion from './Component/TableDataQuestion';
import customMess from '../../../utils/customMessage';

const { confirm } = Modal;
const breadcrumb = [
	{
		icon: 'home',
		path: '/teacher/dashboard',
		text: '',
	},
];

function QuestionComponent(props) {
	const {
		getAndSearchQuestionStatus,
		removeQuestionStatus,
		questions: { data, pagination },
		getAndSearchQuestionReq,
		removeQuestionReq,
	} = props;
	const history = useHistory();
	const refSearch = useRef(null);
	const [pageCurrent, setPageCurrent] = useState({ limit: 10, page: 1 });
	const [keyword, setKeyword] = useState('');
	const [levelPick, setLevelPick] = useState(0);
	const [typePick, setTypePick] = useState(2);

	useEffect(() => {
		getAndSearchQuestionReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				level: 0,
				type: 2,
			},
		});
	}, []);

	const loadingGetQuestions = getAndSearchQuestionStatus === 'FETCHING';
	const loadingRemoveQuestions = removeQuestionStatus === 'FETCHING';

	const handleRemoveQuestion = dataQuestion => {
		confirm({
			title: 'Bạn có muốn xóa câu hỏi này ?',
			onOk() {
				removeQuestionReq({
					ID: dataQuestion._id,
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
	const handleSearchQuestion = text => {
		setKeyword(text);
		getAndSearchQuestionReq({
			req: {
				limit: 10,
				page: 1,
				keyword: text,
			},
		});
	};
	const handleChangePage = page => {
		setPageCurrent({
			limit: Number(page.limit),
			page: Number(page.current),
		});
		getAndSearchQuestionReq({
			req: {
				limit: Number(page.limit),
				page: Number(page.current),
				keyword,
				level: levelPick,
				type: typePick,
			},
		});
	};

	const handlePickTypeQuestion = value => {
		setTypePick(value);
		getAndSearchQuestionReq({
			req: {
				limit: 10,
				page: 1,
				keyword,
				type: value,
				level: levelPick,
			},
		});
	};
	const handlePickLevelQuestion = value => {
		setLevelPick(value);
		getAndSearchQuestionReq({
			req: {
				limit: 10,
				page: 1,
				keyword,
				type: typePick,
				level: value,
			},
		});
	};
	const handleReload = () => {
		setTypePick(2);
		setLevelPick(0);
		setKeyword('');
		refSearch.current.input.state.value = '';
		getAndSearchQuestionReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				type: 2,
				level: 0,
			},
		});
	};

	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="none" visible={false} pageCurrentText="Ngân Hàng Câu Hỏi" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row>
					<Col span={24}>
						<Card
							className="phh-card"
							title="Danh sách câu hỏi"
							extra={
								<span className="group-btn">
									<Button
										type="primary"
										icon="plus"
										onClick={() => history.push('/teacher/dashboard/ngan-hang-cau-hoi/them-cau-hoi')}
									>
										Tạo mới
									</Button>
								</span>
							}
						>
							<div className="phh-group-search mb-10">
								<Row gutter={8}>
									<Col xs={24} md={16} className="mt-15">
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
											onSearch={handleSearchQuestion}
										/>
									</Col>
									<Col xs={12} md={4} className="mt-15">
										<div className="select-pick">
											<h4>Trạng thái </h4>
											<Select defaultValue={2} onChange={handlePickTypeQuestion}>
												<Select.Option value={2}>Tất cả</Select.Option>
												<Select.Option value={1}>Công khai</Select.Option>
												<Select.Option value={0}>Riêng tư</Select.Option>
											</Select>
										</div>
									</Col>
									<Col xs={12} md={4} className="mt-15">
										<div className="select-pick">
											<h4>Mức độ </h4>
											<Select defaultValue={0} onChange={handlePickLevelQuestion}>
												<Select.Option value={0}>Tất cả</Select.Option>
												<Select.Option value={1}>Dễ</Select.Option>
												<Select.Option value={2}>Trung bình</Select.Option>
												<Select.Option value={3}>Khó</Select.Option>
												<Select.Option value={4}>Rất khó</Select.Option>
											</Select>
										</div>
									</Col>
								</Row>
							</div>
							<TableDataQuestion
								data={data}
								pagination={pagination}
								loading={loadingGetQuestions}
								loadingRemove={loadingRemoveQuestions}
								handleRemoveQuestion={handleRemoveQuestion}
								handleChangePage={handleChangePage}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
}

QuestionComponent.propTypes = {
	getAndSearchQuestionStatus: PropTypes.string.isRequired,
	removeQuestionStatus: PropTypes.string.isRequired,
	questions: PropTypes.objectOf(PropTypes.any).isRequired,
	getAndSearchQuestionReq: PropTypes.func.isRequired,
	removeQuestionReq: PropTypes.func.isRequired,
};

export default QuestionComponent;
