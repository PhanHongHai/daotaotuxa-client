import {lazy} from 'react';

const Dashboard= lazy(() => import('../../pages/Student/Dashboard/Container'));
const AccountSetting= lazy(() => import('../../pages/Student/Setting/Container'));
const Schedule= lazy(() => import('../../pages/Student/Schedule/Component'));
const Class= lazy(() => import('../../pages/Student/Class/Container'));
const Lesson= lazy(() => import('../../pages/Student/Class/Page/DetailSubject'));
const Quiz= lazy(() => import('../../pages/Student/Quiz/Component'));
const Discussion = lazy(() => import('../../pages/Student/Discussions/Component'));
const DetailPost = lazy(() => import('../../pages/Student/Discussions/Page/DetailPost'));




export default [
	{
		path: '/student/dashboard',
		key: '/student/dashboard',
		icon: 'dashboard',
		title: 'Dashboard',
		component: Dashboard,
		exact: true,
		isMenu: true,
		isMobile: false,
		isFirst:true,
	},
	{
		path: '/student/dashboard/lop-hoc/:ID',
		key: '/student/dashboard/lop-hoc/:ID',
		icon: 'tool',
		title: 'Lớp Học',
		component: Class,
		exact: true,
		isMenu: false,
		isMobile: false,
		isFirst:false,
	},
	{
		path: '/student/dashboard/mon-hoc/:ID',
		key: '/student/dashboard/mon-hoc/:ID',
		icon: 'tool',
		title: 'Chi Tiết Môn Học',
		component: Lesson,
		exact: true,
		isMenu: false,
		isMobile: false,
		isFirst:false,
	},
	{
		path: '/student/dashboard/lich',
		key: '/student/dashboard/lich',
		icon: 'tool',
		title: 'Lịch Thi',
		component: Schedule,
		exact: true,
		isMenu: false,
		isMobile: false,
		isFirst:false,
	},
	{
		path: '/student/dashboard/thao-luan',
		key: '/student/dashboard/thao-luan',
		icon: 'tool',
		title: 'Thảo Luận',
		component: Discussion,
		exact: true,
		isMenu: false,
		isMobile: false,
		isFirst:false,
	},
	{
		path: '/student/dashboard/thao-luan/:ID',
		key: '/student/dashboard/thao-luan/:ID',
		icon: 'tool',
		title: 'Thảo Luận',
		component: DetailPost,
		exact: true,
		isMenu: false,
		isMobile: false,
		isFirst:false,
	},
	{
		path: '/student/dashboard/thiet-lap',
		key: '/student/dashboard/thiet-lap',
		icon: 'tool',
		title: 'Thiết Lập',
		component: AccountSetting,
		exact: true,
		isMenu: false,
		isMobile: false,
		isFirst:false,
	},
	{
		path: '/student/dashboard/quiz/:ID',
		key: '/student/dashboard/quiz/:ID',
		icon: 'tool',
		title: 'Phong thi',
		component: Quiz,
		exact: true,
		isMenu: false,
		isMobile: false,
		isFirst:false,
	},
];
