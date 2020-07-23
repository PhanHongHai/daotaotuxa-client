import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Steps, Icon, Button, message, Row, Col, Tag } from 'antd';
import _ from 'lodash';

import ScheduleAction from '../Action';
import { trainingType } from '../../../../constands/Other';
import PickSubject from './PickSubject';
import PickExam from './PickExam';
import PickClass from './PickClass';

const { Step } = Steps;

function ModalPickExam(props) {
	const {
		visible,
		setVisible,
		getSectorForScheduleStatus,
		getSubjectBySectorForScheduleStatus,
		getExamForScheduleStatus,
		getClassesForScheduleStatus,
		authForScheduleStatus,
		sectors,
		subjects,
		exams,
		classes,
		getSectorsReq,
		getSubjectBySectorsReq,
		getExamsReq,
		getClassesReq,
		authPasswordReq,
		setDataForm,
	} = props;
	const [current, setCurrent] = useState(0);
	const [subjectData, setSubjectData] = useState({});
	const [examData, setExamData] = useState({});
	const [classData, setClassData] = useState({});
	const [sectorID, setSectorID] = useState([]);
	const [visibleBtnStep2, setVisibleBtnStep2] = useState(false);
	const [classNameValue, setClassNameValue] = useState([]);
	const [selectedClass, setSelectedClass] = useState([]);

	useEffect(() => {
		getSectorsReq();
	}, []);

	const loadingGetSectors = getSectorForScheduleStatus === 'FETCHING';
	const loadingGetSubjects = getSubjectBySectorForScheduleStatus === 'FETCHING';
	const loadingGetExams = getExamForScheduleStatus === 'FETCHING';
	const loadingGetClasses = getClassesForScheduleStatus === 'FETCHING';
	const loadingAuthPassword = authForScheduleStatus === 'FETCHING';

	const next = () => {
		const currentTemp = current + 1;
		setCurrent(currentTemp);
		// switch (current) {
		// 	case 0:
		// 		if (_.isEmpty(classData)) setCheckStep(true);
		// 		else {
		// 			const currentTemp = current + 1;
		// 			setCurrent(currentTemp);
		// 		}
		// 		break;
		// 	case 1:
		// 		if (_.isEmpty(subjectData)) setCheckStep(true);
		// 		else {
		// 			const currentTemp = current + 1;
		// 			setCurrent(currentTemp);
		// 		}
		// 		break;
		// 	case 2:
		// 		if (_.isEmpty(examData)) setCheckStep(true);
		// 		else {
		// 			const currentTemp = current + 1;
		// 			setCurrent(currentTemp);
		// 		}
		// 		break;
		// 	default:
		// 		break;
		// }
	};
	const prev = () => {
		const currentTemp = current - 1;
		switch (current) {
			case 0:
				break;
			case 1:
				setSubjectData({});
				break;
			case 2:
				setExamData({});
				break;
			default:
				break;
		}
		setCurrent(currentTemp);
	};
	const renderNameTypeTraining = value => {
		const result = trainingType.find(ele => ele.key === value);
		if (!result) return 'Không xác định';
		return result.value;
	};
	const renderSectorTraining = value => {
		if (sectors) {
			const result = sectors.find(ele => ele._id === value);
			if (!result) return 'Không xác định';
			return result.name;
		}
		return 'Không xác định';
	};

	const steps = [
		{
			title: 'Chọn môn học',
			icon: 'folder-open',
			content: (
				<PickSubject
					setSubjectData={setSubjectData}
					nextStep={next}
					infoSubject={subjects}
					loadingGetSubject={loadingGetSubjects}
					loadingGetSector={loadingGetSectors}
					sectorData={sectors}
					getSubjectReq={getSubjectBySectorsReq}
					setSectorID={setSectorID}
					getClassesReq={getClassesReq}
					sectorID={sectorID}
				/>
			),
		},
		{
			title: 'Chọn lớp',
			icon: 'project',
			content: (
				<PickClass
					nextStep={next}
					sectorID={sectorID}
					getClassesReq={getClassesReq}
					setClassData={setClassData}
					info={classes}
					loadingGetClasses={loadingGetClasses}
					setVisibleBtnStep2={setVisibleBtnStep2}
					selectedClass={selectedClass}
					setSelectedClass={setSelectedClass}
					setClassNameValue={setClassNameValue}
				/>
			),
		},
		{
			title: 'Chọn đề thi',
			icon: 'reconciliation',
			content: (
				<PickExam
					setExamData={setExamData}
					nextStep={next}
					info={exams}
					loading={loadingGetExams}
					getExamsReq={getExamsReq}
					loadingAuth={loadingAuthPassword}
					authPasswordReq={authPasswordReq}
				/>
			),
		},
		{
			title: 'Xác nhận',
			icon: 'file-done',
			content: (
				<div>
					<Row gutter={16}>
						<Col xs={24} md={12}>
							<h4>Hệ Đào Tạo : &ensp; <Tag>{renderNameTypeTraining(sectorID && sectorID[0])}</Tag> </h4>
						</Col>
						<Col xs={24} md={12}>
							<h4>Ngành Đào Tạo : &ensp; <Tag>{renderSectorTraining(sectorID && sectorID[1])}</Tag> </h4>
						</Col>
						<Col xs={24} md={12}>
							<h4>Mã Môn Học :&ensp;  <Tag>{subjectData && subjectData.tag}</Tag> </h4>
						</Col>
						<Col xs={24} md={12}>
							<h4>Môn Học : &ensp;<Tag>{subjectData && subjectData.name}</Tag>  </h4>
						</Col>
						<Col xs={24} md={12}>
							<h4>Đề Thi : &ensp; <Tag>{examData && examData.title}</Tag> </h4>
						</Col>
						<Col xs={24} md={24}>
							<h4>Danh Sách Lớp :</h4>
							<ul>
								{classNameValue.map(ele => (
									<li> {ele.name} </li>
								))}
							</ul>
						</Col>
					</Row>
				</div>
			),
		},
	];

	const handleFinish = () => {
		if (_.isEmpty(subjectData) || _.isEmpty(examData) || _.isEmpty(classData))
			message.error('Thông tin lựa chọn không hợp lệ');
		else {
			setDataForm({
				subjectID: subjectData && subjectData._id,
				examID: examData && examData._id,
				classes: classData,
				trainingSectorID: sectorID[1],
			});
			setVisible(false);
		}
	};

	return (
		<Modal
			className="phh-modal"
			footer={null}
			width="900px"
			title="Các bước lựa chọn"
			visible={visible}
			onCancel={() => setVisible(false)}
		>
			<Steps current={current}>
				{steps.map(item => (
					<Step key={item.title} title={item.title} icon={<Icon type={item.icon} />} />
				))}
			</Steps>
			<div className="steps-content mt-15 mb-15">{steps[current].content}</div>
			<div className="steps-action" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
				{current > 0 && (
					<Button className="btn-cancel mr-5" style={{ marginLeft: 8 }} onClick={prev}>
						Quay lại
					</Button>
				)}
				{current === 1 && visibleBtnStep2 ? (
					<Button className="btn-cancel" onClick={next}>
						Tiếp theo
					</Button>
				) : (
					''
				)}
				{current === steps.length - 1 && (
					<Button className="btn-cancel" onClick={handleFinish}>
						Xác nhận
					</Button>
				)}
			</div>
		</Modal>
	);
}

