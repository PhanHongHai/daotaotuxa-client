import React, { useState, useEffect } from 'react';
import { Result, Button, BackTop, Icon, Spin, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/vi';

import IconQuiz from '../../../assets/images/test.jpg';

import FrameQuestion from './Component/FrameQuestion';
import SideBarTime from './Component/SideBarTime';
import ResuleQuizStyle from './Component/ResuleQuiz';
import LoadingCustom from '../../../components/LoadingCustom';

import { NotiStyle, QuizStyle } from './styled';

moment.locale('vi');

function QuizComponent(props) {
	const {
		getScheduleDetailStatus,
		submitTaskStatus,
		getScheduleDetailReq,
		submitTaskReq,
		scheduleDetail,
		getExamByQuizStatus,
		examDetail,
		getExamReq,
		resultTask,
	} = props;

	const [isStart, setIsStart] = useState(false);
	const [isShowResult, setIsShowResult] = useState(false);
	const [dataChoice, setDataChoice] = useState([]);
	const { classID, scheduleID } = useParams();

	useEffect(() => {
		getScheduleDetailReq({ ID:scheduleID });
	}, [scheduleID]);

	const loadingGetScheduleDetail = getScheduleDetailStatus === 'FETCHING';
	const loadingGetExam = getExamByQuizStatus === 'FETCHING';
	const loadingSubmitTask = submitTaskStatus === 'FETCHING';

	const renderQuestions = id => {
		getExamReq({ ID: id });
		setIsStart(true);
	};
	const handleSubmitTask = () => {
		submitTaskReq({
			req: {
				scheduleID,
				classID,
				examID: scheduleDetail.examID && scheduleDetail.examID._id,
				subjectID: scheduleDetail.subjectID && scheduleDetail.subjectID._id,
				answers: dataChoice,
			},
			cb: res => {
				if (res && res.isSubmited) {
					setIsShowResult(true);
				}
			},
		});
	};
	const renderButtonEvent = data => {
		if (moment(data.dayAt).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')) {
			const timeEnd = moment(data.timeAt).add(data.timeRange, 'minute');
			const hourTimeAt = moment(data.timeAt).hour();
			const minuteTimeAt = moment(data.timeAt).minute();
			const hourTimeEnd = moment(timeEnd, 'HH:mm').hour();
			const minuteTimeEnd = moment(timeEnd, 'HH:mm').minute();
			const hourCurrent = moment().hour();
			const minuteCurrent = moment().minute();
			if (hourCurrent >= hourTimeAt && hourCurrent < hourTimeEnd) {
				if (minuteCurrent >= minuteTimeAt)
					return (
						<Button
							loading={loadingGetExam}
							onClick={() => renderQuestions(scheduleDetail.examID && scheduleDetail.examID._id)}
							className="btn"
						>
							Bắt đầu
						</Button>
					);
			} else if (hourCurrent === hourTimeEnd) {
				if (minuteCurrent <= minuteTimeEnd) {
					return (
						<Button
							loading={loadingGetExam}
							onClick={() => renderQuestions(scheduleDetail.examID && scheduleDetail.examID._id)}
							className="btn"
						>
							Bắt đầu
						</Button>
					);
				}
			}
		}
		return (
			<Button className="btn" disabled>
				Đang đóng
			</Button>
		);
	};
	const renderContent = () => {
		if (isStart && !isShowResult) {
			return (
				<div className="quiz-content">
					<div className="quiz-exam">
						<FrameQuestion
							loading={loadingGetExam}
							data={examDetail && examDetail.questions}
							setDataChoice={setDataChoice}
							dataChoice={dataChoice}
							submitTaskReq={handleSubmitTask}
							loadingSubmitTask={loadingSubmitTask}
						/>
						<BackTop />
					</div>
					<div className="quiz-info">
						<SideBarTime
							loading={loadingGetScheduleDetail}
							data={scheduleDetail}
							submitTaskReq={handleSubmitTask}
							loadingSubmitTask={loadingSubmitTask}
						/>
					</div>
				</div>
			);
		}
		if (isShowResult) {
			return <ResuleQuizStyle info={scheduleDetail} result={resultTask} />;
		}

		return (
			<NotiStyle className="mt-25">
				<Spin spinning={loadingGetScheduleDetail} indicator={<LoadingCustom margin={10} />}>
					<Result
						icon={<img width="250" src={IconQuiz} alt="kiem tra" />}
						title="Kiểm tra giữa kỳ"
						extra={
							<div>
								<ul>
									<li>
										<Icon type="book" /> &ensp;Mã môn học :{' '}
										<Tag style={{ fontSize: 14 }}>#{scheduleDetail.subjectID && scheduleDetail.subjectID.tag}</Tag>
									</li>
									<li>
										<Icon type="book" /> &ensp; Môn học :{scheduleDetail.subjectID && scheduleDetail.subjectID.name}
									</li>
									<li>
										<Icon type="question-circle" /> &ensp;Số câu hỏi :&ensp;
										{scheduleDetail.examID && scheduleDetail.examID.questions.length}
									</li>
									<li>
										<Icon type="calendar" />
										&ensp;Ngày thi:&ensp;{scheduleDetail && moment(scheduleDetail.dayAt).format('DD-MM-YYYY')}
									</li>
									<li>
										<Icon type="hourglass" />
										&ensp;Thời gian thi :&ensp;{scheduleDetail && moment(scheduleDetail.timeAt).format('HH:mm')} (thời
										gian làm {scheduleDetail && scheduleDetail.timeRange} phút)
									</li>
								</ul>

								{renderButtonEvent(scheduleDetail)}
							</div>
						}
					/>
				</Spin>
			</NotiStyle>
		);
	};

	return <QuizStyle>{renderContent()}</QuizStyle>;
}

QuizComponent.propTypes = {
	getScheduleDetailStatus: PropTypes.string.isRequired,
	submitTaskStatus: PropTypes.string.isRequired,
	getExamByQuizStatus: PropTypes.string.isRequired,
	getScheduleDetailReq: PropTypes.func.isRequired,
	getExamReq: PropTypes.func.isRequired,
	submitTaskReq: PropTypes.func.isRequired,
	scheduleDetail: PropTypes.objectOf(PropTypes.any).isRequired,
	examDetail: PropTypes.objectOf(PropTypes.any).isRequired,
	resultTask: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default QuizComponent;
