import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Modal, Steps, Button, Row, Col, Tag, List, Select, Form } from 'antd';
import { useHistory } from 'react-router-dom';

import StepSubject from './StepSubject';

const { Step } = Steps;
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

function ModalQuickTest(props) {
	const {
		visible,
		setVisible,
		subjectList,
		loading,
		loadingGetProgressByStudent,
		progressOfStudent,
		sectorID,
		classID,
		getSubjectsReq,
	} = props;
	const [current, setCurrent] = useState(0);
	const [subjectData, setSubjectData] = useState({});
	const [visibleStepCustom, setVisibleStepCustom] = useState(false);
	const [level, setLevel] = useState(1);

	const history = useHistory();

	const next = () => {
		const currentStep = current + 1;
		setCurrent(currentStep);
	};

	const prev = () => {
		const currentStep = current - 1;
		setCurrent(currentStep);
		if (currentStep === 0) {
			setVisibleStepCustom(false);
			setSubjectData({});
		}
	};
	const renderContentTest = levelValue => {
		switch (levelValue) {
			case 1:
				return [
					{
						text: 'Câu Hỏi Dễ',
						value: 80,
						color: 'green',
					},
					{
						text: 'Câu Hỏi Trung Bình',
						value: 20,
						color: 'geekblue',
					},
					{
						text: 'Câu Hỏi Khó',
						value: 0,
						color: 'orange',
					},
					{
						text: 'Câu Hỏi Rất khó',
						value: 0,
						color: 'red',
					},
				];
			case 2:
				return [
					{
						text: 'Câu Hỏi Dễ',
						value: 50,
						color: 'green',
					},
					{
						text: 'Câu Hỏi Trung Bình',
						value: 50,
						color: 'geekblue',
					},
					{
						text: 'Câu Hỏi Khó',
						value: 0,
						color: 'orange',
					},
					{
						text: 'Câu Hỏi Rất khó',
						value: 0,
						color: 'red',
					},
				];
			case 3:
				return [
					{
						text: 'Câu Hỏi Dễ',
						value: 10,
						color: 'green',
					},
					{
						text: 'Câu Hỏi Trung Bình',
						value: 20,
						color: 'geekblue',
					},
					{
						text: 'Câu Hỏi Khó',
						value: 60,
						color: 'orange',
					},
					{
						text: 'Câu Hỏi Rất khó',
						value: 10,
						color: 'red',
					},
				];
			default:
				return [
					{
						text: 'Câu Hỏi Dễ',
						value: 0,
						color: 'green',
					},
					{
						text: 'Câu Hỏi Trung Bình',
						value: 0,
						color: 'geekblue',
					},
					{
						text: 'Câu Hỏi Khó',
						value: 40,
						color: 'orange',
					},
					{
						text: 'Câu Hỏi Rất khó',
						value: 60,
						color: 'red',
					},
				];
		}
	};
	const renderLevelText = levelValue => {
		switch (levelValue) {
			case 1:
				return 'Dễ';
			case 2:
				return 'Trung Bình';
			case 3:
				return 'Khó';
			default:
				return 'Rất Khó';
		}
	};
	const renderDataChart = levelValue => {
		switch (levelValue) {
			case 1:
				return [80, 20, 0, 0];
			case 2:
				return [50, 50, 0, 0];
			case 3:
				return [10, 20, 60, 10];
			default:
				return [0, 0, 40, 60];
		}
	};

	const steps = [
		{
			title: 'Môn Học',
			content: (
				<StepSubject
					subjectList={subjectList}
					loading={loading}
					loadingGetProgressByStudent={loadingGetProgressByStudent}
					progressOfStudent={progressOfStudent}
					sectorID={sectorID}
					classID={classID}
					getReq={getSubjectsReq}
					setVisibleStepCustom={setVisibleStepCustom}
					setSubjectData={setSubjectData}
					next={next}
				/>
			),
		},
		{
			title: 'Mức độ',
			content: (
				<div>
					<Form className="form-custom" {...formItemLayout}>
						<Form.Item label="Mức độ đề thi" labelAlign="left">
							<Select
								defaultValue={level}
								onChange={value => {
									setLevel(value);
								}}
								placeholder="-- Mức độ --"
							>
								<Select.Option value={1}>Dễ</Select.Option>
								<Select.Option value={2}>Trung bình</Select.Option>
								<Select.Option value={3}>Khó</Select.Option>
								<Select.Option value={4}>Rất Khó</Select.Option>
							</Select>
						</Form.Item>
					</Form>
				</div>
			),
		},
		{
			title: 'Xác nhận',
			content: (
				<div>
					<Row gutter={16}>
						<Col xs={24} md={12}>
							<h3>Thông tin bài thi</h3>
							<Row>
								<Col xs={24} md={24} className="mt-15">
									<h4>
										Mã Môn Học :&ensp; <Tag>{subjectData.subjectID && subjectData.subjectID.tag}</Tag>
									</h4>
								</Col>
								<Col xs={24} md={24} className="mt-15">
									<h4>
										Môn Học : &ensp;<Tag>{subjectData.subjectID && subjectData.subjectID.name}</Tag>
									</h4>
								</Col>
								<Col xs={24} md={24} className="mt-15">
									<h4>
										Mức độ đề thi : &ensp;<Tag>{renderLevelText(level)}</Tag>
									</h4>
								</Col>
								<Col xs={24} md={24} className="mt-15">
									<h4>
										Thời gian làm bài : &ensp;<Tag>45 phút</Tag>
									</h4>
								</Col>
								<Col xs={24} md={24} className="mt-15">
									<h4>
										Số lượng câu hỏi : &ensp;<Tag>40 câu</Tag>
									</h4>
								</Col>
							</Row>
						</Col>
						<Col xs={24} md={12}>
							<div className="mb-10 " style={{ height: '210px' }}>
								<h3>Thông tin câu hỏi</h3>
								<Pie
									data={{
										labels: ['Dễ', 'Trung bình', 'Khó', 'Rất khó'],
										datasets: [
											{
												data: renderDataChart(level),
												backgroundColor: ['#52c41a', '#2f54eb', '#fa8c16', '#f5222d'],
												hoverBackgroundColor: ['#b7eb8f', '#adc6ff', '#ffd591', '#ffa39e'],
											},
										],
									}}
									legend={{
										display: true,
										position: 'left',
										fullWidth: true,
									}}
								/>
							</div>
							<List
								size="small"
								bordered
								dataSource={renderContentTest(level)}
								renderItem={item => (
									<List.Item>
										<Tag color={item.color}>{item.text} </Tag>&ensp; : &ensp;{item.value}%
									</List.Item>
								)}
							/>
						</Col>
					</Row>
				</div>
			),
		},
	];
	return (
		<Modal
			title="Thi thử"
			footer={null}
			className="phh-modal"
			width="750px"
			visible={visible}
			onCancel={() => setVisible(false)}
		>
			<Steps className="step-quick-test" current={current}>
				{steps.map(item => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>
			<div className="steps-content mt-20">{steps[current].content}</div>
			<div className="steps-action mt-15" style={{ display: 'flex', justifyContent: 'flex-end' }}>
				{current > 0 && (
					<Button className="btn-cancel" style={{ marginLeft: 8 }} onClick={() => prev()}>
						Quay về
					</Button>
				)}
				{current === 1 && visibleStepCustom ? (
					<Button className="btn-cancel ml-5" onClick={() => next()}>
						Tiếp theo
					</Button>
				) : (
					''
				)}
				{current === steps.length - 1 && (
					<Button className="btn-cancel ml-5" onClick={() => history.push('/quiz/1')}>
						Bắt đầu
					</Button>
				)}
			</div>
		</Modal>
	);
}

ModalQuickTest.propTypes = {
	sectorID: PropTypes.string.isRequired,
	classID: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getSubjectsReq: PropTypes.func.isRequired,
	subjectList: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingGetProgressByStudent: PropTypes.bool.isRequired,
	progressOfStudent: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalQuickTest;
