import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Comment, Tooltip, List, Input, Collapse, Icon, Avatar, Form, Button } from 'antd';
import 'moment/locale/vi';

moment.locale('vi');

const { TextArea } = Input;
const { Panel } = Collapse;

function CommentItem(props) {
	const { item } = props;
	const [isReply, setIsReply] = useState(null);

	return (
		<li key={item && item.key}>
			<Comment
				key={item && item.key}
				actions={[
					<span
						key={item && item.key}
						style={{ display: isReply === null ? 'block' : 'none' }}
						onClick={() => setIsReply(item && item.key)}
					>
						Trả lời
					</span>,
				]}
				author={item && item.author}
				avatar={item && item.avatar}
				content={
					<div>
						<p className="comment-text">{item && item.content}</p>
						{item.children && item.children.length > 0 ? (
							<Collapse
								bordered={false}
								className="collapse-message"
								expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
							>
								<Panel
									header={
										<span>
											<Icon type="message" theme="twoTone" />
											&ensp;{item.children.length} bình luận
										</span>
									}
									key="1"
								>
									<List
										className="comment-list"
										itemLayout="horizontal"
										dataSource={item.children}
										renderItem={ele => (
											<Comment
												author={ele.author}
												avatar={ele.avatar}
												content={
													<div>
														<p className="comment-text">{ele.content}</p>
													</div>
												}
												datetime={
													<Tooltip
														title={moment()
															.subtract(1, 'days')
															.format('DD-MM-YYYY HH:mm')}
													>
														<span>
															{moment()
																.subtract(1, 'days')
																.fromNow()}
														</span>
													</Tooltip>
												}
											/>
										)}
									/>
								</Panel>
							</Collapse>
						) : (
							''
						)}
						<div>
							{isReply === item.key ? (
								<Comment
									avatar={
										<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
									}
									content={
										<Form className="form-custom">
											<Form.Item>
												<TextArea rows={4} />
											</Form.Item>
											<Form.Item>
												<div style={{ float: 'right' }}>
													<Button
														className="btn-submit mr-5"
														style={{ height: '30px !important' }}
														icon="enter"
														htmlType="submit"
														onClick={() => setIsReply(null)}
													>
														Bình luận
													</Button>
													<Button className="btn-cancel" onClick={() => setIsReply(null)}>
														Hủy
													</Button>
												</div>
											</Form.Item>
										</Form>
									}
								/>
							) : (
								''
							)}
						</div>
					</div>
				}
				datetime={
					<Tooltip
						title={moment()
							.subtract(1, 'days')
							.format('DD-MM-YYYY HH:mm')}
					>
						<span>
							{moment()
								.subtract(1, 'days')
								.fromNow()}
						</span>
					</Tooltip>
				}
			/>
		</li>
	);
}

CommentItem.propTypes = {
	item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CommentItem;
