import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
	Breadcrumb,
	Typography,
	Avatar,
	Card,
	Dropdown,
	Icon,
	Comment,
	Form,
	Input,
	Button,
	Tooltip,
	Menu,
	Divider,
} from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

import CommentList from '../Components/CommentList';

import { DetailPostStyle } from '../styled';

import PostList from '../Components/PostList';

const dataPost = [
	{
		_id: 1,
		title: 'Tieu de bai viet 1',
	},
	{
		_id: 2,
		title: 'Tieu de bai viet 2',
	},
	{
		_id: 3,
		title: 'Tieu de bai viet 3',
	},
	{
		_id: 4,
		title: 'Tieu de bai viet 4',
	},
];

function DetailPost(props) {
	const [isComment, setIsComment] = useState(false);
	return (
		<div className="container mb-15">
			<DetailPostStyle>
				<Row gutter={16}>
					<Col xs={24} md={24} className="mb-10 mt-15">
						<Typography.Title level={4}>CHI TIẾT BÀI VIẾT</Typography.Title>
						<Breadcrumb>
							<Breadcrumb.Item>
								<Link to="/student/dashboard">Dashboard</Link>
							</Breadcrumb.Item>
							<Breadcrumb.Item>
								<Link to="/student/dashboard/thao-luan">Thảo luận</Link>
							</Breadcrumb.Item>
							<Breadcrumb.Item>Tiêu đề bài viết 1</Breadcrumb.Item>
						</Breadcrumb>
					</Col>
					<Col xs={24} md={24}>
						<Row gutter={16}>
							<Col xs={24} md={16}>
								<Card
									className="phh-card-v2 card-no-head"
									title={
										<div className="info-user">
											<Avatar size={40} icon="user" />
											<ul>
												<li>
													<p style={{ color: 'black', margin: 0, fontSize: '15px' }}>Nguyen van a</p>
												</li>
												<li>
													<Tooltip
														title={moment()
															.subtract(1, 'days')
															.format('DD-MM-YYYY HH:mm')}
													>
														<small style={{ color: 'rgba(140, 136, 136, 0.85)' }}>
															{moment()
																.subtract(1, 'days')
																.fromNow()}
														</small>
													</Tooltip>
												</li>
											</ul>
										</div>
									}
									extra={
										<Dropdown
											overlayClassName="dropdown-origin"
											overlay={
												<Menu>
													<Menu.Item key="3">Báo cáo bài viết</Menu.Item>
												</Menu>
											}
											trigger={['click']}
										>
											<Button className="btn-transparent" icon="ellipsis" />
										</Dropdown>
									}
								>
									<Typography.Title level={3}>Tieu de bai viet</Typography.Title>
									<p className="post-content">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores beatae quisquam iste maiores
										libero, corrupti totam saepe itaque quidem perspiciatis? Lorem ipsum dolor sit amet, consectetur
										adipisicing elit. Eos culpa commodi consequuntur! Optio labore corporis quo a quia, incidunt unde
										soluta velit ad, eius exercitationem sequi ab laborum! Nostrum voluptate earum sit aperiam quaerat
										unde, vel excepturi quisquam nihil reprehenderit in minus laudantium eligendi odio iusto nemo,
										aspernatur, optio soluta!
									</p>
									<Divider />
									<div className="post-action">
										<ul>
											<li>
												<Button icon="like"> 5 Thích</Button>
											</li>
											<li>
												<Button icon="message" onClick={() => setIsComment(!isComment)}>
													Bình luận
												</Button>
											</li>
										</ul>
									</div>
									<div>
										{isComment ? (
											<Comment
												avatar={<Avatar icon="user" alt="Han Solo" />}
												content={
													<div>
														<Form.Item>
															<Input.TextArea rows={2} />
														</Form.Item>
														<Form.Item>
															<div style={{ float: 'right' }}>
																<Button
																	className="btn-submit mr-5"
																	style={{ height: '30px !important' }}
																	icon="enter"
																	htmlType="submit"
																>
																	Bình luận
																</Button>
																<Button className="btn-cancel" onClick={() => setIsComment(false)}>
																	Hủy
																</Button>
															</div>
														</Form.Item>
													</div>
												}
											/>
										) : (
											''
										)}
									</div>
									<div>
										<CommentList />
									</div>
								</Card>
							</Col>
							<Col xs={24} md={8}>
								<Card title="Bài viết liên quan" className="phh-card-v2">
									<PostList data={dataPost} />
								</Card>
							</Col>
						</Row>
					</Col>
				</Row>
			</DetailPostStyle>
		</div>
	);
}

DetailPost.propTypes = {};

export default DetailPost;
