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

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 18 },
	},
};

const convertString = value => {
	let result = '';
	for (let i = 0; i < value.length; i++) {
		const ele = value[i];
		// eslint-disable-next-line eqeqeq
		if (ele == ele.toUpperCase() && ele != ' ') result += ele;
	}
	return result;
};

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
	const [typeSectorName, setTypeSectorName] = useState('');

	useEffect(() => {
		getSectorsReq({});
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				handleCreate({ name: values.name, prefixTag: typeSectorName, ...datePickData, trainingSectorID: sectorID });
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
		if (value.length > 0) {
			setSectorID(value[1]);
			if (sectorData && sectorData.length > 0) {
				const sectorPick = sectorData.find(ele => ele._id === value[1]);
				if (sectorPick) {
					const prefixTag = value[0] + convertString(sectorPick.name);
					setTypeSectorName(prefixTag);
				}
			}
		}
	};
	return (
		<React.Fragment>
			<Modal
				className="phh-modal"
				title="Thêm mới lớp học"
				visible={visible}
				onCancel={() => {
					resetFields();
					setTypeSectorName('');
					setSectorID('');
					setVisible(false);
				}}
				footer={null}
				width="700px"
			>
				<Form className="create-class form-custom" {...formItemLayout} onSubmit={handleSubmit}>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={24}>
							<Form.Item label="Chọn ngành và hệ" labelAlign="left">
								{getFieldDecorator('sectorPick', {
									rules: [
										{
											required: true,
											message: 'Không được để trống ngành và hệ đào tào',
										},
									],
								})(
									<Cascader
										onChange={handleChangeSector}
										placeholder="Chọn ngành hệ đào tạo"
										options={optionSector(sectorData)}
									/>,
								)}
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24}>
							<Form.Item label="Tên Lớp học" labelAlign="left">
								{getFieldDecorator('name', {
									rules: [
										{
											required: true,
											message: 'Không được để trống têm lớp',
										},
									],
								})(<Input addonBefore={typeSectorName} placeholder="Nhập tên lớp học" />)}
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24}>
							<Form.Item label="Thời gian học" labelAlign="left">
								<ConfigProvider locale={viVN}>
									{getFieldDecorator('dateTime', {
										rules: [
											{
												required: true,
												message: 'Không được để trống thời gian học ',
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

						<Col xs={24} sm={24} md={24}>
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
						</Col>
					</Row>
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
