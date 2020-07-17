import { lazy } from 'react';

const Lesson = lazy(() => import('../../pages/Student/Class/Page/DetailSubject'));

export default [
	{
		path: '/learn/:classID/:subjectID',
		key: '/learn/:classID/:subjectID',
		icon: 'tool',
		title: 'Chi Tiết Môn Học',
		component: Lesson,
		exact: true,
		isMenu: false,
		isMobile: false,
		isFirst: false,
	},
];
