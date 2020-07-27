import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions, Tag, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

import { trainingType } from '../../../../constands/Other';

function InfoClass(props) {
	const {
		info: { infoClass, countStudent },
	} = props;
	const history = useHistory();
	const renderTypeClass = value => {
		if (value) return trainingType.find(ele => ele.key === value).value;
		return '';
	};
	const renderStatusClass = value => {
		switch (value) {
			case 'OP':
				return (
					<Tag style={{ fontSize: 14 }} color="#1bb394">
						Chờ Khai giảng
					</Tag>
				);
			case 'HP':
				return (
					<Tag style={{ fontSize: 14 }} color="blue">
						Đang diễn ra
					</Tag>
				);
			case 'END':
				return (
					<Tag style={{ fontSize: 14 }} color="blue">
						Kết thúc
					</Tag>
				);
			default:
				return <Tag style={{ fontSize: 14 }}>Chưa tham gia vào lớp học</Tag>;
		}
	};
	return (
		<Descriptions>
			<Descriptions.Item label="Ngành Đào Tạo">{infoClass && infoClass.trainingSectorID.name}</Descriptions.Item>
			<Descriptions.Item label="Thời Gian Học">
				{!_.isEmpty(infoClass)
					? `${moment(infoClass && infoClass.startAt).format('DD-MM-YYYY')} / ${moment(
							infoClass && infoClass.endAt,
					  ).format('DD-MM-YYYY')}`
					: ''}
			</Descriptions.Item>
			<Descriptions.Item label="Mã Lớp Học">{infoClass && infoClass.name}</Descriptions.Item>
			<Descriptions.Item label="Tổng học viên">{countStudent}</Descriptions.Item>
			<Descriptions.Item label="Hệ">{renderTypeClass(infoClass && infoClass.trainingSectorID.type)}</Descriptions.Item>
			<Descriptions.Item label="Thao Tác">
				<div className="phh-group-btn-default">
					{!_.isEmpty(infoClass) ? (
						<Button onClick={() => history.push(`/student/dashboard/lop-hoc/${infoClass && infoClass._id}`)}>
							Vào Lớp
						</Button>
					) : (
						''
					)}
				</div>
			</Descriptions.Item>
			<Descriptions.Item label="Trạng Thái">{renderStatusClass(infoClass && infoClass.status)}</Descriptions.Item>
		</Descriptions>
	);
}

InfoClass.propTypes = {
	info: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default InfoClass;
