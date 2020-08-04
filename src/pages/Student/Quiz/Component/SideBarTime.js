import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Button, Popover, Statistic, Row, Col, Avatar, Tag } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi';

import { SidebarTimeStyle } from '../styled';
import { HOST_SERVER } from '../../../../constands/Other';

const { Countdown } = Statistic;

moment.locale('vi');

function SideBarTime(props) {
	const { data, submitTaskReq } = props;
	const userProfile = useSelector(state => state.loginPage.profileUser);
	const [clientWidth, setClientWidth] = React.useState(window.document.body.clientWidth);
	React.useEffect(() => {
		const handleSize = () => setClientWidth(window.document.body.clientWidth);
		window.addEventListener('resize', handleSize);
		return () => window.removeEventListener('resize', handleSize);
	}, []);
	const caculateTimeCountDown = (dayAt, timeAt, timeRange) => {
		const dateAt = moment(dayAt).set({ hour: moment(timeAt).hour(), minute: moment(timeAt).minute() });
		const timeEnd = moment(dateAt).add(timeRange, 'minute');
		return timeEnd;
	};

	return (
		<React.Fragment>
			{clientWidth < 445 ? (
				<SidebarTimeStyle>
					<Anchor>
						<div className="sidebar-mobile">
							<div className="frame-time">
								<p>Thời gian làm bài &ensp;</p>
								<div className="clock">
									<Countdown
										onFinish={submitTaskReq}
										value={data && caculateTimeCountDown(data.dayAt, data.timeAt, data.timeRange)}
									/>
								</div>
							</div>
							<div className="btn-info">
								<Popover
									title={data.title}
									trigger="click"
									content={
										<span className="info-schedule">
											<ul>
												<li>Ngày thi : {data && moment(data.dayAt).format('DD-MM-YYYY')}</li>
												<li>Thời gian thi&ensp; {data && moment(data.timeAt).format('h:mm a')}</li>
												<li>Môn học : {data.subjectID && data.subjectID.name}</li>
												<li>Mã môn học : #{data.subjectID && data.subjectID.tag}</li>
												<li>Tổng câu hỏi :{data.examID && data.examID.questions.length}</li>
											</ul>
										</span>
									}
								>
									<Button icon="info-circle" />
								</Popover>
							</div>
						</div>
					</Anchor>
				</SidebarTimeStyle>
			) : (
				<Anchor>
					<SidebarTimeStyle>
						<Row>
							<Col span={24}>
								<div className="quiz-title">
									<h2>Thông tin học viên</h2>
								</div>
								<div className="info-student">
									<Avatar shape="square" src={`${HOST_SERVER}/${userProfile.avatar}`} size={100} />
									<ul>
										<li>Họ tên :&ensp;{userProfile && userProfile.name} </li>
										<li>
											MSHV:&ensp;<Tag>#{userProfile && userProfile.tag}</Tag>
										</li>
									</ul>
								</div>
							</Col>
							<Col span={24}>
								<div className="quiz-title">
									<h2>Thời gian làm bài</h2>
								</div>
								<div className="count-down-time">
									<div className="clock">
										<Countdown
											onFinish={submitTaskReq}
											value={data && caculateTimeCountDown(data.dayAt, data.timeAt, data.timeRange)}
										/>
									</div>
								</div>
							</Col>
							<Col span={24}>
								<div className="quiz-title">
									<h2>Thông tin thi</h2>
								</div>
								<span className="info-schedule">
									<ul>
										<li>Ngày thi : {data && moment(data.dayAt).format('DD-MM-YYYY')}</li>
										<li>Thời gian thi&ensp; {data && moment(data.timeAt).format('HH:mm')}</li>
										<li>Môn học : {data.subjectID && data.subjectID.name}</li>
										<li>Mã môn học : #{data.subjectID && data.subjectID.tag}</li>
										<li>Tổng câu hỏi :{data.examID && data.examID.questions.length}</li>
									</ul>
								</span>
							</Col>
						</Row>
					</SidebarTimeStyle>
				</Anchor>
			)}
		</React.Fragment>
	);
}

SideBarTime.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	submitTaskReq: PropTypes.func.isRequired,
};

export default SideBarTime;
