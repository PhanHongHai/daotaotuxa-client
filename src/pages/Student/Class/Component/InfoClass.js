import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tag, Icon, Card, Spin, Divider } from 'antd';
import moment from 'moment';
import _ from 'lodash';

// import TeacherIcon from '../../../../assets/images/teacherIcon.svg';
import { trainingType } from '../../../../constands/Other';
import InfoTeacher from './InfoTeacher';
import LoadingCustom from '../../../../components/LoadingCustom';
import FeatureBox from './FeatureBox';
import { InfoClassStyle } from '../styled';

const renderTypeClass = value => {
	if (value) return trainingType.find(ele => ele.key === value).value;
	return '';
};
const renderStatusClass = value => {
	switch (value) {
		case 'OP':
			return <Tag color="#1bb394">Chờ Khai giảng</Tag>;
		case 'HP':
			return <Tag color="blue">Đang diễn ra</Tag>;
		default:
			return <Tag color="gray">Kết thúc</Tag>;
	}
};

function InfoClass(props) {
	const {
		info: { countStudent, infoTeacher, infoClass },
		loading,
		getSubjectsOfClassReq,
		openStudentList,
		openSubjectList,
		openQuickTest,
		openPoint,
		openSchedule,
		openHistory,
		getScheduleReq,
	} = props;

	return (
		<div>
			<Row gutter={16}>
				<Col xs={24} md={8} className="mb-10">
					<Card className="phh-card-v2" title="Giảng viên">
						<Spin spinning={loading} indicator={<LoadingCustom margin={10} />}>
							<InfoTeacher info={infoTeacher && infoTeacher.accountID} />
						</Spin>
					</Card>
				</Col>
				<Col xs={24} md={16}>
					<Card className="phh-card-v2 mb-15" title="Thông tin lớp học">
						<Spin spinning={loading} indicator={<LoadingCustom margin={10} />}>
							<InfoClassStyle>
								<ul>
									<Row gutter={16}>
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="appstore" theme="filled" />
												</div>
												<p>
													Mã Lớp Học :&ensp; <Tag>{infoClass && infoClass.name}</Tag>
												</p>
											</li>
										</Col>
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="appstore" theme="filled" />
												</div>
												<p>
													Hệ:&ensp; <Tag> {renderTypeClass(infoClass && infoClass.trainingSectorID.type)}</Tag>
												</p>
											</li>
										</Col>
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="appstore" theme="filled" />
												</div>
												<p>
													Ngành Đào Tạo :&ensp; <Tag> {infoClass && infoClass.trainingSectorID.name}</Tag>
												</p>
											</li>
										</Col>
										<Divider />
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="calendar" theme="filled" />
												</div>
												<p>
													Ngày Khai Giảng :&ensp;
													{!_.isEmpty(infoClass)
														? `${moment(infoClass && infoClass.startAt).format('DD-MM-YYYY')}`
														: ''}
												</p>
											</li>
										</Col>
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="calendar" theme="filled" />
												</div>
												<p>
													Ngày Kết Thúc :&ensp;
													{!_.isEmpty(infoClass) ? `${moment(infoClass && infoClass.endAt).format('DD-MM-YYYY')}` : ''}
												</p>
											</li>
										</Col>
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="idcard" theme="filled" />
												</div>
												<p>Tổng học viên :&ensp; {countStudent}</p>
											</li>
										</Col>
										<Col xs={24} md={12} className="">
											<li>
												<div>
													<Icon type="thunderbolt" theme="filled" />
												</div>
												<p>Trạng Thái :&ensp; {renderStatusClass(infoClass && infoClass.status)}</p>
											</li>
										</Col>
									</Row>
								</ul>
							</InfoClassStyle>
						</Spin>
					</Card>
					<Row gutter={16} className="mt-10">
						<Col xs={24} md={8} className="mb-15">
							<FeatureBox icon="profile" title="Danh Sách Học Viên" onSelect={() => openStudentList(true)} />
						</Col>
						<Col xs={24} md={8} className="mb-15">
							<FeatureBox icon="project" title="Bảng Điểm" onSelect={() => openPoint(true)} />
						</Col>
						<Col xs={24} md={8} className="mb-15">
							<FeatureBox
								icon="read"
								title="Danh Sách Môn Học"
								onSelect={() => {
									getSubjectsOfClassReq({
										req: {
											limit: 10,
											page: 1,
											keyword: '',
											sectorID: infoClass && infoClass.trainingSectorID._id,
											classID: infoClass && infoClass._id,
										},
									});
									openSubjectList(true);
								}}
							/>
						</Col>
						<Col xs={24} md={8} className="mb-15">
							<FeatureBox
								icon="schedule"
								title="Lịch Thi"
								onSelect={() => {
									getScheduleReq({
										req: {
											page: 1,
											limit: 10,
											keyword: '',
											classID: infoClass && infoClass._id,
										},
									});
									openSchedule(true);
								}}
							/>
						</Col>
						<Col xs={24} md={8} className="mb-15">
							<FeatureBox
								icon="carry-out"
								title="Thi Thử"
								onSelect={() => {
									getSubjectsOfClassReq({
										req: {
											limit: 10,
											page: 1,
											keyword: '',
											sectorID: infoClass && infoClass.trainingSectorID._id,
											classID: infoClass && infoClass._id,
										},
									});
									openQuickTest(true);
								}}
							/>
						</Col>
						<Col xs={24} md={8} className="mb-15">
							<FeatureBox
								icon="carry-out"
								title="Điểm Thi"
								onSelect={() => {
									openHistory(true);
								}}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
}

InfoClass.propTypes = {
	info: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	getSubjectsOfClassReq: PropTypes.func.isRequired,
	openStudentList: PropTypes.func.isRequired,
	openSubjectList: PropTypes.func.isRequired,
	openQuickTest: PropTypes.func.isRequired,
	openPoint: PropTypes.func.isRequired,
	openSchedule: PropTypes.func.isRequired,
	openHistory: PropTypes.func.isRequired,
	getScheduleReq: PropTypes.func.isRequired,
};

export default InfoClass;
