import { combineReducers } from 'redux';

import LoginReducer from '../pages/Login/Reducer';
import ActiveReducer from '../pages/ActiveAccount/Reducer';
import ForgotPasswordReducer from '../pages/ForgotPassword/Reducer';
import ResetPasswordReducer from '../pages/ResetPassword/Reducer';
// admin
import AccountReducer from '../pages/Admin/Account/Reducer';
import SettingReducer from '../pages/Admin/Setting/Reducer';
import TrainingSectorReducer from '../pages/Admin/TrainingSector/Reducer';
import ProfileAccountReducer from '../pages/Profile/Reducer';
import ClassReducer from '../pages/Admin/Class/Reducer';
import SubjectReducer from '../pages/Admin/Subject/Reducer';
import DashboardReducer from '../pages/Admin/Dashboard/Reducer';
import QuestionReducer from '../pages/Admin/Questions/Reducer';
import ExamReducer from '../pages/Admin/Exam/Reducer';
import ScheduleReducer from '../pages/Admin/Schedule/Reducer';
// partner
import PartnerDashboardReducer from '../pages/Partner/Dashboard/Reducer';
// student
import LoginStudentReducer from '../pages/Student/Login/Reducer';
import DashboardStudentReducer from '../pages/Student/Dashboard/Reducer';
import ClassStudentReducer from '../pages/Student/Class/Reducer';
import QuizStudentReducer from '../pages/Student/Quiz/Reducer';
// teacher
import DashboardTeacherReducer from '../pages/Teacher/Dashboard/Reducer';
import ClassTeacherReducer from '../pages/Teacher/Class/Reducer';
import StudentTeacherReducer from '../pages/Teacher/Students/Reducer';
import SubjectTeacherReducer from '../pages/Teacher/Subject/Reducer';
import QuestionTeacherReducer from '../pages/Teacher/Questions/Reducer';
import ExamTeacherReducer from '../pages/Teacher/Exam/Reducer';

const appReducer = combineReducers({
	...LoginReducer,
	...AccountReducer,
	...SettingReducer,
	...ActiveReducer,
	...ForgotPasswordReducer,
	...ResetPasswordReducer,
	...TrainingSectorReducer,
	...QuestionReducer,
	...ExamReducer,
	...ScheduleReducer,
	...ProfileAccountReducer,
	...DashboardReducer,
	...ClassReducer,
	...PartnerDashboardReducer,
	...SubjectReducer,
	...DashboardStudentReducer,
	...ClassStudentReducer,
	...DashboardTeacherReducer,
	...ClassTeacherReducer,
	...StudentTeacherReducer,
	...SubjectTeacherReducer,
	...QuestionTeacherReducer,
	...ExamTeacherReducer,
	...LoginStudentReducer,
	...QuizStudentReducer
});

const intialReducer = appReducer({}, {});

const rootReducer = (state, action) => {
	if (action.type === 'LOGOUT') {
		// eslint-disable-next-line no-param-reassign
		state = intialReducer;
	}

	return appReducer(state, action);
};

export default rootReducer;
