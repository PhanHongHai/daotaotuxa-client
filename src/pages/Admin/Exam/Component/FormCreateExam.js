import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Form, Input, Select, InputNumber } from 'antd';

import customMess from '../../../../utils/customMessage';
import { FormCreateQuestionStyle } from '../styled';
import TableTransferQuestion from './TableTransferQuestion';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
		md: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
		md: { span: 20 },
	},
};
function FormCreateExam(props) {
	const {
		form: { getFieldDecorator, validateFields },
		loadingCreate,
		loadingGetQuestions,
		createExamReq,
		questions,
		getQuestionsReq,
		loadingGetSubjects,
		subjects,
	} = props;

	const history = useHistory();
	const refSearch = useRef(null);
	const refSelectType = useRef(null);
	const refSelectLevel = useRef(null);
	const [questionData, setQuestionData] = useState([]);
	const [keyword, setKeyword] = useState('');
	const [levelPick, setLevelPick] = useState(0);
	const [typePick, setTypePick] = useState(2);
	const [subjectValue, setSubjectValue] = useState('');

	const handleSubmitCreate = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (questionData && questionData.length < 1) customMess('message', 'error', 'Vui lòng chọn câu hỏi cho đề thi');
			if (!err && questionData.length > 0) {
				createExamReq({
					req: {
						...values,
						questions: questionData,
						number: questionData.length,
					},
					cb: res => {
						if (res && res.isCreated) {
							history.push('/admin/quan-ly-de-thi');
							customMess('notification', 'success', res.msg);
						}
					},
				});
			}
		});
	};
	const handlePickTypeQuestion = value => {
		setTypePick(value);
		getQuestionsReq({
			req: {
				limit: 10,
				page: 1,
				keyword,
				type: value,
				level: levelPick,
				tag: subjectValue,
			},
		});
	};
	const handlePickLevelQuestion = value => {
		setLevelPick(value);
		getQuestionsReq({
			req: {
				limit: 10,
				page: 1,
				keyword,
				type: typePick,
				level: value,
				tag: subjectValue,
			},
		});
	};

	const handleSearchQuestion = value => {
		setKeyword(value);
		getQuestionsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
				type: typePick,
				level: levelPick,
				tag: subjectValue,
			},
		});
	};
	const handleReload = () => {
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
				tag: subjectValue,
			},
		});
	};
	const handleChangePage = page => {
		getQuestionsReq({
			req: {
				limit: Number(page.pageSize),
				page: Number(page.current),
				keyword,
				level: levelPick,
				type: typePick,
				tag: subjectValue,
			},
		});
	};
	const handleSelectSubject = value => {
		setSubjectValue(value);
		setKeyword('');
		setLevelPick(0);
		setTypePick(2);
		getQuestionsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				level: 0,
				type: 2,
				tag: value,
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

	return (
		<FormCreateQuestionStyle {...formItemLayout} onSubmit={handleSubmitCreate} className="form-custom">
			<Row gutter={16} className="mt-15">
				<Col xs={24} md={24}>
					<Form.Item label="Tiêu đề" labelAlign="left">
						{getFieldDecorator('title', {
							rules: [
								{
									required: true,
									message: 'Không được để trống tiêu đề',
								},
							],
						})(<Input placeholder="Nhập tiêu đề" />)}
					</Form.Item>
				</Col>
				<Col xs={24} md={24}>
					<Form.Item label="Điểm mỗi câu hỏi" labelAlign="left">
						{getFieldDecorator('point', {
							rules: [
								{
									required: true,
									message: 'Hãy nhập điểm cho mỗi câu hỏi',
								},
							],
						})(<InputNumber placeholder="Nhập điểm" min={0} max={10} style={{ width: '100%' }} />)}
					</Form.Item>
				</Col>
				<Col xs={24} md={24}>
					<Form.Item label="Môn Học" labelAlign="left">
						{getFieldDecorator('subjectID', {
							rules: [
								{
									required: true,
									message: 'Hãy nhập điểm cho mỗi câu hỏi',
								},
							],
						})(
							<Select
								loading={loadingGetSubjects}
								onChange={handleSelectSubject}
								placeholder="-- Môn Học --"
								style={{ width: '100%' }}
							>
								{subjects &&
									subjects.map(ele => (
										<Select.Option value={ele._id} key={ele._id}>
											#{ele.tag}&ensp;-&ensp;{ele.name}
										</Select.Option>
									))}
							</Select>,
						)}
					</Form.Item>
				</Col>
				{/* <Col xs={24} md={24}>
					<Form.Item label="Thời gian làm bài" labelAlign="left">
						{getFieldDecorator('time', {
							rules: [
								{
									required: true,
									message: 'Không được để trống thời gian làm bài',
								},
							],
						})(<Input placeholder="Nhập thời gian làm bài" addonAfter="phút" />)}
					</Form.Item>
				</Col> */}
				{/* <Col xs={24} md={24}>
					<Form.Item label="Số lượng câu hỏi" labelAlign="left">
						{getFieldDecorator('content', {
							initialValue: 25,
							rules: [
								{
									required: true,
									message: 'Vui lòng chọn số lượng câu hỏi',
								},
							],
						})(
							<Select style={{ width: '100%' }}>
								<Select.Option value={25}>25</Select.Option>
								<Select.Option value={40}>40</Select.Option>
								<Select.Option value={60}>60</Select.Option>
								<Select.Option value={120}>120</Select.Option>
							</Select>,
						)}
					</Form.Item>
				</Col> */}
				<Col xs={24} md={24}>
					<div className="title">
						<h4>
							Danh sách câu hỏi &ensp;&ensp;{' '}
							{questionData && questionData.length > 0 ? `( ${questionData.length} câu hỏi được chọn )` : ''}
						</h4>
						<p>(Click chọn câu hỏi muốn cho vào đề thi )</p>
					</div>
					{subjectValue && subjectValue !== '' ? (
						<>
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
											<Select ref={refSelectType} defaultValue={2} onChange={handlePickTypeQuestion}>
												<Select.Option value={2}>Tất cả</Select.Option>
												<Select.Option value={1}>Công khai</Select.Option>
												<Select.Option value={0}>Riêng tư</Select.Option>
											</Select>
										</div>
									</Col>
									<Col xs={12} md={4} className="mt-15">
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
								data={questions && questions.data}
								pagination={questions && questions.pagination}
								rowSelection={rowSelection}
								handleChangePage={handleChangePage}
							/>
						</>
					) : (
						''
					)}
				</Col>
				<Col xs={24} md={24} className="mt-10">
					<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
						<Button icon="plus" loading={loadingCreate} className="btn-submit" htmlType="submit">
							Tạo đề thi
						</Button>
						<Button className="btn-cancel ml-5" onClick={() => history.goBack()}>
							Quay về
						</Button>
					</span>
				</Col>
			</Row>
		</FormCreateQuestionStyle>
	);
}

FormCreateExam.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	loadingCreate: PropTypes.bool.isRequired,
	loadingGetQuestions: PropTypes.bool.isRequired,
	createExamReq: PropTypes.bool.isRequired,
	questions: PropTypes.objectOf(PropTypes.any).isRequired,
	subjects: PropTypes.objectOf(PropTypes.any).isRequired,
	loadingGetSubjects: PropTypes.bool.isRequired,
	getQuestionsReq: PropTypes.func.isRequired,
};

export default Form.create({ name: 'create-exam' })(FormCreateExam);
