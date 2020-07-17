import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button, DatePicker, Row, Col, ConfigProvider, Cascader } from 'antd';
import moment from 'moment';
import viVN from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';
import _ from 'lodash';

import { trainingType } from '../../../../constands/Other';

const { RangePicker } = DatePicker;

const disabledDate = current => {
	// Can not select days before today and today
	return current && current < moment().endOf('day');
};

moment.locale('vi');

function ModalCreateClass(props) {
	const {
		visible,
		setVisible,
		form: { validateFields, getFieldDecorator, resetFields },
		sectorData,
		handleCreate,
		loading,
		getSectorsReq,
		loadingGetSector,
	} = props;
	const [sectorID, setSectorID] = useState('');
	const [datePickData, setDatePickData] = useState({
		startAt: moment(),
		endAt: moment().add(1, 'day'),
	});
	useEffect(() => {
		getSectorsReq({});
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				handleCreate({ ...values, ...datePickData, trainingSectorID: sectorID,});
				resetFields();
			}
		});
	};
	const handleChangeDatePick = date => {
		if (date.length > 0)
			setDatePickData({
				startAt: moment(date[0]),
				endAt: moment(date[1]),
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
	const handleChangeSector = value => {
		if (value.length > 0) setSectorID(value[1]);
	};
	return (
		<React.Fragment>
			<Modal
				className="phh-modal"
				title="Thêm mới lớp học"
				visible={visible}
				onCancel={() => {
					resetFields();
					setVisible(false);
				}}
				footer={null}
				width="600px"
			>
				<Form className="create-class form-custom" onSubmit={handleSubmit}>
					<Row gutter={16}>
						<Col xs={24} sm={12} md={12}>
							<Form.Item label="Mã Lớp" labelAlign="left">
								{getFieldDecorator('name', {
									rules: [
										{
											required: true,
											message: 'Không được để trống mã lớp',
										},
									],
								})(<Input placeholder="Nhập mã lớp" />)}
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12}>
							<Form.Item label="Thời gian" labelAlign="left">
								<ConfigProvider locale={viVN}>
									{getFieldDecorator('dateTime', {
										rules: [
											{
												required: true,
												message: 'Không được để trống thời gian ',
											},
										],
									})(
										<RangePicker
											disabledDate={disabledDate}
											format="DD-MM-YYYY"
											placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
											onChange={handleChangeDatePick}
										/>,
									)}
								</ConfigProvider>
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12}>
							<Form.Item label="Chọn ngành" labelAlign="left">
								{getFieldDecorator('sectorPick', {
									rules: [
										{
											required: true,
											message: 'Không được để trống ngành đào tào',
										},
									],
								})(
									<Cascader
										onChange={handleChangeSector}
										placeholder="Chọn ngành đào tạo"
										options={optionSector(sectorData)}
									/>,
								)}
							</Form.Item>
						</Col>
					</Row>
					<Form.Item>
						<Button
							loading={loading || loadingGetSector}
							className="btn-submit"
							htmlType="submit"
							icon="plus"
							type="primary"
							style={{ float: 'right' }}
						>
							Thêm
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</React.Fragment>
	);
}

ModalCreateClass.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	sectorData: PropTypes.instanceOf(Array).isRequired,
	handleCreate: PropTypes.func.isRequired,
	getSectorsReq: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	loadingGetSector: PropTypes.bool.isRequired,
};

export default Form.create({ name: 'create-class' })(ModalCreateClass);
