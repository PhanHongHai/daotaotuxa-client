import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Cascader, DatePicker, Row, Col, Tag, Button, ConfigProvider, Modal } from 'antd';
import moment from 'moment';
import viVN from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';
import _ from 'lodash';

import customMess from '../../../../utils/customMessage';
import { trainingType } from '../../../../constands/Other';

moment.locale('vi');

const { confirm } = Modal;
const { RangePicker } = DatePicker;
const disabledDate = current => {
	// Can not select days before today and today
	return current && current < moment().endOf('day');
};
const renderStatus = value => {
	switch (value) {
		case 'OP':
			return (
				<Tag color="#1bb394" style={{ padding: '5px', width: '100px', textAlign: 'center' }}>
					Chờ Khai giảng
				</Tag>
			);
		case 'HP':
			return (
				<Tag color="blue" style={{ padding: '5px', width: '100px', textAlign: 'center' }}>
					Đang diễn ra
				</Tag>
			);
		default:
			return (
				<Tag color="gray" style={{ padding: '5px', width: '100px', textAlign: 'center' }}>
					Kết thúc
				</Tag>
			);
	}
};

// const formItemLayout = {
// 	labelCol: {
// 		xs: { span: 24 },
// 		sm: { span: 8 },
// 	},
// 	wrapperCol: {
// 		xs: { span: 24 },
// 		sm: { span: 16 },
// 	},
// };

function FormEditClass(props) {
	const {
		sectorData,
		form: { getFieldDecorator, validateFields },
		data,
		updateReq,
		deleteReq,
	} = props;
	const [dataUpdate, setDataUpdate] = useState({});
	const handleSubmit = e => {
		e.preventDefault();
		validateFields(err => {
			if (!err) {
				updateReq({
					req: {
						...dataUpdate,
					},
					ID: data._id,
					cb: res => {
						if (res.isUpdated) customMess('notification', 'success', res.msg);
					},
				});
			}
		});
	};
	const renderButtonAction = value => {
		switch (value) {
			case 'OP':
				return (
					<Button
						className="btn-cancel"
						icon='play-circle'
						onClick={() =>
							updateReq({
								req: { status: 'HP' },
								ID: data._id,
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
						className="btn-cancel"
						icon='pause-circle'
						onClick={() =>
							updateReq({
								req: { status: 'END' },
								ID: data._id,
								cb: res => {
									if (res.isUpdated) customMess('notification', 'success', res.msg);
								},
							})
						}
					>
						Ngừng
					</Button>
				);
			default:
				return (
					<Button
						className="btn-cancel"
						icon='play-square'
						onClick={() =>
							updateReq({
								req: { status: 'HP' },
								ID: data._id,
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
	const onChangeInput = e => {
		const { name, value } = e.target;
		setDataUpdate({ ...dataUpdate, [name]: value });
	};
	const onChangeDate = date => {
		if (date.length > 0) setDataUpdate({ ...dataUpdate, startAt: moment(date[0]), endAt: moment(date[1]) });
	};
	const onChangeSelect = value => {
		if (value.length > 0) setDataUpdate({ ...dataUpdate, trainingSectorID: value[1] });
	};
	const handleOpenDelete = () => {
		confirm({
			title: `Bạn có muốn xóa lớp học có mã lớp là ${data.name} ?`,
			onOk() {
				deleteReq({
					ID: data._id,
					pageCurrent: { limit: 10, page: 1 },
					keyword: '',
					status: '',
					cb: res => {
						if (res.isDeleted) customMess('notification', 'success', res.msg);
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};
	const optionSector = sectorArr => {
		const result = [];
		if (sectorArr.length > 0) {
			trainingType.map(ele => {
				const sectorDataByType = _.filter(sectorArr, { type: ele.key });
				const children = sectorDataByType.map(item => {
					return { value: item._id, label: item.name };
				});
				if (children.length > 0)
					result.push({
						value: ele.key,
						label: ele.value,
						children,
					});
				return result;
			});
		}
		return result;
	};
	return (
		<Form className="form-custom" onSubmit={handleSubmit}>
			<Row gutter={16}>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Mã Lớp" labelAlign="left">
						{getFieldDecorator('name', {
							initialValue: data && data.name,
							rules: [
								{
									required: true,
									message: 'Không được để trống mã lớp',
								},
								{
									whitespace: true,
									message: 'Chứa ký tự không hợp lệ',
								},
							],
						})(<Input onChange={onChangeInput} name="name" placeholder="Nhập mã lớp" />)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Thời gian" labelAlign="left">
						<ConfigProvider locale={viVN}>
							{getFieldDecorator('dateTime', {
								initialValue: data && [moment(data.startAt), moment(data.endAt)],
								rules: [
									{
										required: true,
										message: 'Không được để trống thời gian đào tạo',
									},
								],
							})(
								<RangePicker
									onChange={onChangeDate}
									disabledDate={disabledDate}
									format="DD-MM-YYYY"
									placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
								/>,
							)}
						</ConfigProvider>
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Ngành đào tao" labelAlign="left">
						{getFieldDecorator('sector', {
							initialValue: data.trainingSectorID && [data.trainingSectorID.type, data.trainingSectorID._id],
							rules: [
								{
									required: true,
									message: 'Không được để trống ngành đào tào',
								},
							],
						})(
							<Cascader
								onChange={onChangeSelect}
								placeholder="Chọn ngành đào tạo"
								options={optionSector(sectorData)}
							/>,
						)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Trạng thái" labelAlign="left">
						{renderStatus(data && data.status)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={24} md={24}>
					<span className="flex fl-right" style={{ float: 'right' }}>
						{renderButtonAction(data && data.status)}
						<Button className="btn-submit ml-10" disabled={_.isEmpty(dataUpdate)} htmlType="submit" icon="edit">
							Cập nhật
						</Button>
						<Button
							style={{ height: '29px', marginLeft: '10px' }}
							type="danger"
							icon="delete"
							onClick={handleOpenDelete}
						>
							Hủy lớp
						</Button>
					</span>
				</Col>
			</Row>
		</Form>
	);
}

FormEditClass.propTypes = {
	sectorData: PropTypes.instanceOf(Array).isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	data: PropTypes.objectOf(PropTypes.object).isRequired,
	updateReq: PropTypes.func.isRequired,
	deleteReq: PropTypes.func.isRequired,
};

export default Form.create({ name: 'edit-class' })(FormEditClass);
