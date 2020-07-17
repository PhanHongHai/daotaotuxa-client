import LoginSaga from '../pages/Login/Saga';
import ActiveSaga from '../pages/ActiveAccount/Saga';
import ForgotPasswordSaga from '../pages/ForgotPassword/Saga';
import ResetPasswordSaga from '../pages/ResetPassword/Saga';
import ProfileAccountSaga from '../pages/Profile/Saga';
// admin
import AccountSaga from '../pages/Admin/Account/Saga';
import SettingSaga from '../pages/Admin/Setting/Saga';
import TrainingSectorSaga from '../pages/Admin/TrainingSector/Saga';
import ClassSaga from '../pages/Admin/Class/Saga';
import SubjectSaga from '../pages/Admin/Subject/Saga';
import DashboardSaga from '../pages/Admin/Dashboard/Saga';
import QuestionSaga from '../pages/Admin/Questions/Saga';
import ExamSaga from '../pages/Admin/Exam/Saga';
import ScheduleSaga from '../pages/Admin/Schedule/Saga';
// partner
import PartnerDashboardSaga from '../pages/Partner/Dashboard/Saga';
// student
import DashboardStudentSaga from '../pages/Student/Dashboard/Saga';
import ClassStudentSaga from '../pages/Student/Class/Saga';
// teacher
import DashboardTeacherSaga from '../pages/Teacher/Dashboard/Saga';
import ClassTeacherSaga from '../pages/Teacher/Class/Saga';
import StudentTeacherSaga from '../pages/Teacher/Students/Saga';
import SubjectTeacherSaga from '../pages/Teacher/Subject/Saga';
import QuestionTeacherSaga from '../pages/Teacher/Questions/Saga';
import ExamTeacherSaga from '../pages/Teacher/Exam/Saga';

export default [
	...LoginSaga,
	...AccountSaga,
	...SettingSaga,
	...ActiveSaga,
	...ForgotPasswordSaga,
	...ResetPasswordSaga,
	...TrainingSectorSaga,
	...QuestionSaga,
	...ExamSaga,
	...ScheduleSaga,
	...ProfileAccountSaga,
	...ClassSaga,
	...PartnerDashboardSaga,
	...SubjectSaga,
	...DashboardStudentSaga,
	...ClassStudentSaga,
	...DashboardTeacherSaga,
	...ClassTeacherSaga,
	...DashboardSaga,
	...StudentTeacherSaga,
	...SubjectTeacherSaga,
	...QuestionTeacherSaga,
	...ExamTeacherSaga
];
