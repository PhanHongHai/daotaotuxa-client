import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon, Progress, Carousel, Card, Spin } from 'antd';
import _ from 'lodash';

import BookIcon from '../../../../assets/images/textbook.png';

import { InfoSubjectStyle } from '../styled';
import LoadingCustom from '../../../../components/LoadingCustom';

function InfoSubject(props) {
	const { loading, loadingGetProgress, info, progress } = props;
	return (
		<InfoSubjectStyle>
			<Carousel className="carousel-custom">
				<div>
					<Card title="Thông tin môn học" className="phh-card-v2 pd-b-1" loading={loading}>
						<div className="info-subject">
							<Avatar src={BookIcon} size={100} />
							<ul>
								<li>
									<Icon type="read" /> Bài học : {info && info.countLesson}
								</li>
								<li>
									<Icon type="form" /> Bài tập : {info && info.countHomeWork}
								</li>
								<li>
									<Icon type="file" /> Đề cương : {info && info.countDocument}
								</li>
							</ul>
						</div>
						<p className="mt-15">
							#{info.subject && info.subject.tag} - {info.subject && info.subject.name}
						</p>
						<p className="mt-5">Mô tả : {info.subject && info.subject.introduce} </p>
					</Card>
				</div>
				<div>
					<Card title="Tiến độ môn học" className="phh-card-v2 pd-b-3">
						<div className="info-subject">
							<Spin spinning={loadingGetProgress} indicator={<LoadingCustom margin={5} />}>
								<Progress
									width={160}
									type="circle"
									format={percent => `${percent}%`}
									percent={progress && progress.progress}
								/>
								<ul style={{ float: 'right', paddingTop:'3em' }}>
									<li className='mb-10'>
										<Icon type="check-circle" /> Đã xem: {progress.documents && progress.documents.length}
									</li>
									<li>
										<Icon type="eye-invisible" /> Chưa xem :{' '}
										{!_.isEmpty(info) && !_.isEmpty(progress) ? info.countLesson - progress.documents.length : 0}
									</li>
								</ul>
							</Spin>
						</div>
					</Card>
				</div>
			</Carousel>
		</InfoSubjectStyle>
	);
}

InfoSubject.propTypes = {
	loading: PropTypes.bool.isRequired,
	loadingGetProgress: PropTypes.bool.isRequired,
	info: PropTypes.objectOf(PropTypes.any).isRequired,
	progress: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default InfoSubject;
