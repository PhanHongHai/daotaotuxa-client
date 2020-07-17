import React from 'react';
import PropTypes from 'prop-types';
import { Card, List, Avatar, Button, Skeleton, Col, ConfigProvider, Icon, Pagination } from 'antd';
import { useHistory } from 'react-router-dom';

import { ListSubjectStyle } from '../styled';

import BookIcon from '../../../../assets/images/textbook.png';

function ListSubjectItem(props) {
	const { data } = props;
	const history = useHistory();
	return (
		<Card className="card-transparent" bordered={false} title="Danh sách môn học">
			<ConfigProvider
				renderEmpty={() => (
					<div style={{ textAlign: 'center' }}>
						<Icon type="frown" style={{ fontSize: 30 }} />
						<h1 style={{ color: 'silver' }}>Không có dữ liệu</h1>
					</div>
				)}
			>
				<ListSubjectStyle
					className=""
					loading={false}
					itemLayout="horizontal"
					dataSource={data}
					renderItem={item => (
						<Col xs={24} md={12} className="mb-15">
							<List.Item
							key='item._id'
								className="subject-item"
								actions={[
									<Button className="btn" key="item._id" onClick={() => history.push(`/student/dashboard/mon-hoc/${item._id}`)}>
										Học ngay
									</Button>,
								]}
							>
								<Skeleton avatar title={false} loading={false} active>
									<List.Item.Meta
										avatar={<Avatar src={BookIcon} size={50} />}
										title={<h3>#243545 - &ensp;{item.title}</h3>}
										description={
											<span>
												<Icon type="read" />
												&ensp;{item.countLesson} bài học
											</span>
										}
									/>
								</Skeleton>
							</List.Item>
						</Col>
					)}
				/>
			</ConfigProvider>
			{data && data.length > 0 ? (
				<div className="fl-right mt-10">
					<Pagination size="small" total={50} />
				</div>
			) : (
				''
			)}
		</Card>
	);
}

ListSubjectItem.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};

export default ListSubjectItem;
