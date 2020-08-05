import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography, Button, Spin } from 'antd';
import LoadingCustom from '../../../../components/LoadingCustom';

function ModalViewExam(props) {
	const { visible, setVisible, data, loading } = props;

	const renderQuestion = examData => {
		return examData.map((item, index) => {
			return (
				<div className="exam-item">
					<h3>
						{index + 1}.&ensp;
						<span className="text" dangerouslySetInnerHTML={{ __html: item.content }} />
					</h3>
					<ul>
						<li>
							A.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerA }} />
						</li>
						<li>
							B.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerB }} />
						</li>
						<li>
							C.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerC }} />
						</li>
						<li>
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
				}}
				footer={
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Button
							className="btn-cancel ml-5"
							onClick={() => {
								setVisible(false);
							}}
						>
							Đóng
						</Button>
					</div>
				}
				wrapClassName="modal-exam"
			>
				<Spin spinning={loading} indicator={<LoadingCustom margin={10} />}>
					<Typography.Title
						level={3}
						style={{ textAlign: 'center', textTransform: 'capitalize', textDecoration: 'underline' }}
					>
						{data && data.title}
					</Typography.Title>
					{data.questions && data.questions.length > 0 ? renderQuestion(data.questions) : ''}
				</Spin>
			</Modal>
		</React.Fragment>
	);
}

ModalViewExam.propTypes = {
	visible: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalViewExam;
