import React from 'react';
import { List, Avatar, Button, Skeleton, Icon } from 'antd';
import { Link } from 'react-router-dom';

const data = [
	{
		email: 'nguyenvana@gmail.com',
		nameQuestion: 'Hướng dẫn giải bài tập 1',
		time: '2 ngày trước',
	},
	{
		email: 'nguyenvana1@gmail.com',
		nameQuestion: 'Hướng dẫn giải bài tập 1',
		time: '16 phút trước',
	},
	{
		email: 'nguyenvana54@gmail.com',
		nameQuestion: 'Hướng dẫn giải bài tập 1',
		time: '3 ngày trước',
	},
	{
		email: 'nguyenvana123@gmail.com',
		nameQuestion: 'Hướng dẫn giải bài tập 1',
		time: '1 ngày trước',
	},
];

export default function Discussions() {
	return (
		<div>
			<List
				className="demo-loadmore-list"
				loading={false}
				itemLayout="horizontal"
				dataSource={data}
				renderItem={item => (
					<List.Item
						actions={[
							<Button className="btn" key="item.email">
								Xem
							</Button>,
						]}
					>
						<Skeleton avatar title={false} loading={false} active>
							<List.Item.Meta
								avatar={<Avatar icon="user" />}
								title={<p>{item.email}</p>}
								description={
									<span>
										{item.time}
										<br />
										<Link to="/student/dashboard/thao-luan/123">{item.nameQuestion}</Link>
									</span>
								}
							/>
							<div>
								24 câu trả lời&ensp; <Icon type="message" />
							</div>
						</Skeleton>
					</List.Item>
				)}
			/>
		</div>
	);
}
