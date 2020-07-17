import { lazy } from 'react';

const Dashboard = lazy(() => import('../../pages/Admin/Dashboard/Container'));
const TeacherAccount = lazy(() => import('../../pages/Admin/Account/Page/TeacherAcc'));
const StudentAccount = lazy(() => import('../../pages/Admin/Account/Page/StudentAcc'));
const PartnerAccount = lazy(() => import('../../pages/Admin/Account/Page/PartnerAcc'));
const AnalyAccount = lazy(() => import('../../pages/Admin/Account/Page/AnalyAccount'));
const CreateStudent = lazy(() => import('../../pages/Admin/Account/Page/CreateStudent'));
const EditStudent = lazy(() => import('../../pages/Admin/Account/Page/EditStudent'));
const Setting = lazy(() => import('../../pages/Admin/Setting/Container'));
const Sector = lazy(() => import('../../pages/Admin/TrainingSector/Container'));
const Subject = lazy(() => import('../../pages/Admin/Subject/Container'));
const SubjectDetail = lazy(() => import('../../pages/Admin/Subject/Page/DetailSubject'));
const Schedule = lazy(() => import('../../pages/Admin/Schedule/Container'));
const CreateSchedule = lazy(() => import('../../pages/Admin/Schedule/Page/CreateSchedule'));
const DetailSchedule = lazy(() => import('../../pages/Admin/Schedule/Page/DetailSchedule'));
const ClassComponent = lazy(() => import('../../pages/Admin/Class/Container'));
const AnalyClassComponent = lazy(() => import('../../pages/Admin/Class/Page/AnalyClass'));
const DetailClassComponent = lazy(() => import('../../pages/Admin/Class/Page/DetailClass'));
const QuestionComponent = lazy(() => import('../../pages/Admin/Questions/Container'));
const CreateQuestionComponent = lazy(() => import('../../pages/Admin/Questions/Page/CreateQuestion'));
const DetailQuestionComponent = lazy(() => import('../../pages/Admin/Questions/Page/DetailQuestion'));
const ExamComponent = lazy(() => import('../../pages/Admin/Exam/Container'));
const DetailExamComponent = lazy(() => import('../../pages/Admin/Exam/Page/DetailExam'));
const CreateExamComponent = lazy(() => import('../../pages/Admin/Exam/Page/CreateExam'));
const ProfileUserComponent = lazy(() => import('../../pages/Profile/Container'));

