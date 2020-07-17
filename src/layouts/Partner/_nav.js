import {lazy} from 'react';

const Dashboard= lazy(() => import('../../pages/Partner/Dashboard/Container'));
const ProfileUserComponent= lazy(() => import('../../pages/Profile/Container'));
const CreateStudent= lazy(() => import('../../pages/Partner/CreateStudent/Container'));
const DetailStudent= lazy(() => import('../../pages/Partner/DetailStudent/Container'));
const SettingAccount= lazy(() => import('../../pages/Partner/SettingAccount/Component'));


export default [
	{
		path: ['/partner/dashboard', '/partner'],
		key: '/partner/dashboard',
		icon: 'dashboard',
		title: 'Dashboard',
		component: Dashboard,
		exact: true,
		isMenu: true,
		isMobile: false,
	},
	{
		path: '/partner/dashboard/them',
		key: '/partner/dashboard/them',
		icon: 'user',
		title: 'Thêm Học Viên',
		component: CreateStudent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/partner/dashboard/hoc-vien/:ID',
		key: '/partner/dashboard/hoc-vien/:ID',
		icon: 'user',
		title: 'Chi Tiết Học Viên',
		component: DetailStudent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/partner/thong-tin-tai-khoan',
		key: '/partner/thong-tin-tai-khoan',
		icon: 'dashboard',
		title: 'Thông tin tài khoản',
		component: ProfileUserComponent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/partner/hoi-dap',
		key: '/partner/hoi-dap',
		icon: 'tool',
		title: 'Hỏi Đáp',
		component: Dashboard,
		exact: true,
		isMenu: true,
		isMobile: false,
	},
	{
		path: '/partner/dashboard/tai-khoan',
		key: '/partner/dashboard/tai-khoan',
		icon: 'tool',
		title: 'Hỏi Đáp',
		component: SettingAccount,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
];
