import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Tooltip, Input, Checkbox, Modal } from 'antd';
import _ from 'lodash';

import { ExamViewStyle } from '../styled';
import customMessage from '../../../../utils/customMessage';

const { confirm } = Modal;

function QuestionList(props) {
	const { data, isShowAnswer, isUpdate, updateReq, loadingUpdate } = props;
	const [isShowEditTitle, setIsShowEditTitle] = useState(false);
	const [titleValue, setTitleValue] = useState(null);
	const [questionDelete, setQuestionDelete] = useState([]);
	const handleChoseDelete = (e, questionID) => {
		const { checked } = e.target;
		const arrTemp = questionDelete;
		const arrResult = data.questions && data.questions.length > 0 ? [...data.questions] : [];
		if (checked) {
			const existID = arrTemp.find(ele => ele === questionID);
			if (!existID) arrTemp.push(questionID);
		} else {
			_.remove(arrTemp, ele => ele === questionID);
		}
		arrTemp.forEach(ele => {
			_.remove(arrResult, item => ele === item._id);
		});
		setQuestionDelete(arrResult);
	};
	const renderQuestion = examData => {
		return examData.map((item, index) => {
			return (
				<div className="exam-item">
					<h3>
						{index + 1}.&ensp;
						<span className="text" dangerouslySetInnerHTML={{ __html: item.content }} />
						{isUpdate ? (
							<Tooltip title="Xóa câu hỏi">
								<Checkbox className="ml-10" onChange={e => handleChoseDelete(e, item._id)} />
							</Tooltip>
						) : (
							''
						)}
					</h3>
					<ul>
						<li className={isShowAnswer && item.answer === 'A' ? 'answer' : null}>
							<p className="symbol">A</p>.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerA }} />
						</li>
						<li className={isShowAnswer && item.answer === 'B' ? 'answer' : null}>
							<p className="symbol">B</p>.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerB }} />
						</li>
						<li className={isShowAnswer && item.answer === 'C' ? 'answer' : null}>
							<p className="symbol">C</p>.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerC }} />
						</li>
						<li className={isShowAnswer && item.answer === 'D' ? 'answer' : null}>
							<p className="symbol">D</p>.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerD }} />
						</li>
					</ul>
				</div>
			);
		});
	};
	const onChangeTitle = e => setTitleValue(e.target.value);
	const handleChangeTitle = () => {
		if (!titleValue) customMessage('message', 'error', 'Không được để trống tiêu đề');
		updateReq({
			req: {
				title: titleValue,
			},
			ID: data && data._id,
			cb: res => {
				if (res && res.isUpdated) {
					setTitleValue(null);
					setIsShowEditTitle(false);
					customMessage('notification', 'success', res.msg);
				}
			},
		});
	};
	const handleDeleteQuestions = () => {
		if (questionDelete && questionDelete.length < 1) customMessage('message', 'info', 'Không có câu hỏi nào để xóa');
		else
			confirm({
				title: 'Bạn có muốn xóa những câu hỏi này ?',
				onOk() {
					updateReq({
						req: {
							questions: questionDelete,
						},
						ID: data && data._id,
						cb: res => {
							if (res && res.isUpdated) {
								setQuestionDelete([]);
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
	const handleDeleteAllQuestion = () => {
		confirm({
			title: 'Bạn có muốn xóa tất cả câu hỏi ?',
			onOk() {
				updateReq({
					req: {
						questions: [],
					},
					ID: data && data._id,
					cb: res => {
						if (res && res.isUpdated) {
							setQuestionDelete([]);
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

	return (
		<ExamViewStyle>
			<div className="exam-header">
				{isShowEditTitle ? (
					<div className="exam-header-edit">
						<Input onChange={onChangeTitle} placeholder="Nhập tiêu đề" defaultValue={data && data.title} />
						<span className="group">
							<Tooltip title="Xác nhận">
								<Button className="btn-edit" icon="check" loading={loadingUpdate} onClick={handleChangeTitle} />
							</Tooltip>
							<Tooltip title="Hủy">
								<Button
									className="btn-edit"
									icon="close"
									onClick={() => {
										setIsShowEditTitle(false);
										setTitleValue(null);
									}}
								/>
							</Tooltip>
						</span>
					</div>
				) : (
					<>
						<Typography.Title
							level={3}
							style={{ textAlign: 'center', textTransform: 'capitalize', textDecoration: 'underline' }}
						>
							{data && data.title}
						</Typography.Title>
						{isUpdate ? (
							<Tooltip title="Cập nhật tiêu đề">
								<Button className="btn-edit" icon="edit" onClick={() => setIsShowEditTitle(true)} />
							</Tooltip>
						) : (
							''
						)}
					</>
				)}
			</div>
			{isUpdate ? (
				<div>
					<span className="group-btn btn-question ">
						<Button onClick={handleDeleteQuestions} loading={loadingUpdate}>
							Xóa câu hỏi được lựa chọn
						</Button>
						<Button
							onClick={handleDeleteAllQuestion}
							loading={loadingUpdate}
							disabled={data.questions && data.questions.length < 1}
						>
							Xóa tất cả câu hỏi
						</Button>
					</span>
					<h4 className="mt-10">Chọn câu hỏi cần xóa</h4>
				</div>
			) : (
				''
			)}
			{data.questions && data.questions.length > 0 ? renderQuestion(data.questions) : ''}
		</ExamViewStyle>
	);
}

QuestionList.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	isShowAnswer: PropTypes.bool.isRequired,
	isUpdate: PropTypes.bool.isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
	updateReq: PropTypes.func.isRequired,
};

export default QuestionList;
