import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Select, Input, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';

import ExamAction from '../Action';
import TableTransferQuestion from './TableTransferQuestion';
import customMessage from '../../../../utils/customMessage';

const getIDQuestions = async arr => {
	const arrResult = [];
	if (arr.length > 0) await arr.forEach(ele => arrResult.push(ele._id));
	return arrResult;
};

function ModalPickQuestion(props) {
	const {
		visible,
		setVisible,
		getQuestionsForUpdateExamStatus,
		questionsForUpdateExam,
		getQuestionsReq,
		updateExamReq,
		examData,
	} = props;
	const refSearch = useRef(null);
	const refSelectType = useRef(null);
	const refSelectLevel = useRef(null);
	const [questionData, setQuestionData] = useState([]);
	const [keyword, setKeyword] = useState('');
	const [levelPick, setLevelPick] = useState(0);
	const [typePick, setTypePick] = useState(2);

	useEffect(() => {
		async function getQuestions() {
			if (examData && examData.questions) {
				let arrQuestion = [];
				if (examData.questions && examData.questions.length > 0) arrQuestion = await getIDQuestions(examData.questions);
				getQuestionsReq({
					req: {
						limit: 10,
						page: 1,
						keyword: '',
						level: 0,
						type: 2,
						questions: JSON.stringify(arrQuestion),
					},
				});
			}
		}
		getQuestions();
	}, [examData]);

	const loadingGetQuestions = getQuestionsForUpdateExamStatus === 'FETCHING';

	const handlePickTypeQuestion = async value => {
		let arrQuestion = [];
		if (examData.questions && examData.questions.length > 0) arrQuestion = await getIDQuestions(examData.questions);
		setTypePick(value);
		getQuestionsReq({
			req: {
				limit: 10,
				page: 1,
				keyword,
				type: value,
				level: levelPick,
				questions: JSON.stringify(arrQuestion),
			},
		});
	};
	const handlePickLevelQuestion = async value => {
		let arrQuestion = [];
		if (examData.questions && examData.questions.length > 0) arrQuestion = await getIDQuestions(examData.questions);
		setLevelPick(value);
		getQuestionsReq({
			req: {
				limit: 10,
				page: 1,
				keyword,
				type: typePick,
				level: value,
				questions: JSON.stringify(arrQuestion),
			},
		});
	};

	const handleSearchQuestion = async value => {
		let arrQuestion = [];
		if (examData.questions && examData.questions.length > 0) arrQuestion = await getIDQuestions(examData.questions);
		setKeyword(value);
		getQuestionsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
				type: typePick,
				level: levelPick,
				questions: JSON.stringify(arrQuestion),
			},
		});
	};
	const handleReload = async () => {
		let arrQuestion = [];
		if (examData.questions && examData.questions.length > 0) arrQuestion = await getIDQuestions(examData.questions);
		setKeyword('');
		setLevelPick(0);
		setTypePick(2);
		refSearch.current.input.state.value = '';
		refSelectType.current.rcSelect.state.value = [2];
		refSelectLevel.current.rcSelect.state.value = [0];
		getQuestionsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				level: 0,
				type: 2,
				questions: JSON.stringify(arrQuestion),
			},
		});
	};
	const handleChangePage = async page => {
		let arrQuestion = [];
		if (examData.questions && examData.questions.length > 0) arrQuestion = await getIDQuestions(examData.questions);
		getQuestionsReq({
			req: {
				limit: Number(page.pageSize),
				page: Number(page.current),
				keyword,
				level: levelPick,
				type: typePick,
				questions: JSON.stringify(arrQuestion),
			},
		});
	};

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			if (selectedRows.length > 0) {
				setQuestionData(selectedRowKeys);
			} else setQuestionData(selectedRowKeys);
		},
	};
	const handleUpdateQuestions = () => {
		if (questionData.length > 0) {
			const arrQuestion = [...(examData && examData.questions)];
			questionData.forEach(ele => arrQuestion.push(ele));
			updateExamReq({
				ID: examData && examData._id,
				req: {
					questions: arrQuestion,
				},
				cb: res => {
					if (res && res.isUpdated) {
						setQuestionData([]);
						setKeyword('');
						setLevelPick(0);
						setTypePick(2);
						setVisible(false);
						customMessage('notification', 'success', res.msg);
					}
				},
			});
		}
	};

	return (
		<Modal
			title="Danh sách câu hỏi"
			className="phh-modal"
			visible={visible}
			width="850px"
			onCancel={() => {
				setVisible(false);
				setQuestionData([]);
			}}
			footer={
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<Button
						className="btn-submit"
						disabled={questionData && questionData.length < 1}
						onClick={handleUpdateQuestions}
					>
						Xác nhận
					</Button>
					<Button
						className="btn-cancel ml-5"
						onClick={() => {
							setQuestionData([]);
							setKeyword('');
							setLevelPick(0);
							setTypePick(2);
							setVisible(false);
						}}
					>
						Đóng
					</Button>
				</div>
			}
		>
			<div className="title">
				<h4>
					Danh sách câu hỏi &ensp;&ensp;
					{questionData && questionData.length > 0 ? `( ${questionData.length} câu hỏi được chọn )` : ''}
				</h4>
				<p>(Click chọn câu hỏi muốn cho vào đề thi )</p>
			</div>
			<div className="phh-group-search mb-10">
				<Row gutter={8}>
					<Col xs={24} md={14} className="mt-15">
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
					<Col xs={12} md={5} className="mt-15">
						<div className="select-pick">
							<h4>Trạng thái </h4>
							<Select ref={refSelectType} defaultValue={2} onChange={handlePickTypeQuestion}>
								<Select.Option value={2}>Tất cả</Select.Option>
								<Select.Option value={1}>Công khai</Select.Option>
								<Select.Option value={0}>Riêng tư</Select.Option>
							</Select>
						</div>
					</Col>
					<Col xs={12} md={5} className="mt-15">
						<div className="select-pick">
							<h4>Mức độ </h4>
							<Select ref={refSelectLevel} defaultValue={0} onChange={handlePickLevelQuestion}>
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
			<TableTransferQuestion
				loading={loadingGetQuestions}
				data={questionsForUpdateExam && questionsForUpdateExam.data}
				pagination={questionsForUpdateExam && questionsForUpdateExam.pagination}
				rowSelection={rowSelection}
				handleChangePage={handleChangePage}
			/>
		</Modal>
	);
}

ModalPickQuestion.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getQuestionsForUpdateExamStatus: PropTypes.string.isRequired,
	getQuestionsReq: PropTypes.func.isRequired,
	updateExamReq: PropTypes.func.isRequired,
	examData: PropTypes.objectOf(PropTypes.any).isRequired,
	questionsForUpdateExam: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
	questionsForUpdateExam: state.examPage.questionsForUpdateExam,
	getQuestionsForUpdateExamStatus: state.examPage.getQuestionsForUpdateExamStatus,
});

const mapDispatchToProps = {
	getQuestionsReq: ExamAction.getQuestionsForUpdateExamRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPickQuestion);
