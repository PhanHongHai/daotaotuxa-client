import {lazy} from 'react';

const Quiz= lazy(() => import('../../pages/Student/Quiz/Container'));
const Lesson= lazy(() => import('../../pages/Student/Class/Page/DetailSubject'));



export default [
	{
		path: '/quiz/:ID',
		key: '/quiz/:ID',
		icon: 'tool',
		title: 'Chi Tiết Môn Học',
		component: Quiz,
		exact: true,
		isMenu: false,
		isMobile: false,
		isFirst:false,
	},
	{
		path: '/learn/:ID',
		key: '/learn/:ID',
		icon: 'tool',
		title: 'Chi Tiết Môn Học',
		component: Lesson,
		exact: true,
		isMenu: false,
		isMobile: false,
		isFirst:false,
	},

];
