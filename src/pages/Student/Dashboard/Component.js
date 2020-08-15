import React, { useEffect } from 'react';
import { Row, Col, Card, Typography, Badge, Spin, Icon } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import QRCode from 'qrcode.react';

import { DashboardStyle } from './styled';
// import TimeLineStudent from './Component/TimeLine';
// import Discussions from './Component/Discussions';
import InfoClass from './Component/InfoClass';
import CalendarAttendance from './Component/CalendarAttendance';
import ProgressOnline from './Component/ProgressOnline';
import LoadingCustom from '../../../components/LoadingCustom';

function DashboardStudent(props) {
	const {
		getInfoClassStatus,
		getTimeKeepingOfStudentStatus,
		attendanceByStudentStatus,
		infoClass: { countStudent, infoClass },
		timeKeeping,
		getInfoClassReq,
		getTimeKeepingReq,
		attendanceReq,
	} = props;
	useEffect(() => {
		getInfoClassReq({});
		getTimeKeepingReq();
	}, []);

	const loadingGetInfo = getInfoClassStatus === 'FETCHING';
	const loadingGetTimeKeeping = getTimeKeepingOfStudentStatus === 'FETCHING';
	const loadingAttendance = attendanceByStudentStatus === 'FETCHING';

	const hanldeAttendance = () => {
		attendanceReq({
			req: {
				date: moment().format('DD-MM-YYYY'),
			},
		});
	};

	return (
		<DashboardStyle>
			<div className="container mb-15">
				<Row gutter={16}>
					<Col xs={24} md={24} className="mb-5 mt-15">
						<Typography.Title level={4}>Dashboard</Typography.Title>
					</Col>
					{/* <Col xs={24} md={8} className="mb-10">
						<Card title="Thông Tin Giảng Viên " className="phh-card-v2">
							<Spin spinning={loadingGetInfo} indicator={<LoadingCustom margin={0} />}>
								<InfoTeacher info={infoTeacher} />
							</Spin>
						</Card>
					</Col> */}
					<Col xs={24} md={24} className="">
						<Row>
							<Col span={24} className="mb-10">
								<Card title="Thông Tin Lớp Học" className="phh-card-v2">
									<Spin spinning={loadingGetInfo} indicator={<LoadingCustom margin={0} />}>
										<InfoClass info={{ infoClass, countStudent }} />
									</Spin>
								</Card>
							</Col>
							<Col span={24} className="mb-5">
								<Row gutter={16}>
									<Col xs={24} md={8} className="mb-10">
										<Card
											className="phh-card-v2 card-no-pd"
											title="Ngày điểm danh"
											extra={<Badge color="#0ed6b14a" text="Điểm danh" />}
										>
											<Spin spinning={loadingGetTimeKeeping} indicator={<LoadingCustom margin={0} />}>
												<CalendarAttendance range={infoClass} timeKeeping={timeKeeping} />
											</Spin>
										</Card>
									</Col>
									<Col xs={24} md={8} className="mb-5">
										<Card title="Bảng Chuyên cần" className="phh-card-v2">
											<Spin spinning={loadingGetTimeKeeping} indicator={<LoadingCustom margin={0} />}>
												{infoClass && !_.isEmpty(infoClass) ? (
													<ProgressOnline
														timeKeeping={timeKeeping}
														hanldeAttendance={hanldeAttendance}
														loadingAttendance={loadingAttendance}
														range={infoClass}
													/>
												) : (
													<div
														style={{
															textAlign: 'center',
															minHeight: 270,
															display: 'flex',
															justifyContent: 'center',
															alignItems: 'center',
															flexDirection: 'column',
														}}
													>
														<Icon type="frown" style={{ fontSize: 30 }} />
														<h1 style={{ color: 'silver' }}>Chưa có thông tin lớp học</h1>
													</div>
												)}
											</Spin>
										</Card>
									</Col>
									<Col xs={24} md={8} className="mb-5">
										<Card className="phh-card-v2" title="Mã thông tin bảng điểm">
											<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
												<QRCode size={265} value="Bảng điểm hiện tại đang trống" />
											</div>
										</Card>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
					{/* <Col xs={24} md={10} className="mt-5 mb-5">
						<Card title="Mốc thời gian" className="phh-card-v2">
							<div className="frame">
								<TimeLineStudent />
							</div>
						</Card>
					</Col>
					<Col xs={24} sm={14} md={14} className="mt-5">
						<Card title="Bảng thông báo" className="phh-card-v2">
							<Discussions />
						</Card>
					</Col> */}
				</Row>
			</div>
		</DashboardStyle>
	);
}

DashboardStudent.propTypes = {
	getInfoClassStatus: PropTypes.string.isRequired,
	getTimeKeepingOfStudentStatus: PropTypes.string.isRequired,
	attendanceByStudentStatus: PropTypes.string.isRequired,
	infoClass: PropTypes.objectOf(PropTypes.any).isRequired,
	timeKeeping: PropTypes.instanceOf(Array).isRequired,
	getInfoClassReq: PropTypes.func.isRequired,
	getTimeKeepingReq: PropTypes.func.isRequired,
	attendanceReq: PropTypes.func.isRequired,
};

export default DashboardStudent;
