import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';
import _ from 'lodash';

import { TestFrameStyle } from '../styled';

function StepTest(props) {
	const {
		data,
		arrayQuestion,
		setVisibleStepTest,
		currentChoice,
		setCurrentChoice,
		setIsNext,
		isNext,
		onClose,
	} = props;
	const [current, setCurrent] = React.useState(0);
	const [dataChoice, setDataChoice] = React.useState([]);

	const next = () => {
		const currentTemp = current + 1;
		const arrDataTemp = [...dataChoice];
		if (currentChoice && !_.isEmpty(currentChoice)) arrDataTemp.push(currentChoice);
		if (arrDataTemp.length === data.length) setVisibleStepTest(true);
		setDataChoice(arrDataTemp);
		setCurrentChoice({});
		setCurrent(currentTemp);
		setIsNext(false);
	};
	return (
		<TestFrameStyle>
			<div className="steps-content">{arrayQuestion.length > 0 && arrayQuestion[current].content}</div>
			<div>
				<div className="steps-action">
					<Row type="flex" justify="space-around" align="middle">
						<Col span={18} push={6}>
							<div className="group-btn-event">
								<Button
									className="btn-cancel mr-10"
									onClick={() => {
										onClose();
										setDataChoice([]);
										setCurrent(0);
									}}
								>
									Hủy
								</Button>
								{current < arrayQuestion.length - 1 && (
									<>
										{isNext ? (
											<Button className="btn-next" onClick={next}>
												Tiếp theo
											</Button>
										) : (
											''
										)}
									</>
								)}
							</div>
						</Col>
						<Col span={6} pull={18}>
							<div className="choice">
								<span>Tiến độ</span>
								<span>
									<h2>{dataChoice ? dataChoice.length : 0} </h2>
									<h1>/</h1>
									<h2>{data ? data.length : 0} </h2>
								</span>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		</TestFrameStyle>
	);
}

StepTest.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	arrayQuestion: PropTypes.objectOf(PropTypes.any).isRequired,
	currentChoice: PropTypes.objectOf(PropTypes.any).isRequired,
	isNext: PropTypes.bool.isRequired,
	setVisibleStepTest: PropTypes.func.isRequired,
	setCurrentChoice: PropTypes.func.isRequired,
	setIsNext: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default StepTest;
