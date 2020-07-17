import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Select, Col, Card, Avatar, Icon, Breadcrumb, Typography, Menu, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { ListDocumentStyle, ButtonListStyle } from '../styled';
import ClassAction from '../Action';
import IconPdf from '../../../../assets/images/pdf.png';
import FrameViewLesson from '../Component/FrameViewLesson';
import InfoSubject from '../Component/InfoSubject';
import ListSubjectItem from '../Component/ListSubjectItem';

const { Option } = Select;
const { Title } = Typography;

function DetailSubject(props) {
	const {
		getInfoSubjectStatus,
		getSubjectsOtherStatus,
		getDocumentsByTypeStatus,
		getDetaiSubjectProgressStatus,
		createSubjectProgressStatus,
		infoSubject,
		documents,
		subjectOther,
		detailSubjectProgress,
		getInfoSubjectReq,
		getSubjectsOtherReq,
		getDocumentsByTypeReq,
		getDetailSubjectProgressReq,
		createSubjectProgressReq,
	} = props;
	const { classID, subjectID } = useParams();

	useEffect(() => {
		getInfoSubjectReq({
			ID: subjectID,
		});
		getSubjectsOtherReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				classID,
				subjectID,
			},
		});

		getDetailSubjectProgressReq({
			req: {
				subjectID,
			},
		});
		getDocumentsByTypeReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				type: 'lesson',
				subjectID,
			},
		});
	}, [subjectID, classID, getInfoSubjectReq, getDetailSubjectProgressReq]);
	const [lessonCurrent, setLessonCurrent] = useState({});
	const [isShowSubject, setisShowSubject] = useState(false);
	//	const [urlLesson, setUrlLesson] = useState(null);
	//	const [collapsed, setCollapsed] = useState(false);
	const loadingGetInfoSubject = getInfoSubjectStatus === 'FETCHING';
	const loadingGetSubjectsOther = getSubjectsOtherStatus === 'FETCHING';
	const loadingGetDocumentByType = getDocumentsByTypeStatus === 'FETCHING';
	const loadingGetDetailProgress = getDetaiSubjectProgressStatus === 'FETCHING';
	const loadingCreateProgress = createSubjectProgressStatus === 'FETCHING';

	const handleSelectType = value => {
		getDocumentsByTypeReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				type: value,
				subjectID,
			},
		});
	};

	const renderListDocument = (dataSubject, progressList) => {
		if (dataSubject.length > 0) {
			if (!_.isEmpty(progressList))
				return dataSubject.map(ele => {
					const lessonExist = progressList.documents.find(doc => doc._id === ele._id);
					if (lessonExist)
						return (
							<Menu.Item
								onClick={() => {
									setLessonCurrent(ele);
									setisShowSubject(false);
								}}
							>
								<Avatar shape="square" size="small" src={IconPdf} />
								&ensp;
								{ele.title}
								&ensp;
								<Tooltip title="Đã được cập nhật tiến độ">
									<Icon style={{ float: 'right', paddingTop: '1em' }} type="check-circle" />
								</Tooltip>
							</Menu.Item>
						);
					return (
						<Menu.Item
							onClick={() => {
								setLessonCurrent(ele);
								setisShowSubject(false);
							}}
						>
							<Avatar shape="square" size="small" src={IconPdf} />
							&ensp;
							{ele.title}
						</Menu.Item>
					);
				});
			return dataSubject.map(ele => (
				<Menu.Item
					onClick={() => {
						setLessonCurrent(ele);
						setisShowSubject(false);
					}}
				>
					<Avatar shape="square" size="small" src={IconPdf} />
					&ensp;
					{ele.title}
				</Menu.Item>
			));
		}
		return (
			<li className="pd-1">
				<div style={{ textAlign: 'center' }}>
					<Icon type="frown" style={{ fontSize: 30, marginBottom: '20px' }} />
					<h1 style={{ color: 'silver' }}>Không có dữ liệu</h1>
				</div>
			</li>
		);
	};
	return (
		<div className="container-fluid mb-15 mt-15">
			<Row gutter={8}>
				<Col xs={24} md={24} className="mb-5">
					<Title level={3}>Chi Tiết Môn Học</Title>
					<Breadcrumb>
						<Breadcrumb.Item>
							<a href="/student/dashboard">Dashboard</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a href={`/student/dashboard/lop-hoc/${classID}`}>Lớp học</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>Chi tiết môn học</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
				<Col xs={24} md={8} className="mb-5">
					<Row>
						<Col span={24} className="mb-5">
							<InfoSubject
								loading={loadingGetInfoSubject}
								info={infoSubject}
								progress={detailSubjectProgress}
								loadingGetProgress={loadingGetDetailProgress}
							/>
						</Col>
						<Col span={24} className="mb-5">
							<Card className="phh-card-v2 card-no-pd">
								<ButtonListStyle onClick={() => setisShowSubject(!isShowSubject)}>
									{isShowSubject ? 'Đóng danh sách môn học' : 'Danh sách môn học'}
								</ButtonListStyle>
							</Card>
						</Col>
						<Col span={24}>
							<ListDocumentStyle>
								<Card className="phh-card-v2 card-no-pd mb-15">
									<div className="select-type">
										<Select defaultValue="lesson" onChange={handleSelectType}>
											<Option key="lesson" value="lesson">
												<Icon type="read" />
												&ensp;Bài Học
											</Option>
											<Option key="homework" value="homework">
												<Icon type="form" />
												&ensp;Bài Tập
											</Option>
											<Option key="document" value="document">
												<Icon type="file" />
												&ensp;Đề Cương
											</Option>
										</Select>
									</div>
								</Card>
								<div className="list-file-item">
									<h3>Mục lục</h3>
									<Card className="phh-card-v2 mt-5" loading={loadingGetDocumentByType}>
										<Menu mode="inline">{documents && renderListDocument(documents.data, detailSubjectProgress)}</Menu>
									</Card>
								</div>
							</ListDocumentStyle>
						</Col>
					</Row>
				</Col>
				<Col xs={24} md={16}>
					{isShowSubject ? (
						<ListSubjectItem
							loading={loadingGetSubjectsOther}
							classID={classID}
							data={subjectOther && subjectOther.data}
							pagination={subjectOther && subjectOther.pagination}
						/>
					) : (
						<Card className="phh-card-v2 card-no-pd">
							<FrameViewLesson
								lesson={lessonCurrent}
								loadingCreateProgress={loadingCreateProgress}
								createSubjectProgressReq={createSubjectProgressReq}
								detailProgress={detailSubjectProgress}
								infoSubject={infoSubject}
							/>
						</Card>
					)}
				</Col>
			</Row>
		</div>
	);
}

