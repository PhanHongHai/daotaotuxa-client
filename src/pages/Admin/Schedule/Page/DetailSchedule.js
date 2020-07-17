import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Card, Spin, Button } from 'antd';
import { useParams } from 'react-router-dom';

import ScheduleAction from '../Action';
import BreadCrumb from '../../../../components/BreadCrumb';
import LoadingCustom from '../../../../components/LoadingCustom';
import FormUpdateSchedule from '../Component/FormUpdateSchedule';
import DetailExam from '../Component/DetailExam';
import TableClasses from '../Component/TableClasses';
import ModalAuth from '../../../../components/ModalAuth';
import ModalClass from '../Component/ModalClass';
import ModalExam from '../Component/ModalExam';

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
	{
		icon: 'calendar',
		path: '/admin/lich-thi',
		text: 'Quản lý lịch thi',
	},
];

const tabList = [
	{
		key: 'basic',
		tab: 'Thông tin cơ bản',
	},
	{
		key: 'class',
		tab: 'Danh sách lớp',
	},
	{
		key: 'exam',
		tab: 'Đề thi',
	},
];

function DetailSchedule(props) {
	const {
		getDetailScheduleReq,
		updateScheduleReq,
		removeDetailScheduleReq,
		authPassReq,
		getDetailExamReq,
		getSubjectsReq,
		getClassesReq,
		getExamsReq,
		getDetailScheduleStatus,
		getDetailExamForScheduleStatus,
		getSubjectBySectorForScheduleStatus,
		authForScheduleStatus,
		updateScheduleStatus,
		removeDetailScheduleStatus,
		getClassesForScheduleStatus,
		getExamForScheduleStatus,
		detailSchedule,
		detailExam,
		subjects,
		classes,
		exams,
	} = props;

	const { ID } = useParams();
	const [isShowAnswer, setIsShowAnswer] = useState(false);
	const [visibleAuth, setVisibleAuth] = useState(false);
	const [visibleModalClass, setVisibleModalClass] = useState(false);
	const [visibleModalExam, setVisibleModalExam] = useState(false);
	const [tabKey, setTabKey] = useState('basic');
	useEffect(() => {
		getDetailScheduleReq({
			ID,
		});
	}, [ID]);

	const loadingGetDetail = getDetailScheduleStatus === 'FETCHING';
	const loadingUpdate = updateScheduleStatus === 'FETCHING';
	const loadingRemove = removeDetailScheduleStatus === 'FETCHING';
	const loadingGetDetailExam = getDetailExamForScheduleStatus === 'FETCHING';
	const loadingAuth = authForScheduleStatus === 'FETCHING';
	const loadingGetClasses = getClassesForScheduleStatus === 'FETCHING';
	const loadingGetExams = getExamForScheduleStatus === 'FETCHING';
	const loadingGetSubjectsBySector = getSubjectBySectorForScheduleStatus === 'FETCHING';

	const contentList = {
		basic: (
			<Spin spinning={loadingGetDetail} indicator={<LoadingCustom margin={10} />}>
				<Card className="phh-card">
					<FormUpdateSchedule
						info={detailSchedule}
						updateReq={updateScheduleReq}
						getSubjectsReq={getSubjectsReq}
						loadingUpdate={loadingUpdate}
						removeReq={removeDetailScheduleReq}
						loadingRemove={loadingRemove}
						loadingGetSubject={loadingGetSubjectsBySector}
						subjectAll={subjects}
					/>
				</Card>
			</Spin>
		),
		class: (
			<Spin spinning={loadingGetDetail} indicator={<LoadingCustom margin={10} />}>
				<Card
					title="Thao tác"
					className="phh-card card-body-transparent card-no-pd"
					extra={
						<span className="group-btn">
							<Button
								onClick={() => {
									getClassesReq({
										req: {
											page: 1,
											limit: 10,
											keyword: '',
											sectorID: detailSchedule.trainingSectorID && detailSchedule.trainingSectorID._id,
										},
									});
									setVisibleModalClass(true);
								}}
							>
								Cập nhật
							</Button>
						</span>
					}
				/>
				<Card className="phh-card mt-10">
					<TableClasses data={detailSchedule && detailSchedule.classes} />
				</Card>
			</Spin>
		),
		exam: (
			<Spin spinning={loadingGetDetailExam} indicator={<LoadingCustom margin={10} />}>
				<Card
					title="Thao tác"
					className="phh-card card-body-transparent card-no-pd"
					extra={
						<span className="group-btn">
							{isShowAnswer ? (
								<Button onClick={() => setIsShowAnswer(false)} className="">
									Ẩn đáp án
								</Button>
							) : (
								<Button onClick={() => setVisibleAuth(true)} className="">
									Hiển thị đáp án
								</Button>
							)}
							<Button
								className="ml-5"
								onClick={() => {
									getExamsReq({
										req: {
											page: 1,
											limit: 10,
											keyword: '',
										},
									});
									setVisibleModalExam(true);
								}}
							>
								Cập nhật
							</Button>
						</span>
					}
				/>
				<DetailExam isShowAnswer={isShowAnswer} detailExam={detailExam} />
			</Spin>
		),
	};
	const handleChangeTab = key => {
		setTabKey(key);
		if (key === 'exam') {
			getDetailExamReq({
				ID: detailSchedule && detailSchedule.examID,
			});
		}
	};
	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} pageCurrentText="Chi tiết lịch thi" icon="calendar" visible={false} />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Card
					className="phh-card card-body-transparent mt-15 tab-custom"
					tabList={tabList}
					activeTabKey={tabKey}
					onTabChange={key => handleChangeTab(key)}
				/>
				<div className="mt-10">{contentList[tabKey]}</div>
			</div>
			<ModalAuth
				setVisible={setVisibleAuth}
				visible={visibleAuth}
				loading={loadingAuth}
				authPasswordReq={authPassReq}
				setCheck={setIsShowAnswer}
			/>
			<ModalClass
				visible={visibleModalClass}
				setVisible={setVisibleModalClass}
				classes={classes}
				loading={loadingGetClasses}
				loadingUpdate={loadingUpdate}
				classCurrent={detailSchedule && detailSchedule.classes}
				getClassesReq={getClassesReq}
				updateScheduleReq={updateScheduleReq}
				scheduleID={detailSchedule && detailSchedule._id}
				sectorID={detailSchedule.trainingSectorID && detailSchedule.trainingSectorID._id}
			/>
			<ModalExam
				visible={visibleModalExam}
				setVisible={setVisibleModalExam}
				getExamsReq={getExamsReq}
				authPasswordReq={authPassReq}
				exams={exams}
				loading={loadingGetExams}
				loadingAuth={loadingAuth}
				examCurrent={detailExam}
				scheduleID={detailSchedule && detailSchedule._id}
				loadingUpdate={loadingUpdate}
				updateScheduleReq={updateScheduleReq}
			/>
		</div>
	);
}

