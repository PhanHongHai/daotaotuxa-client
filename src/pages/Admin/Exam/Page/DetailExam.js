import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Card, Button, Spin, Modal, BackTop } from 'antd';

import customMessage from '../../../../utils/customMessage';
import randomSort from '../../../../utils/randomSort';
import ExamAction from '../Action';
import BreadCrumb from '../../../../components/BreadCrumb';
import LoadingCustom from '../../../../components/LoadingCustom';
import QuestionList from '../Component/QuestionList';
import ModalPickQuestion from '../Component/ModalPickQuestion';
import ModalAuth from '../../../../components/ModalAuth';

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
	{
		icon: 'reconciliation',
		path: '/admin/quan-ly-de-thi',
		text: 'Quản lý đề thi',
	},
];

const { confirm } = Modal;

function DetailExam(props) {
	const {
		getDetailExamStatus,
		updateExamStatus,
		removeExamStatus,
		authPasswordStatus,
		authPasswordReq,
		getDetailExamReq,
		updateExamReq,
		removeExamReq,
		detailExam,
	} = props;

	const { ID } = useParams();
	const history = useHistory();

	useEffect(() => {
		getDetailExamReq({
			ID,
		});
	}, [ID]);

	const [visiblePickQuestions, setVisiblePickQuestions] = useState(false);
	const [visibleModalAuth, setVisibleModalAuth] = useState(false);
	const [isShowAnswer, setIsShowAnswer] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const loadingGetDetail = getDetailExamStatus === 'FETCHING';
	const loadingAuthPassword = authPasswordStatus === 'FETCHING';
	const loadingUpdateExam = updateExamStatus === 'FETCHING';
	const loadingRemoveExam = removeExamStatus === 'FETCHING';

	const handleRemoveExam = () => {
		confirm({
			title: 'Bạn có muốn xóa đề thi này ?',
			onOk() {
				removeExamReq({
					ID,
					cb: res => {
						if (res.isDeleted) {
							history.push('/admin/quan-ly-de-thi');
							customMessage('notification', 'success', res.msg);
						}
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};
	const sortAndUpdateQuestion = async arr =>{
		const arrSorted= await randomSort(arr);
		updateExamReq({
			req:{
				questions:arrSorted
			},
			ID,
			cb: res => {
				if (res && res.isUpdated) {
					customMessage('notification', 'success', 'Sắp xếp câu hỏi thành công');
				}
			},
		});
	};
	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="none" visible={false} pageCurrentText="Chi Tiết Đề Thi" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row>
					<Col span={24}>
						<Card
							title="Thao tác đề thi"
							className="phh-card card-body-transparent"
							extra={
								<span className="group-btn">
									{isUpdate ? (
										<Button type="primary" icon="edit" onClick={() => setIsUpdate(false)}>
											Hủy cập nhật
										</Button>
									) : (
										<Button type="primary" icon="edit" onClick={() => setIsUpdate(true)}>
											Cập nhật
										</Button>
									)}

									<Button
										icon="plus"
										onClick={() => {
											setIsUpdate(false);
											setVisiblePickQuestions(true);
										}}
									>
										Thêm câu hỏi
									</Button>
									<Button icon="plus" className="ml-5">
										Thêm câu hỏi tự động
									</Button>
									{isShowAnswer ? (
										<Button icon="eye" className="ml-5" onClick={() => setIsShowAnswer(false)}>
											Ẩn thị đáp án
										</Button>
									) : (
										<Button icon="eye" className="ml-5" onClick={() => setVisibleModalAuth(true)}>
											Hiển thị đáp án
										</Button>
									)}

									<Button icon="retweet" className="ml-5" onClick={() => sortAndUpdateQuestion(detailExam && detailExam.questions)}>
										Trộn câu hỏi
									</Button>
									<Button loading={loadingRemoveExam} icon="delete" className="ml-5" onClick={handleRemoveExam}>
										Xóa
									</Button>
								</span>
							}
						/>

						<div>
							<Spin spinning={loadingGetDetail} indicator={<LoadingCustom margin={10} />}>
								<QuestionList
									data={detailExam}
									isShowAnswer={isShowAnswer}
									loadingUpdate={loadingUpdateExam}
									updateReq={updateExamReq}
									isUpdate={isUpdate}
								/>
							</Spin>
						</div>
					</Col>
				</Row>
			</div>
			<ModalPickQuestion
				visible={visiblePickQuestions}
				setVisible={setVisiblePickQuestions}
				updateExamReq={updateExamReq}
				examData={detailExam}
				loadingUpdate={loadingUpdateExam}
			/>
			<ModalAuth
				visible={visibleModalAuth}
				setVisible={setVisibleModalAuth}
				setCheck={setIsShowAnswer}
				authPasswordReq={authPasswordReq}
				loading={loadingAuthPassword}
			/>
			<BackTop />
		</div>
	);
}

DetailExam.propTypes = {
	getDetailExamStatus: PropTypes.string.isRequired,
	updateExamStatus: PropTypes.string.isRequired,
	removeExamStatus: PropTypes.string.isRequired,
	authPasswordStatus: PropTypes.string.isRequired,
	authPasswordReq: PropTypes.func.isRequired,
	getDetailExamReq: PropTypes.func.isRequired,
	updateExamReq: PropTypes.func.isRequired,
	removeExamReq: PropTypes.func.isRequired,
	detailExam: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
	getDetailExamStatus: state.examPage.getDetailExamStatus,
	updateExamStatus: state.examPage.updateExamStatus,
	removeExamStatus: state.examPage.removeExamStatus,
	authPasswordStatus: state.examPage.authPasswordStatus,
	detailExam: state.examPage.detailExam,
});

const mapDispatchToProps = {
	authPasswordReq: ExamAction.authPasswordExamRequest,
	getDetailExamReq: ExamAction.getDetailExamRequest,
	updateExamReq: ExamAction.updateExamRequest,
	removeExamReq: ExamAction.removeDetailExamRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailExam);
