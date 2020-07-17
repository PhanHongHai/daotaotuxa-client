import React, { useState } from 'react';
import { Row, Col, Tabs, Icon,  } from 'antd';

import { LessonStyle } from '../styled';

import FrameViewLesson from '../Component/FrameViewLesson';
import ListLesson from '../Component/ListLesson';

import fileTest from '../../../../assets/pdf-test.pdf';

const { TabPane } = Tabs;
const data = [
	{
		_id: 1,
		title: 'Bài 1 : Giới thiệu sơ lược về hệ thống',
		url: fileTest,
	},
	{
		_id: 2,
		title: 'Bài 2 : Giới thiệu sơ lược về hệ thống',
		url: fileTest,
	},
	{
		_id: 3,
		title: 'Bài 3 : Giới thiệu sơ lược về hệ thống',
		url: fileTest,
	},
	{
		_id: 4,
		title: 'Bài 4 : Giới thiệu sơ lược về hệ thống',
		url: fileTest,
	},
	{
		_id: 5,
		title: 'Bài 5 : Giới thiệu sơ lược về hệ thống',
		url: fileTest,
	},
	{
		_id: 6,
		title: 'Bài 6 : Giới thiệu sơ lược về hệ thống',
		url: fileTest,
	},
];
export default function DetailSubject() {
	const [urlLesson, setUrlLesson] = useState(null);

	return (
		<div>
			<Row>
				<Col xs={24} md={8}>
					<LessonStyle>
						<div className="sidebar-lesson">
							<Tabs type="card tab-custom">
								<TabPane
									tab={
										<span className="title-tab">
											<Icon type="read" />
											&ensp;Bài học
										</span>
									}
									key="0"
								>
									<ListLesson data={data} urlLesson={urlLesson} setUrlLesson={setUrlLesson} />
								</TabPane>
								<TabPane
									tab={
										<span className="title-tab">
											<Icon type="form" />
											&ensp;Bài Tập
										</span>
									}
									key="1"
								>
									<ListLesson data={data} urlLesson={urlLesson} setUrlLesson={setUrlLesson} />
								</TabPane>
								<TabPane
									tab={
										<span className="title-tab">
											<Icon type="file" />
											&ensp;Tài Liệu
										</span>
									}
									key="2"
								>
									<ListLesson data={data} urlLesson={urlLesson} setUrlLesson={setUrlLesson} />
								</TabPane>
							</Tabs>
						</div>
					</LessonStyle>
				</Col>
				<Col xs={24} md={16}>
					<FrameViewLesson lesson={urlLesson} />
				</Col>
			</Row>
		</div>
	);
}