ModalPickExam.propTypes = {
	visible: PropTypes.bool.isRequired,
	getSectorForScheduleStatus: PropTypes.string.isRequired,
	getSubjectBySectorForScheduleStatus: PropTypes.string.isRequired,
	getExamForScheduleStatus: PropTypes.string.isRequired,
	getClassesForScheduleStatus: PropTypes.string.isRequired,
	authForScheduleStatus: PropTypes.string.isRequired,
	setVisible: PropTypes.func.isRequired,
	sectors: PropTypes.instanceOf(Array).isRequired,
	subjects: PropTypes.objectOf(PropTypes.any).isRequired,
	exams: PropTypes.objectOf(PropTypes.any).isRequired,
	classes: PropTypes.objectOf(PropTypes.any).isRequired,
	getSectorsReq: PropTypes.func.isRequired,
	getSubjectBySectorsReq: PropTypes.func.isRequired,
	getExamsReq: PropTypes.func.isRequired,
	getClassesReq: PropTypes.func.isRequired,
	authPasswordReq: PropTypes.func.isRequired,
	setDataForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	getSectorForScheduleStatus: state.schedulePage.getSectorForScheduleStatus,
	getSubjectBySectorForScheduleStatus: state.schedulePage.getSubjectBySectorForScheduleStatus,
	getExamForScheduleStatus: state.schedulePage.getExamForScheduleStatus,
	getClassesForScheduleStatus: state.schedulePage.getClassesForScheduleStatus,
	authForScheduleStatus: state.schedulePage.authForScheduleStatus,
	sectors: state.schedulePage.sectors,
	subjects: state.schedulePage.subjects,
	exams: state.schedulePage.exams,
	classes: state.schedulePage.classes,
});

const mapDispatchToProps = {
	getSectorsReq: ScheduleAction.getSectorForScheduleRequest,
	getSubjectBySectorsReq: ScheduleAction.getSubjectBySectorForScheduleRequest,
	getExamsReq: ScheduleAction.getExamForScheduleRequest,
	getClassesReq: ScheduleAction.getClassesForScheduleRequest,
	authPasswordReq: ScheduleAction.authPasswordScheduleRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPickExam);
