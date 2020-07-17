import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Dropdown, Menu, Button } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import 'moment/locale/vi';
import { PostItemStyle } from '../styled';

moment.locale('vi');

function MyPost(props) {
	const { data, handleRemove, handleUpdate } = props;
	return (
		<PostItemStyle>
			<Row>
				<Col xs={24} md={2}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Dropdown
							overlayClassName="dropdown-origin"
							overlay={
								<Menu>
									<Menu.Item key="2" onClick={() => handleUpdate(true)}>
										Cập nhật
									</Menu.Item>
									<Menu.Item key="3" onClick={() => handleRemove(data)}>
										Xóa
									</Menu.Item>
								</Menu>
							}
							trigger={['click']}
						>
							<Button style={{ marginTop: '15%', fontSize: '25px' }} className="btn-transparent" icon="more" />
						</Dropdown>
					</div>
				</Col>
				<Col xs={24} md={20}>
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

MyPost.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	handleRemove: PropTypes.func.isRequired,
	handleUpdate: PropTypes.func.isRequired,
};

export default MyPost;
