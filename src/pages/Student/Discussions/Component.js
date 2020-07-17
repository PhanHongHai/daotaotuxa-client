import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, Breadcrumb, Card, Input, Button, Pagination, Modal } from 'antd';
import { Link } from 'react-router-dom';

import PostItem from './Components/PostItem';
import MyPost from './Components/MyPost';
import ModalCreatePost from './Components/ModalCreatePost';
import ModalUpdatePost from './Components/ModalUpdatePost';

const dataPost = [
	{
		key: 1,
		name: 'nguyen van a',
		email: 'nguyenvana@gmail.com',
		title: 'How to create new component in react ?',
		content: 'Tutorial create component in react....',
	},

	{
		key: 2,
		name: 'nguyen van b',
		email: 'nguyenvana@gmail.com',
		title: 'How to create new component in react ?',
		content: 'Tutorial create component in react....',
	},

	{
		key: 3,
		name: 'nguyen van c',
		email: 'nguyenvana@gmail.com',
		title: 'How to create new component in react ?',
		content: 'Tutorial create component in react....',
	},

	{
		key: 4,
		name: 'nguyen van d',
		email: 'nguyenvana@gmail.com',
		title: 'How to create new component in react ?',
		content: 'Tutorial create component in react....',
	},
];
const { confirm } = Modal;

function Discussion(props) {
	const [visibleCreatePost, setVisibleCreatePost] = useState(false);
	const [visibleUpdatePost, setVisibleUpdatePost] = useState(false);
	const [tabKey, setTabKey] = useState('posts');

	const handleConfirmDeletePost = post => {
		confirm({
			title: `Bạn muốn xóa bài viết ${post.title} ?`,
			onOk() {},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};

	const renderPosts = data => {
		if (data.length > 0)
			return data.map(ele => (
				<Col span={24}>
					<PostItem key={ele.key} data={ele} />
				</Col>
			));
	};
	const renderMyPosts = data => {
		if (data.length > 0)
			return data.map(ele => (
				<Col span={24}>
					<MyPost handleUpdate={setVisibleUpdatePost} handleRemove={handleConfirmDeletePost} key={ele.key} data={ele} />
				</Col>
			));
	};

	return (
		<div className="container mb-15">
			<Row gutter={16}>
				<Col xs={24} md={24} className="mb-5 mt-15">
					<Typography.Title level={4}>THẢO LUẬN</Typography.Title>
					<Breadcrumb>
						<Breadcrumb.Item>
							<Link to="/student/dashboard">Dashboard</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>Thảo luận</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
				<Col xs={24} md={24}>
					<Card
						className="phh-card-v2 card-no-pd"
						title={
							<span className="search-small">
								<Input.Search enterButton placeholder="Nhập từ khóa" />
							</span>
						}
						extra={
							<span>
								{tabKey === 'posts' ? (
									<Button className="btn mr-5" onClick={() => setTabKey('my-post')}>
										Quản lý bài viết
									</Button>
								) : (
									<Button className="btn mr-5" onClick={() => setTabKey('posts')}>
										Danh sách bài viết
									</Button>
								)}
								<Button className="btn" onClick={() => setVisibleCreatePost(true)}>
									Tạo bài viết
								</Button>
							</span>
						}
					>
						<Row>{tabKey === 'posts' ? renderPosts(dataPost) : renderMyPosts(dataPost)}</Row>
					</Card>
					<Card className="phh-card-v2 mt-10 card-no-pd" style={{ width: ' 200px', float: 'right' }}>
						<Pagination className="pd-1" size="small" total={50} />
					</Card>
				</Col>
			</Row>
			<ModalCreatePost visible={visibleCreatePost} setvisible={setVisibleCreatePost} />
			<ModalUpdatePost visible={visibleUpdatePost} setvisible={setVisibleUpdatePost} />
		</div>
	);
}

Discussion.propTypes = {};

export default Discussion;