DetailSubject.propTypes = {
	getInfoSubjectStatus: PropTypes.string.isRequired,
	getSubjectsOtherStatus: PropTypes.string.isRequired,
	getDocumentsByTypeStatus: PropTypes.string.isRequired,
	getDetaiSubjectProgressStatus: PropTypes.string.isRequired,
	createSubjectProgressStatus: PropTypes.string.isRequired,
	infoSubject: PropTypes.objectOf(PropTypes.any).isRequired,
	documents: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectOther: PropTypes.objectOf(PropTypes.any).isRequired,
	detailSubjectProgress: PropTypes.objectOf(PropTypes.any).isRequired,
	getInfoSubjectReq: PropTypes.func.isRequired,
	getSubjectsOtherReq: PropTypes.func.isRequired,
	getDocumentsByTypeReq: PropTypes.func.isRequired,
	getDetailSubjectProgressReq: PropTypes.func.isRequired,
	createSubjectProgressReq: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	getInfoSubjectStatus: state.classOfStudentPage.getInfoSubjectByID,
	getSubjectsOtherStatus: state.classOfStudentPage.getSubjectsOtherByStudentStatus,
	getDocumentsByTypeStatus: state.classOfStudentPage.getDocumentsByTypeStatus,
	getDetaiSubjectProgressStatus: state.classOfStudentPage.getDetaiSubjectProgressStatus,
	createSubjectProgressStatus: state.classOfStudentPage.createSubjectProgressStatus,
	infoSubject: state.classOfStudentPage.infoSubject,
	subjectOther: state.classOfStudentPage.subjectOther,
	detailDocument: state.classOfStudentPage.detailDocument,
	documents: state.classOfStudentPage.documents,
	detailSubjectProgress: state.classOfStudentPage.detailSubjectProgress,
});

const mapDispatchToProps = {
	getInfoSubjectReq: ClassAction.getInfoSubjectByIDRequest,
	getSubjectsOtherReq: ClassAction.getSubjectsOtherByStudentRequest,
	getDocumentsByTypeReq: ClassAction.getDocumentsByTypeRequest,
	getDetailSubjectProgressReq: ClassAction.getDetailSubjectProgressRequest,
	createSubjectProgressReq: ClassAction.createSubjectProgressRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSubject);
