import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography, Button } from 'antd';

import ModalAuth from '../../../../components/ModalAuth';

function ModalViewExam(props) {
	const { visible, setVisible, data, authAccountReq, loadingAuth } = props;

	const [visibleModalAuth, setVisibleModalAuth] = useState(false);
	const [isShowAnswer, setIsShowAnswer] = useState(false);

	const renderQuestion = examData => {
		return examData.map((item, index) => {
			return (
				<div className="exam-item">
					<h3>
						{index + 1}.&ensp;
						<span className="text" dangerouslySetInnerHTML={{ __html: item.content }} />
					</h3>
					<ul>
						<li className={isShowAnswer && item.answer === 'A' ? 'answer' : null}>
							A.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerA }} />
						</li>
						<li className={isShowAnswer && item.answer === 'B' ? 'answer' : null}>
							B.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerB }} />
						</li>
						<li className={isShowAnswer && item.answer === 'C' ? 'answer' : null}>
							C.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerC }} />
						</li>
						<li className={isShowAnswer && item.answer === 'D' ? 'answer' : null}>
							D.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerD }} />
						</li>
					</ul>
				</div>
			);
		});
	};
	return (
		<React.Fragment>
			<Modal
				width={700}
				visible={visible}
				onCancel={() => {
					setVisible(false);
					setIsShowAnswer(false);
				}}
				footer={
					<div style={{ display: 'flex', alignItems: 'center' }}>
						{isShowAnswer ? (
							<Button className="btn-danger" onClick={() => setIsShowAnswer(false)}>
								Ẩn hiển thị đáp án
							</Button>
						) : (
							<Button className="btn-submit" onClick={() => setVisibleModalAuth(true)}>
								Hiển thị đáp án
							</Button>
						)}
						<Button
							className="btn-cancel ml-5"
							onClick={() => {
								setVisible(false);
								setIsShowAnswer(false);
							}}
						>
							Đóng
						</Button>
					</div>
				}
				wrapClassName="modal-exam"
			>
				<Typography.Title
					level={3}
					style={{ textAlign: 'center', textTransform: 'capitalize', textDecoration: 'underline' }}
				>
					{data && data.title}
				</Typography.Title>
				{data.questions && data.questions.length > 0 ? renderQuestion(data.questions) : ''}
			</Modal>
			<ModalAuth
				visible={visibleModalAuth}
				setVisible={setVisibleModalAuth}
				setCheck={setIsShowAnswer}
				authPasswordReq={authAccountReq}
				loading={loadingAuth}
			/>
		</React.Fragment>
	);
}

ModalViewExam.propTypes = {
	visible: PropTypes.bool.isRequired,
	loadingAuth: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	authAccountReq: PropTypes.func.isRequired,
};

export default ModalViewExam;
