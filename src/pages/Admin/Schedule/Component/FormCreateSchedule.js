import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, TimePicker, Button, ConfigProvider, Row, Col, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import viVN from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';
import _ from 'lodash';


import ModalPickExam from './ModalPickExam';
import customMessage from '../../../../utils/customMessage';

const disabledDate = current => {
	// Can not select days before today and today
	return current && current < moment().endOf('day');
};
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

function FormCreateSchedule(props) {
	const {
		form: { getFieldDecorator, validateFields,resetFields },
		createReq,
		loading,
	} = props;
	const [visibleModalExam, setVisibleModalExam] = useState(false);
	const [dataForm, setDataForm] = useState({});
	const history = useHistory();
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if(_.isEmpty(dataForm))	customMessage('notification', 'warn','Thiếu thông tin');
			if (!err && !_.isEmpty(dataForm)) {
				createReq({
					req: {
						...values,
						...dataForm,
					},
					cb: res => {
						if (res && res.isCreated) {
							history.push('/admin/lich-thi');
							customMessage('notification', 'success', res.msg);
							resetFields();
						}
					},
				});
			}
		});
	};
	return (
		<React.Fragment>
			<Form className="form-custom" {...formItemLayout} onSubmit={handleSubmit}>
				<Row gutter={16}>
					<Col xs={24} md={12}>
						<Form.Item label="Tiêu đề" labelAlign="left">
							{getFieldDecorator('title', {
								rules: [
									{
										required: true,
										message: 'Không được để trống tiêu đề',
									},
								],
							})(<Input placeholder="Nhập tiêu đề" />)}
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Ngày thi" labelAlign="left">
							<ConfigProvider locale={viVN}>
								{getFieldDecorator('dayAt', {
									rules: [
										{
											required: true,
											message: 'Không được để trống ngày thi',
										},
									],
								})(<DatePicker disabledDate={disabledDate} format="DD-MM-YYYY" placeholder="Nhập ngày thi" />)}
							</ConfigProvider>
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Thời gian thi" labelAlign="left">
							{getFieldDecorator('timeAt', {
								rules: [
									{
										required: true,
										message: 'Không được để trống tiêu đề',
									},
								],
							})(<TimePicker style={{ width: '100%' }} format="HH:mm" placeholder="Nhập thời gian bắt đầu thi" />)}
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Thời gian làm bài" labelAlign="left">
							{getFieldDecorator('timeRange', {
								rules: [
									{
										required: true,
										message: 'Không được để trống thời gian làm bài',
									},
								],
							})(
								<Select placeholder="Nhập thời gian làm bài">
									<Select.Option value={45}>45 phút</Select.Option>
									<Select.Option value={60}>60 phút</Select.Option>
									<Select.Option value={90}>90 phút</Select.Option>
									<Select.Option value={120}>120 phút</Select.Option>
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Col>
							<Form.Item label="Thông tin nâng cao" labelAlign="left">
								<Button className="btn-cancel" onClick={() => setVisibleModalExam(true)}>
									Chọn
								</Button>
							</Form.Item>
						</Col>
					</Col>
					<Col xs={24} md={24} className="mt-10">
						<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
							<Button icon="plus" className="btn-submit" htmlType="submit" loading={loading}>
								Tạo lịch thi
							</Button>
							<Button className="btn-cancel ml-5" onClick={() => history.goBack()}>
								Quay về
							</Button>
						</span>
					</Col>
				</Row>
			</Form>
			<ModalPickExam setDataForm={setDataForm} visible={visibleModalExam} setVisible={setVisibleModalExam} />
		</React.Fragment>
	);
}

FormCreateSchedule.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	createReq: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default Form.create({ name: 'create-schedule' })(FormCreateSchedule);
