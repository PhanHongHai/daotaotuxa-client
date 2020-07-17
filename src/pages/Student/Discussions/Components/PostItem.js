import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Row, Col, Tooltip, Popover } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import 'moment/locale/vi';
import { PostItemStyle } from '../styled';


moment.locale('vi');


function PostItem(props) {
	const { data } = props;
	return (
		<PostItemStyle>
			<Row>
				<Col xs={24} md={6}>
					<div className="info-account">
						<Popover
							title="Thông tin"
							content={
								<ul className="info-list">
									<li>Họ tên : {data && data.name} </li>
									<li>Email : {data && data.email}</li>
									<li>Họ tên :... </li>
								</ul>
							}
						>
							<Avatar size={50} icon="user" />
						</Popover>
						<span className="info-default">
							<Tooltip
								title={moment()
									.subtract(1, 'days')
									.format('DD-MM-YYYY HH:mm')}
							>
								{moment()
									.subtract(1, 'days')
									.fromNow()}
							</Tooltip>
							<p>{data && data.name}</p>
						</span>
					</div>
				</Col>
				<Col xs={24} md={16}>
					<div className="post-content">
						<Link to="/student/dashboard/thao-luan/123">
							<h2>{data && data.title}</h2>
						</Link>
						<p>{data && data.content}</p>
					</div>
				</Col>
				<Col xs={24} md={2}>
					<span className="post-comment">
						<h3>4</h3>
						<p>bình luận</p>
					</span>
				</Col>
			</Row>
		</PostItemStyle>
	);
}

PostItem.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostItem;