export default [
	{
		path: ['/admin/dashboard', '/admin'],
		key: '/admin/dashboard',
		icon: 'dashboard',
		title: 'Dashboard',
		component: Dashboard,
		exact: true,
		isMenu: true,
		isMobile: false,
	},
	{
		path: '/admin/tai-khoan',
		key: '/admin/tai-khoan',
		icon: 'user',
		title: 'Quản lý tài khoản',
		component: Dashboard,
		exact: false,
		isMenu: true,
		isMobile: false,
		children: [
			{
				path: '/admin/tai-khoan/hoc-vien',
				key: '/admin/tai-khoan/hoc-vien',
				icon: 'user',
				title: 'Học Viên',
				component: StudentAccount,
				exact: true,
				isMenu: true,
				isMobile: true,
			},
			{
				path: '/admin/tai-khoan/giang-vien',
				key: '/admin/tai-khoan/giang-vien',
				icon: 'user',
				title: 'Giảng Viên',
				component: TeacherAccount,
				exact: true,
				isMenu: true,
				isMobile: true,
			},
			{
				path: '/admin/tai-khoan/doi-tac',
				key: '/admin/tai-khoan/doi-tac',
				icon: 'user',
				title: 'Đối tác',
				component: PartnerAccount,
				exact: true,
				isMenu: true,
				isMobile: true,
			},
			{
				path: '/admin/tai-khoan/thong-ke',
				key: '/admin/tai-khoan/thong-ke',
				icon: 'area-chart',
				title: 'Thống kê',
				component: AnalyAccount,
				exact: true,
				isMenu: true,
				isMobile: true,
			},
		],
	},
	{
		path: '/admin/tai-khoan/hoc-vien/them',
		key: '/admin/tai-khoan/hoc-vien/them',
		icon: 'project',
		title: 'Thêm mới học viên',
		component: CreateStudent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/tai-khoan/hoc-vien/chi-tiet/:ID',
		key: '/admin/tai-khoan/hoc-vien/chi-tiet/:ID',
		icon: 'project',
		title: 'Chi tiết học viên',
		component: EditStudent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/lop-hoc',
		key: '/admin/lop-hoc',
		icon: 'project',
		title: 'Quản lý lớp học',
		component: ClassComponent,
		exact: true,
		isMenu: true,
		isMobile: false,
	},

	{
		path: '/admin/lop-hoc/chi-tiet/:ID',
		key: '/admin/lop-hoc/chi-tiet/:ID',
		icon: 'dashboard',
		title: 'Chi tiết lớp học',
		component: DetailClassComponent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/lop-hoc/thong-ke',
		key: '/admin/lop-hoc/thong-ke',
		icon: 'dashboard',
		title: 'Thống kê lớp học',
		component: AnalyClassComponent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/nganh-dao-tao',
		key: '/admin/nganh-dao-tao',
		icon: 'book',
		title: 'Quản lý ngành đào tạo',
		component: Sector,
		exact: true,
		isMenu: true,
		isMobile: false,
	},
	{
		path: '/admin/mon-hoc',
		key: '/admin/mon-hoc',
		icon: 'folder-open',
		title: 'Quản lý môn học',
		component: Subject,
		exact: true,
		isMenu: true,
		isMobile: false,
	},
	{
		path: '/admin/mon-hoc/:ID',
		key: '/admin/mon-hoc/:ID',
		icon: 'folder-open',
		title: 'Chi tiết môn học',
		component: SubjectDetail,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/thong-tin-tai-khoan',
		key: '/admin/thong-tin-tai-khoan',
		icon: 'dashboard',
		title: 'Thông tin tài khoản',
		component: ProfileUserComponent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/lich-thi',
		key: '/admin/lich-thi',
		icon: 'calendar',
		title: 'Lịch thi',
		component: Schedule,
		exact: true,
		isMenu: true,
		isMobile: false,
	},
	{
		path: '/admin/lich-thi/them-moi',
		key: '/admin/lich-thi/them-moi',
		icon: 'calendar',
		title: 'Tạo Lịch thi',
		component: CreateSchedule,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/lich-thi/chi-tiet/:ID',
		key: '/admin/lich-thi/chi-tiet/:ID',
		icon: 'calendar',
		title: 'Chi Tiết Lịch thi',
		component: DetailSchedule,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/ngan-hang-cau-hoi',
		key: '/admin/ngan-hang-cau-hoi',
		icon: 'question-circle',
		title: 'Ngân Hàng Câu Hỏi',
		component: QuestionComponent,
		exact: true,
		isMenu: true,
		isMobile: false,
	},
	{
		path: '/admin/ngan-hang-cau-hoi/them-cau-hoi',
		key: '/admin/ngan-hang-cau-hoi/them-cau-hoi',
		icon: 'question-circle',
		title: 'Thêm mới câu hỏi',
		component: CreateQuestionComponent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/ngan-hang-cau-hoi/chi-tiet/:ID',
		key: '/admin/ngan-hang-cau-hoi/chi-tiet/:ID',
		icon: 'question-circle',
		title: 'Chi tiết câu hỏi',
		component: DetailQuestionComponent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/quan-ly-de-thi',
		key: '/admin/quan-ly-de-thi',
		icon: 'reconciliation',
		title: 'Quản lý đề thi',
		component: ExamComponent,
		exact: true,
		isMenu: true,
		isMobile: false,
	},
	{
		path: '/admin/quan-ly-de-thi/chi-tiet/:ID',
		key: '/admin/quan-ly-de-thi/chi-tiet/:ID',
		icon: 'question-circle',
		title: 'Chi tiết đề thi',
		component: DetailExamComponent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/quan-ly-de-thi/them-de-thi',
		key: '/admin/quan-ly-de-thi/them-de-thi',
		icon: 'question-circle',
		title: 'Thêm mới đề thi',
		component: CreateExamComponent,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/ho-tro',
		key: '/admin/ho-tro',
		icon: 'tool',
		title: 'Hỗ trợ',
		component: Setting,
		exact: true,
		isMenu: false,
		isMobile: false,
	},
	{
		path: '/admin/thiet-lap',
		key: '/admin/thiet-lap',
		icon: 'tool',
		title: 'Thiết lập',
		component: Setting,
		exact: true,
		isMenu: true,
		isMobile: false,
	},
];
