import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card, Spin } from 'antd';
import { useHistory } from 'react-router-dom';

import { DashboardTeacherStyle } from './styled';

import BreadCrumb from '../../../components/BreadCrumb';
import InfoClass from './Component/InfoClass';
import BoxFeature from './Component/BoxFeature';

import LoadingCustom from '../../../components/LoadingCustom';

const breadcrumb = [
	{
		icon: 'home',
		path: '/teacher/dashboard',
		text: '',
	},
];

function DashboadTeacher(props) {
	const { getInfoClassStatus, infoClass, getInfoClassReq, updateStatusClassStatus, updateClassReq } = props;
	useEffect(() => {
		getInfoClassReq({});
	}, []);
	const history = useHistory();
	const loadingGetInfoClass = getInfoClassStatus === 'FETCHING';
	const loadingUpdateClass = updateStatusClassStatus === 'FETCHING';
	return (
		<DashboardTeacherStyle>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="appstore" visible={false} pageCurrentText="Tổng Quan" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24} className="mb-10">
						<Card title="Thông Tin Lớp Học" className="phh-card">
							<Spin spinning={loadingGetInfoClass} indicator={<LoadingCustom margin={0} />}>
								<InfoClass info={infoClass} updateReq={updateClassReq} loadingUpdate={loadingUpdateClass} />
							</Spin>
						</Card>
					</Col>
					{/* <Col xs={24} sm={24} md={14}>
						<Card
							title="Quá trình đào tạo"
							className="phh-card"
							extra={
								<span className="group-btn">
									<Button type="primary" className="btn" icon="plus">
										Thêm mới
									</Button>
								</span>
							}
						>
							<div className="frame">
								<TimeLine />
							</div>
						</Card>
					</Col> */}
					<Col xs={24} sm={24} md={16}>
						<Row gutter={16}>
							<Col xs={24} md={12} className="mb-10">
								<BoxFeature
									icon="question-circle"
									title="Câu Hỏi"
									onSelect={() => history.push('/teacher/dashboard/ngan-hang-cau-hoi')}
								/>
							</Col>
							<Col xs={24} md={12} className="mb-10">
								<BoxFeature
									icon="reconciliation"
									title="Đề Thi"
									onSelect={() => history.push('/teacher/dashboard/de-thi')}
								/>
							</Col>
							{/* <Col xs={24} md={24}>
								<CalendarTeacher />
							</Col> */}
						</Row>
					</Col>
				</Row>
			</div>
		</DashboardTeacherStyle>
	);
}
DashboadTeacher.propTypes = {
	getInfoClassStatus: PropTypes.string.isRequired,
	updateStatusClassStatus: PropTypes.string.isRequired,
	infoClass: PropTypes.objectOf(PropTypes.object).isRequired,
	getInfoClassReq: PropTypes.func.isRequired,
	updateClassReq: PropTypes.func.isRequired,
};

export default DashboadTeacher;
