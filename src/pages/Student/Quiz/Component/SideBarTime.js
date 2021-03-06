import React from 'react';
import PropTypes from 'prop-types';
import { useTimer } from 'react-timer-hook';
import { Anchor, Button, Modal, Popover,  } from 'antd';
import { useHistory } from 'react-router-dom';

import { SidebarTimeStyle } from '../styled';

const { confirm } = Modal;

function SideBarTime(props) {
	const { expiryTimestamp, data, setIsShowResult } = props;
	const history = useHistory();
	const [clientWidth, setClientWidth] = React.useState(window.document.body.clientWidth);
	React.useEffect(() => {
		const handleSize = () => setClientWidth(window.document.body.clientWidth);
		window.addEventListener('resize', handleSize);
		return () => window.removeEventListener('resize', handleSize);
	}, []);
	const { seconds, minutes, hours } = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn('onExpire called'),
	});
	const openSubmit = () => {
		confirm({
			title: 'Xác nhận nộp bài ?',
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
			content: (
				<div className="choice">
					<span style={{ color: 'black', fontSize: '16px', fontWeight: '500' }}>
						Số câu hoàn thành : <span style={{ color: 'green' }}>0</span>/<span style={{ color: 'red' }}>10</span>
					</span>
				</div>
			),
			onOk() {
				setIsShowResult(true);
			},
			onCancel() {},
		});
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
									<span>{hours}:</span>
									<span>{minutes}:</span>
									<span>{seconds}</span>
								</div>
							</div>
							<div className="btn-info">
								<Popover
									title={data.title}
									trigger="click"
									content={
										<span className="info-schedule">
											<ul>
												<li>Ngày thi : {data.startAt}</li>
												<li>Thời gian thi : {data.timeAt}</li>
												<li>Môn học : {data.name}</li>
												<li>Mã môn học : {data.tag}</li>
												<li>Tổng câu hỏi : 10</li>
											</ul>
										</span>
									}
								>
									<Button icon="info-circle" />
								</Popover>
								<Button onClick={() => openSubmit()}>Nộp Bài</Button>
							</div>
						</div>
					</Anchor>
				</SidebarTimeStyle>
			) : (
				<Anchor>
					<SidebarTimeStyle>
						<h2>{data.title}</h2>
						<span className="info-schedule">
							<ul>
								<li>Ngày thi : {data.startAt}</li>
								<li>Thời gian thi : {data.timeAt}</li>
								<li>Môn học : {data.name}</li>
								<li>Mã môn học : {data.tag}</li>
								<li>Tổng câu hỏi : 10</li>
							</ul>
						</span>
						<div className="count-down-time">
							<h3>Thời gian</h3>
							<div className="clock">
								<span>{hours}:</span>
								<span>{minutes}:</span>
								<span>{seconds}</span>
							</div>
						</div>
						<Button className="btn-send  mt-15 mb-15" onClick={() => openSubmit()}>
							Nộp bài
						</Button>
						<Button className="btn-back  mt-15 mb-15" onClick={() => history.push('/student/dashboard')}>
							Quay về
						</Button>
						<div className="choice">
							<span>Số câu hoàn thành</span>
							<span>
								<h2>0</h2>
								<h1>/</h1>
								<h2>10</h2>
							</span>
						</div>
					</SidebarTimeStyle>
				</Anchor>
			)}
		</React.Fragment>
	);
}

SideBarTime.propTypes = {
	expiryTimestamp: PropTypes.number.isRequired,
	data: PropTypes.objectOf(PropTypes.object).isRequired,
	setIsShowResult: PropTypes.func.isRequired,
};

export default SideBarTime;
