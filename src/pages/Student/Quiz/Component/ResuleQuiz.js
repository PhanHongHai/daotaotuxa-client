import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import ResultIcon from '../../../../assets/images/result-1.png';

import { ResuleQuizStyle, NotiStyle } from '../styled';

function ResuleQuiz(props) {
	const { info, result } = props;
	const history = useHistory();
	return (
		<NotiStyle className="mt-25">
			<Result
				icon={<img width="150" src={ResultIcon} alt="ket qua" />}
				extra={
					<ResuleQuizStyle>
						<h2>{info && info.title}</h2>
						<div>
							<h3>Mã môn học :{info && info.tag}</h3>
							<h3>Tên môn học :{info && info.name}</h3>
							<h3>Ngày thi :{info && info.startAt}</h3>
							<h3>Thời gian thi :{info && info.timeAt}</h3>
						</div>
						<Divider />
						<h2>Kết quả thi</h2>
						<div className="result">
							<ul>
								<li>
									<span>{result && result.wrongAnswer + result.rightAnswer}</span>
									Tổng số câu hỏi
								</li>
								<li>
									<span>{result && result.rightAnswer}</span>
									Số câu trả lời đúng
								</li>
								<li>
									<span>{result && result.point}</span>
									Điểm đạt được
								</li>
							</ul>
						</div>
						<Divider />
						<Button icon="rollback" onClick={() => history.push('/student/dashboard')} className="btn-back">
							Quay về trang chủ
						</Button>
					</ResuleQuizStyle>
				}
			/>
		</NotiStyle>
	);
}

ResuleQuiz.propTypes = {
	info: PropTypes.objectOf(PropTypes.object).isRequired,
	result: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ResuleQuiz;
