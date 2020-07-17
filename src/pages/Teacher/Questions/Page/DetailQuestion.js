import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Card, Spin, Modal } from 'antd';
import PropTypes from 'prop-types';

import QuestionAction from '../Action';
import BreadCrumb from '../../../../components/BreadCrumb';
import FormEditQuestion from '../Component/FormEditQuestion';
import LoadingCustom from '../../../../components/LoadingCustom';
import customMess from '../../../../utils/customMessage';

const breadcrumb = [
	{
		icon: 'home',
		path: '/teacher/dashboard',
		text: '',
	},
	{
		icon: 'question',
		path: '/teacher/dashboard/ngan-hang-cau-hoi',
		text: 'Ngân hàng câu hỏi',
	},
];
const {confirm} = Modal;

function DetailQuestion(props) {
	const {
		updateQuestionStatus,
		getDetailQuestionStatus,
		detailQuestion,
		getDetailQuestionReq,
		updateQuestionReq,
		getSubjectsForQuestionStatus,
		removeQuestionStatus,
		getSubjectsForQuestionReq,
		removeQuestionReq,
		subjects,
	} = props;

	const { ID } = useParams();

	const history = useHistory();

	useEffect(() => {
		getDetailQuestionReq({ ID });
		getSubjectsForQuestionReq({});
	}, [getDetailQuestionReq, getSubjectsForQuestionReq]);

	const loadingGetDetail = getDetailQuestionStatus === 'FETCHING';
	const loadingUpdateQuestion = updateQuestionStatus === 'FETCHING';
	const loadingGetSubjectQuestion = getSubjectsForQuestionStatus === 'FETCHING';
	const loadingRemoveQuestion = removeQuestionStatus === 'FETCHING';

	const handleRemoveQuestion = () => {
		confirm({
			title: 'Bạn có muốn xóa câu hỏi này ?',
			onOk() {
				removeQuestionReq({
					ID,
					cb: res => {
						if (res.isDeleted){
							history.push('/admin/ngan-hang-cau-hoi');
							customMess('notification', 'success', res.msg);
						}
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};

	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="none" visible={false} pageCurrentText="Chi tiết câu hỏi" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row>
					<Col span={24}>
						<Card className="phh-card">
							<Spin spinning={loadingGetDetail} indicator={<LoadingCustom margin={0} />}>
								<FormEditQuestion
									updateQuestionReq={updateQuestionReq}
									loadingSubjectsForQuestion={loadingGetSubjectQuestion}
									info={detailQuestion}
									loadingUpdate={loadingUpdateQuestion}
									questionID={ID}
									subjects={subjects}
									loadingRemove={loadingRemoveQuestion}
									handleRemoveQuestion={handleRemoveQuestion}
								/>
							</Spin>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
}

DetailQuestion.propTypes = {
	updateQuestionStatus: PropTypes.string.isRequired,
	getDetailQuestionStatus: PropTypes.string.isRequired,
	getSubjectsForQuestionStatus: PropTypes.string.isRequired,
	removeQuestionStatus: PropTypes.string.isRequired,
	detailQuestion: PropTypes.objectOf(PropTypes.any).isRequired,
	subjects: PropTypes.objectOf(PropTypes.any).isRequired,
	getDetailQuestionReq: PropTypes.func.isRequired,
	getSubjectsForQuestionReq: PropTypes.func.isRequired,
	updateQuestionReq: PropTypes.func.isRequired,
	removeQuestionReq: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	updateQuestionStatus: state.questionPageTeacher.updateQuestionStatus,
	removeQuestionStatus: state.questionPageTeacher.removeQuestionStatus,
	getDetailQuestionStatus: state.questionPageTeacher.getDetailQuestionStatus,
	getSubjectsForQuestionStatus: state.questionPageTeacher.getSubjectsForQuestionStatus,
	detailQuestion: state.questionPageTeacher.detailQuestion,
	subjects: state.questionPageTeacher.subjects,
});

const mapDispatchToProps = {
	getDetailQuestionReq: QuestionAction.getDetailQuestionTeacherRequest,
	updateQuestionReq: QuestionAction.updateQuestionTeacherRequest,
	getSubjectsForQuestionReq: QuestionAction.getSubjectsForQuestionTeacherRequest,
	removeQuestionReq: QuestionAction.removeDetailQuestionTeacherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailQuestion);
