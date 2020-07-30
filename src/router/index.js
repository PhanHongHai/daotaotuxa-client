import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Result } from 'antd';

import AuthorizedRoute from '../utils/authorized';
import LoadingCustom from '../components/LoadingCustom';

// import Bg404 from '../assets/images/404.png';

const AdminLayout = lazy(() => import('../layouts/Admin'));
const PartnerLayout = lazy(() => import('../layouts/Partner'));
const TeacherLayout = lazy(() => import('../layouts/Teacher'));
const StudentLayout = lazy(() => import('../layouts/Student'));
const LearningLayout = lazy(() => import('../layouts/Learn'));
const QuizLayout = lazy(() => import('../layouts/Quiz'));
const LoginPage = lazy(() => import('../pages/Login/Container'));
const LoginStudent = lazy(() => import('../pages/Student/Login/Container'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword/Container'));
const ResetPassword = lazy(() => import('../pages/ResetPassword/Container'));
const ActiveAccount = lazy(() => import('../pages/ActiveAccount/Container'));

export default function App() {
	const noMatchRoute = () => <Result status="404" title="404" subTitle="Trang này không tồn tại hoặc không khả dụng" />;

	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingCustom margin={20} />}>
				<Switch>
					<AuthorizedRoute authority={false} type="none" exact path={['/hoc-vien', '/']} component={LoginStudent} />
					<AuthorizedRoute authority={false} type="none" exact path='/dang-nhap' component={LoginPage} />
					<AuthorizedRoute
						authority={false}
						type="none"
						exact
						path="/active-account/:tokenActive"
						component={ActiveAccount}
					/>
					<AuthorizedRoute authority={false} type="none" exact path="/forgot-password" component={ForgotPassword} />
					<AuthorizedRoute
						authority={false}
						type="none"
						exact
						path="/reset-password/:tokenReset"
						component={ResetPassword}
					/>
					<AuthorizedRoute authority type="student" path="/learn" component={LearningLayout} />
					<AuthorizedRoute authority type="student" path="/quiz" component={QuizLayout} />
					<AuthorizedRoute
						authority
						type="student"
						path={['/student/dashboard', '/student']}
						component={StudentLayout}
					/>
					<AuthorizedRoute authority type="admin" path={['/admin/dashboard', '/admin']} component={AdminLayout} />
					<AuthorizedRoute authority type="teacher" path="/teacher/dashboard" component={TeacherLayout} />
					<AuthorizedRoute authority type="partner" path="/partner/dashboard" component={PartnerLayout} />
					<Route path="" component={noMatchRoute} />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
}
