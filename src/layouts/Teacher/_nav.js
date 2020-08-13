import { lazy } from 'react';

const Dashboard = lazy(() => import('../../pages/Teacher/Dashboard/Container'));
const ProfileUserComponent = lazy(() => import('../../pages/Teacher/InfoAccount/Container'));
const ClassDetail = lazy(() => import('../../pages/Teacher/Class/Container'));
const StudentDetail = lazy(() => import('../../pages/Teacher/Students/Container'));
const SubjectDetail = lazy(() => import('../../pages/Teacher/Subject/Container'));
const Question = lazy(() => import('../../pages/Teacher/Questions/Container'));
const CreateQuestion = lazy(() => import('../../pages/Teacher/Questions/Page/CreateQuestion'));
const DetailQuestion = lazy(() => import('../../pages/Teacher/Questions/Page/DetailQuestion'));
const Exams = lazy(() => import('../../pages/Teacher/Exam/Container'));
const CreateExam = lazy(() => import('../../pages/Teacher/Exam/Page/CreateExam'));
const DetailExam = lazy(() => import('../../pages/Teacher/Exam/Page/DetailExam'));

export default [
	{
		path: ['/teacher/dashboard', '/teacher'],
		key: '/teacher/dashboard',
		icon: 'dashboard',
		title: 'Dashboard',
		component: Dashboard,
		exact: true,
		isMenu: true,
		isMobile: false,
	},

	{
		path: '/teacher/dashboard/thong-tin-tai-khoan',
		key: '/teacher/dashboard/thong-tin-tai-khoan',
		icon: 'dashboard',
		title: 'Thông tin tài khoản',
		component: ProfileUserComponent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},

	{
		path: '/teacher/dashboard/lop-hoc/:ID',
		key: '/teacher/dashboard/lop-hoc/:ID',
		icon: 'dashboard',
		title: 'Thông tin lớp học',
		component: ClassDetail,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/teacher/dashboard/hoc-vien/:classID/:studentID',
		key: '/teacher/dashboard/hoc-vien/:classID/:studentID',
		icon: 'dashboard',
		title: 'Thông tin học viên',
		component: StudentDetail,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/teacher/dashboard/mon-hoc/:classID/:subjectID',
		key: '/teacher/dashboard/mon-hoc/:classID/:subjectID',
		icon: 'dashboard',
		title: 'Thông tin môn học',
		component: SubjectDetail,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	// {
	// 	path: '/teacher/dashboard/de-thi',
	// 	key: '/teacher/dashboard/de-thi',
	// 	icon: 'reconciliation',
	// 	title: 'Đề Thi',
	// 	component: Exams,
	// 	exact: true,
	// 	isMenu: true,
	// 	isMobile: false,
	// },
	// {
	// 	path: '/teacher/dashboard/de-thi/them-de-thi',
	// 	key: '/teacher/dashboard/de-thi/them-de-thi',
	// 	icon: 'reconciliation',
	// 	title: 'Thêm Mới Đề Thi',
	// 	component: CreateExam,
	// 	exact: true,
	// 	isMenu: false,
	// 	isMobile: false,
	// },
	// {
	// 	path: '/teacher/dashboard/de-thi/:ID',
	// 	key: '/teacher/dashboard/de-thi/:ID',
	// 	icon: 'reconciliation',
	// 	title: 'Chi Tiết Đề Thi',
	// 	component: DetailExam,
	// 	exact: true,
	// 	isMenu: false,
	// 	isMobile: false,
	// },
	{
		key: '/teacher/dashboard/ngan-hang-cau-hoi',
		path: '/teacher/dashboard/ngan-hang-cau-hoi',
		icon: 'question-circle',
		title: 'Câu Hỏi',
		component: Question,
		exact: true,
		isMenu: true,
		isMobile: false,
	},
	{
		key: '/teacher/dashboard/ngan-hang-cau-hoi/chi-tiet/:ID',
		path: '/teacher/dashboard/ngan-hang-cau-hoi/chi-tiet/:ID',
		icon: 'question-circle',
		title: 'Chi Tiết Câu Hỏi',
		component: DetailQuestion,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		key: '/teacher/dashboard/ngan-hang-cau-hoi/them-cau-hoi',
		path: '/teacher/dashboard/ngan-hang-cau-hoi/them-cau-hoi',
		icon: 'question-circle',
		title: 'Thêm Mới Câu Hỏi',
		component: CreateQuestion,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
];
