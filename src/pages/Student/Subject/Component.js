import React from 'react';
import { Row, Col } from 'antd';

import ListSubject from './Component/ListSubjectItem';

const dataSubject = [
	{
		_id: 1,
		title: 'Lập trình web',
		content: 'day la mon lap trinh web',
		countLesson: 14,
	},
	{
		_id: 2,
		title: 'Lập trình web',
		content: 'day la mon lap trinh web',
		countLesson: 14,
	},
	{
		_id: 3,
		title: 'Lập trình web',
		content: 'day la mon lap trinh web',
		countLesson: 14,
	},
	{
		_id: 4,
		title: 'Lập trình web',
		content: 'day la mon lap trinh web',
		countLesson: 14,
	},
	{
		_id: 5,
		title: 'Lập trình web',
		content: 'day la mon lap trinh web',
		countLesson: 14,
	},
	{
		_id: 6,
		title: 'Lập trình web',
		content: 'day la mon lap trinh web',
		countLesson: 14,
	},
	{
		_id: 7,
		title: 'Lập trình web',
		content: 'day la mon lap trinh web',
		countLesson: 14,
	},
	{
		_id: 8,
		title: 'Lập trình web',
		content: 'day la mon lap trinh web',
		countLesson: 14,
	},
];
export default function SubjectStudent() {
	return (
		<div className="container mb-15">
			<Row>
				<Col xs={24} md={24}>
					<Row gutter={16}>
						<ListSubject data={dataSubject} />
					</Row>
				</Col>
			</Row>
		</div>
	);
}
