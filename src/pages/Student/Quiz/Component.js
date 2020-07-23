import React, { useState } from 'react';
import { Result, Button, BackTop, Icon, Row, Col } from 'antd';

import IconQuiz from '../../../assets/images/test.jpg';

import FrameQuestion from './Component/FrameQuestion';
import SideBarTime from './Component/SideBarTime';
import ResuleQuizStyle from './Component/ResuleQuiz';

import { NotiStyle, QuizStyle } from './styled';

const data = [
	{
		_id: 1,
		name: 'CPU là viết tắt của cụm từ nào, bạn sử dụng lựa chọn nào ?',
		quetion: [
			{
				_id: 1,
				title: 'A',
				content: 'Common Processing Unit',
			},
			{
				_id: 2,
				title: 'B',
				content: 'Control Processing Unit',
			},
			{
				_id: 3,
				title: 'C',
				content: 'Case Processing Unit',
			},
			{
				_id: 4,
				title: 'D',
				content: 'Central Processing Unit',
			},
		],
	},
	{
		_id: 2,
		name: 'CPU là viết tắt của cụm từ nào, bạn sử dụng lựa chọn nào ?',
		quetion: [
			{
				_id: 1,
				title: 'A',
				content: 'Common Processing Unit',
			},
			{
				_id: 2,
				title: 'B',
				content: 'Control Processing Unit',
			},
			{
				_id: 3,
				title: 'C',
				content: 'Case Processing Unit',
			},
			{
				_id: 4,
				title: 'D',
				content: 'Central Processing Unit',
			},
		],
	},
	{
		_id: 3,
		name: 'CPU là viết tắt của cụm từ nào, bạn sử dụng lựa chọn nào ?',
		quetion: [
			{
				_id: 1,
				title: 'A',
				content: 'Common Processing Unit',
			},
			{
				_id: 2,
				title: 'B',
				content: 'Control Processing Unit',
			},
			{
				_id: 3,
				title: 'C',
				content: 'Case Processing Unit',
			},
			{
				_id: 4,
				title: 'D',
				content: 'Central Processing Unit',
			},
		],
	},
	{
		_id: 4,
		name: 'CPU là viết tắt của cụm từ nào, bạn sử dụng lựa chọn nào ?',
		quetion: [
			{
				_id: 1,
				title: 'A',
				content: 'Common Processing Unit',
			},
			{
				_id: 2,
				title: 'B',
				content: 'Control Processing Unit',
			},
			{
				_id: 3,
				title: 'C',
				content: 'Case Processing Unit',
			},
			{
				_id: 4,
				title: 'D',
				content: 'Central Processing Unit',
			},
		],
	},
	{
		_id: 5,
		name: 'CPU là viết tắt của cụm từ nào, bạn sử dụng lựa chọn nào ?',
		quetion: [
			{
				_id: 1,
				title: 'A',
				content: 'Common Processing Unit',
			},
			{
				_id: 2,
				title: 'B',
				content: 'Control Processing Unit',
			},
			{
				_id: 3,
				title: 'C',
				content: 'Case Processing Unit',
			},
			{
				_id: 4,
				title: 'D',
				content: 'Central Processing Unit',
			},
		],
	},
	{
		_id: 7,
		name: 'CPU là viết tắt của cụm từ nào, bạn sử dụng lựa chọn nào ?',
		quetion: [
			{
				_id: 1,
				title: 'A',
				content: 'Common Processing Unit',
			},
			{
				_id: 2,
				title: 'B',
				content: 'Control Processing Unit',
			},
			{
				_id: 3,
				title: 'C',
				content: 'Case Processing Unit',
			},
			{
				_id: 4,
				title: 'D',
				content: 'Central Processing Unit',
			},
		],
	},
	{
		_id: 8,
		name: 'CPU là viết tắt của cụm từ nào, bạn sử dụng lựa chọn nào ?',
		quetion: [
			{
				_id: 1,
				title: 'A',
				content: 'Common Processing Unit',
			},
			{
				_id: 2,
				title: 'B',
				content: 'Control Processing Unit',
			},
			{
				_id: 3,
				title: 'C',
				content: 'Case Processing Unit',
			},
			{
				_id: 4,
				title: 'D',
				content: 'Central Processing Unit',
			},
		],
	},
	{
		_id: 9,
		name: 'CPU là viết tắt của cụm từ nào, bạn sử dụng lựa chọn nào ?',
		quetion: [
			{
				_id: 1,
				title: 'A',
				content: 'Common Processing Unit',
			},
			{
				_id: 2,
				title: 'B',
				content: 'Control Processing Unit',
			},
			{
				_id: 3,
				title: 'C',
				content: 'Case Processing Unit',
			},
			{
				_id: 4,
				title: 'D',
				content: 'Central Processing Unit',
			},
		],
	},
	{
		_id: 10,
		name: 'CPU là viết tắt của cụm từ nào, bạn sử dụng lựa chọn nào ?',
		quetion: [
			{
				_id: 1,
				title: 'A',
				content: 'Common Processing Unit',
			},
			{
				_id: 2,
				title: 'B',
				content: 'Control Processing Unit',
			},
			{
				_id: 3,
				title: 'C',
				content: 'Case Processing Unit',
			},
			{
				_id: 4,
				title: 'D',
				content: 'Central Processing Unit',
			},
		],
	},
];
const time = new Date();
time.setSeconds(time.getSeconds() + 600);

const dataSchedule = {
	title: 'Thi giữa kỳ',
	name: 'Hệ thống thông tin',
	tag: '#3423434',
	startAt: '24-4-2020',
	timeAt: '8:30 AM',
};

const result = {
	wrongAnswer: 4,
	rightAnswer: 6,
	point: 6,
};

export default function QuizComponent() {
	const [isStart, setIsStart] = useState(false);
	const [isShowResult, setIsShowResult] = useState(false);
	const renderContent = () => {
		if (isStart && !isShowResult) {
			return (
				<div className="quiz-content">
					<div className="quiz-exam">
						<FrameQuestion data={data} />
						<BackTop />
					</div>
					<div className="quiz-info">
						<SideBarTime setIsShowResult={setIsShowResult} data={dataSchedule} expiryTimestamp={time} />
					</div>
				</div>
			);
		}
		if (isShowResult) {
			return <ResuleQuizStyle info={dataSchedule} result={result} />;
		}

		return (
			<NotiStyle className="mt-25">
				<Result
					icon={<img width="250" src={IconQuiz} alt="kiem tra" />}
					title="Kiểm tra giữa kỳ"
					extra={
						<div>
							<ul>
								<li>
									<Icon type="book" /> &ensp;Mã môn học : #54345454
								</li>
								<li>
									<Icon type="book" /> &ensp; Môn học : Hệ thống thông tin
								</li>
								<li>
									<Icon type="question-circle" /> &ensp;Số câu hỏi : 10
								</li>
								<li>
									<Icon type="calendar" />
									&ensp;Ngày thi: 25-4-2020
								</li>
								<li>
									<Icon type="hourglass" />
									&ensp;Thời gian thi 9:30 (thời gian làm 90 phút)
								</li>
							</ul>

							<Button onClick={() => setIsStart(true)} className="btn">
								Bắt đầu
							</Button>
						</div>
					}
				/>
			</NotiStyle>
		);
	};

	return <QuizStyle>{renderContent()}</QuizStyle>;
}
