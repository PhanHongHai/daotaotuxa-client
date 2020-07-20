import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions, Tag, Button, Progress } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

import { trainingType } from '../../../../constands/Other';
import customMess from '../../../../utils/customMessage';

function InfoClass(props) {
	const {
		info: { infoClass, countStudent },
		updateReq,
		loadingUpdate,
	} = props;
	const history = useHistory();
	const renderTypeClass = value => {
		if (value) return trainingType.find(ele => ele.key === value).value;
		return '';
	};
	const renderStatusClass = value => {
		switch (value) {
			case 'OP':
				return <Tag color="#1bb394">Chờ Khai giảng</Tag>;
			case 'HP':
				return <Tag color="blue">Đang diễn ra</Tag>;
			default:
				return <Tag color="gray">Kết thúc</Tag>;
		}
	};
	const renderButtonAction = value => {
		switch (value) {
			case 'OP':
				return (
					<Button
						loading={loadingUpdate}
						onClick={() =>
							updateReq({
								req: { status: 'HP' },
								ID: infoClass && infoClass._id,
								cb: res => {
									if (res.isUpdated) customMess('notification', 'success', res.msg);
								},
							})
						}
					>
						Khai Giảng
					</Button>
				);
			case 'HP':
				return (
					<Button
						loading={loadingUpdate}
						onClick={() =>
							updateReq({
								req: { status: 'END' },
								ID: infoClass && infoClass._id,
								cb: res => {
									if (res.isUpdated) customMess('notification', 'success', res.msg);
								},
							})
						}
					>
						Ngừng Hoạt Động
					</Button>
				);
			default:
				return (
					<Button
						loading={loadingUpdate}
						onClick={() =>
							updateReq({
								req: { status: 'HP' },
								ID: infoClass && infoClass._id,
								cb: res => {
									if (res.isUpdated) customMess('notification', 'success', res.msg);
								},
							})
						}
					>
						Tiếp Tục
					</Button>
				);
		}
	};
	return (
		<Descriptions>
			<Descriptions.Item label="Ngành Đào Tạo">{infoClass && infoClass.trainingSectorID.name}</Descriptions.Item>
			<Descriptions.Item label="Thời Gian Học">
				{!_.isEmpty(infoClass)
					? `${moment(infoClass && infoClass.startAt).year()} - ${moment(infoClass && infoClass.endAt).year() + 4}`
					: ''}
			</Descriptions.Item>
			<Descriptions.Item label="Mã Lớp Học">{infoClass && infoClass.name}</Descriptions.Item>
			<Descriptions.Item label="Tổng học viên">{countStudent}</Descriptions.Item>
			<Descriptions.Item label="Hệ">{renderTypeClass(infoClass && infoClass.trainingSectorID.type)}</Descriptions.Item>
			<Descriptions.Item label="Trạng Thái">{renderStatusClass(infoClass && infoClass.status)}</Descriptions.Item>
			<Descriptions.Item label="Thao Tác">
				<div className="phh-group-btn-default">
					{!_.isEmpty(infoClass) ? (
						<div>
							<Button onClick={() => history.push(`/teacher/dashboard/lop-hoc/${infoClass && infoClass._id}`)}>
								Vào Lớp
							</Button>
							{renderButtonAction(infoClass && infoClass.status)}
						</div>
					) : (
						''
					)}
				</div>
			</Descriptions.Item>
		</Descriptions>
	);
}

InfoClass.propTypes = {
	info: PropTypes.objectOf(PropTypes.object).isRequired,
	updateReq: PropTypes.func.isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
};

export default InfoClass;
