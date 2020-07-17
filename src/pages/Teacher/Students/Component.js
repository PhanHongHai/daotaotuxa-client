import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Col, Row, Avatar, Radio, Card } from 'antd';

import BreadCrumb from '../../../components/BreadCrumb';
import { HOST_SERVER } from '../../../constands/Other';

import InfoStudentComponent from './Component/InfoStudent';
import ProfileStudent from './Component/ProfileStudent';
import TableProgressSubject from './Component/TableProgressSubject';

import { InfoStudentStyle } from './styled';
import IconStudent from '../../../assets/images/white.svg';

function DetailStudentComponent(props) {
	const {
		getInfoStudentStatus,
		getProfileStudentStatus,
		getSubjectProgressStudentStatus,
		getInfoStudentReq,
		getProfileStudentReq,
		getSubjectProgressStudentReq,
		infoStudent,
		profileStudent,
		subjectProgressOfStudent,
	} = props;

	const [optionInfo, setOptionInfo] = useState('info');
	//	const history = useHistory();
	const { classID, studentID } = useParams();

	useEffect(() => {
		getInfoStudentReq({
			studentID,
		});
		getProfileStudentReq({
			studentID,
		});
		getSubjectProgressStudentReq({
			studentID,
		});
	}, [getSubjectProgressStudentReq, getInfoStudentReq, getProfileStudentReq, studentID]);

	const loadingGetInfoStudent = getInfoStudentStatus === 'FETCHING';
	const loadingGetProfileStudent = getProfileStudentStatus === 'FETCHING';
	const loadingGetSubjectProgressStudent = getSubjectProgressStudentStatus === 'FETCHING';

	const breadcrumb = [
		{
			icon: 'home',
			path: '/teacher/dashboard',
			text: '',
		},
		{
			icon: 'project',
			path: `/teacher/dashboard/lop-hoc/${classID}`,
			text: 'Lớp',
		},
	];

	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="none" visible={false} pageCurrentText="Chi Tiết Học Viên" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row gutter={16}>
					<Col xs={24} md={10}>
						<InfoStudentStyle>
							<div id="info-header">
								<div id="icon">
									<div id="btn-option">
										<Radio.Group
											onChange={e => setOptionInfo(e.target.value)}
											defaultValue={optionInfo}
											buttonStyle="solid"
										>
											<Radio.Button value="info">Thông Tin</Radio.Button>
											<Radio.Button value="profile">Hồ Sơ</Radio.Button>
										</Radio.Group>
									</div>
									<img src={IconStudent} alt="icon" />
								</div>
								<span id="avatar">
									<Avatar src={`${HOST_SERVER}/${infoStudent && infoStudent.avatar}`} size={70} />
								</span>
								{optionInfo === 'info' ? (
									<InfoStudentComponent loading={loadingGetInfoStudent} info={infoStudent} />
								) : (
									<ProfileStudent loading={loadingGetProfileStudent} data={profileStudent} />
								)}
							</div>
						</InfoStudentStyle>
					</Col>
					<Col xs={24} md={14} className="mb-10">
						<Card className="phh-card" title="Tiến độ học tập">
							<TableProgressSubject data={subjectProgressOfStudent} loading={loadingGetSubjectProgressStudent} />
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
}

DetailStudentComponent.propTypes = {
	getInfoStudentStatus: PropTypes.string.isRequired,
	getProfileStudentStatus: PropTypes.string.isRequired,
	getSubjectProgressStudentStatus: PropTypes.string.isRequired,
	getInfoStudentReq: PropTypes.func.isRequired,
	getProfileStudentReq: PropTypes.func.isRequired,
	getSubjectProgressStudentReq: PropTypes.func.isRequired,
	infoStudent: PropTypes.objectOf(PropTypes.any).isRequired,
	profileStudent: PropTypes.instanceOf(Array).isRequired,
	subjectProgressOfStudent: PropTypes.instanceOf(Array).isRequired,
};

export default DetailStudentComponent;