DetailSchedule.propTypes = {
	getDetailScheduleReq: PropTypes.func.isRequired,
	removeDetailScheduleReq: PropTypes.func.isRequired,
	updateScheduleReq: PropTypes.func.isRequired,
	authPassReq: PropTypes.func.isRequired,
	getDetailExamReq: PropTypes.func.isRequired,
	getSubjectsReq: PropTypes.func.isRequired,
	getClassesReq: PropTypes.func.isRequired,
	getExamsReq: PropTypes.func.isRequired,
	getDetailExamForScheduleStatus: PropTypes.string.isRequired,
	getSubjectBySectorForScheduleStatus: PropTypes.string.isRequired,
	authForScheduleStatus: PropTypes.string.isRequired,
	getDetailScheduleStatus: PropTypes.string.isRequired,
	getClassesForScheduleStatus: PropTypes.string.isRequired,
	updateScheduleStatus: PropTypes.string.isRequired,
	removeDetailScheduleStatus: PropTypes.string.isRequired,
	getExamForScheduleStatus: PropTypes.string.isRequired,
	detailSchedule: PropTypes.objectOf(PropTypes.any).isRequired,
	detailExam: PropTypes.objectOf(PropTypes.any).isRequired,
	subjects: PropTypes.objectOf(PropTypes.any).isRequired,
	classes: PropTypes.objectOf(PropTypes.any).isRequired,
	exams: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
	getDetailScheduleStatus: state.schedulePage.getDetailScheduleStatus,
	updateScheduleStatus: state.schedulePage.updateScheduleStatus,
	removeDetailScheduleStatus: state.schedulePage.removeDetailScheduleStatus,
	authForScheduleStatus: state.schedulePage.authForScheduleStatus,
	getDetailExamForScheduleStatus: state.schedulePage.getDetailExamForScheduleStatus,
	getClassesForScheduleStatus: state.schedulePage.getClassesForScheduleStatus,
	getExamForScheduleStatus: state.schedulePage.getExamForScheduleStatus,
	getSubjectBySectorForScheduleStatus: state.schedulePage.getSubjectBySectorForScheduleStatus,
	detailSchedule: state.schedulePage.detailSchedule,
	detailExam: state.schedulePage.detailExam,
	subjects: state.schedulePage.subjects,
	classes: state.schedulePage.classes,
	exams: state.schedulePage.exams,
});

const mapDispatchToProps = {
	getDetailScheduleReq: ScheduleAction.getDetailScheduleRequest,
	updateScheduleReq: ScheduleAction.updateScheduleRequest,
	removeDetailScheduleReq: ScheduleAction.removeDetailScheduleRequest,
	getDetailExamReq: ScheduleAction.getDetailExamForScheduleRequest,
	authPassReq: ScheduleAction.authPasswordScheduleRequest,
	getSubjectsReq: ScheduleAction.getSubjectBySectorForScheduleRequest,
	getClassesReq: ScheduleAction.getClassesForScheduleRequest,
	getExamsReq: ScheduleAction.getExamForScheduleRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSchedule);
