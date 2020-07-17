import React from 'react';
import { Timeline, Icon } from 'antd';
import moment from 'moment';

const data = [
	{
		title: 'Tìm hiểu bài 1 & bài 2',
		startAt: moment().format('DD-MM-YYYY'),
		endAt: moment()
			.add(1, 'day')
			.format('DD-MM-YYYY'),
		type: 'learn',
	},
	{
		title: 'Làm bài tập chương 1',
		startAt: moment().format('DD-MM-YYYY'),
		endAt: moment()
			.add(1, 'day')
			.format('DD-MM-YYYY'),
		type: 'homework',
	},
	{
		title: 'Tìm hiểu bài 3 & bài 4',
		startAt: moment().format('DD-MM-YYYY'),
		endAt: moment()
			.add(1, 'day')
			.format('DD-MM-YYYY'),
		type: 'learn',
	},
	{
		title: 'Tìm hiểu bài 3 & bài 4',
		startAt: moment().format('DD-MM-YYYY'),
		endAt: moment()
			.add(1, 'day')
			.format('DD-MM-YYYY'),
		type: 'learn',
	},
	{
		title: 'Tìm hiểu bài 3 & bài 4',
		startAt: moment().format('DD-MM-YYYY'),
		endAt: moment()
			.add(1, 'day')
			.format('DD-MM-YYYY'),
		type: 'learn',
	},
	{
		title: 'Kiểm tra bài chương 1',
		startAt: moment().format('DD-MM-YYYY'),
		endAt: moment()
			.add(1, 'day')
			.format('DD-MM-YYYY'),
		type: 'test',
	},
	{
		title: 'Tìm hiểu bài 3 & bài 4',
		startAt: moment().format('DD-MM-YYYY'),
		endAt: moment()
			.add(1, 'day')
			.format('DD-MM-YYYY'),
		type: 'learn',
	},
	{
		title: 'Tìm hiểu bài 3 & bài 4',
		startAt: moment().format('DD-MM-YYYY'),
		endAt: moment()
			.add(1, 'day')
			.format('DD-MM-YYYY'),
		type: 'learn',
	},
	{
		title: 'Kiểm tra bài chương 2',
		startAt: moment().format('DD-MM-YYYY'),
		endAt: moment()
			.add(1, 'day')
			.format('DD-MM-YYYY'),
		type: 'test',
	},
];

export default function TimeLineStudent() {
	const renderTimeLine = dataTimeLine => {
		if (dataTimeLine.length > 0)
			return dataTimeLine.map(ele => {
				let colorType = '';
				let iconType = '';
				switch (ele.type) {
					case 'learn':
						colorType = 'blue';
						iconType = 'read';
						break;
					case 'homework':
						colorType = 'green';
						iconType = 'form';
						break;

					default:
						colorType = 'red';
						iconType = 'clock-circle-o';
						break;
				}

				return (
					<Timeline.Item color={colorType} dot={<Icon type={iconType} style={{ fontSize: '16px' }} />}>
						{ele.title}
						<br />
						{ele.startAt} / {ele.endAt}
					</Timeline.Item>
				);
			});

		return 0;
	};
	return (
		<div className='mt-5'>
			<Timeline mode="alternate">{renderTimeLine(data)}</Timeline>
		</div>
	);
}
