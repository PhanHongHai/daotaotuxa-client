import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, TimePicker, Button, ConfigProvider, Row, Col, Select, Tag, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import viVN from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';
import _ from 'lodash';

import customMessage from '../../../../utils/customMessage';
import { trainingType } from '../../../../constands/Other';

import ModalPickSubject from './ModalPickSubject';

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

function FormUpdateSchedule(props) {
	const {
		form: { getFieldDecorator, validateFields },
		updateReq,
		getSubjectsReq,
		loadingUpdate,
		loadingRemove,
		loadingGetSubject,
		info,
		subjectAll,
	} = props;

	const [dataForm, setDataForm] = useState({});
	const [visibleModalSubject, setVisibleModalSubject] = useState(false);

	const history = useHistory();
	const handleSubmit = e => {
		e.preventDefault();
		validateFields(err => {
			if (_.isEmpty(dataForm)) customMessage('notification', 'warn', 'Thiếu thông tin');
			if (!err && !_.isEmpty(dataForm)) {
				updateReq({
					req: {
						...dataForm,
					},
					scheduleID: info && info._id,
					cb: res => {
						if (res && res.isCreated) {
							setDataForm({});
							customMessage('notification', 'success', res.msg);
						}
					},
				});
			}
		});
	};

	const onChangeInput = e => {
		const { value } = e.target;
		setDataForm({ ...dataForm, title: value });
	};
	const onChangeDatePicker = date => {
		setDataForm({ ...dataForm, dayAt: date });
	};

	const onChangeTimePicker = time => {
		setDataForm({ ...dataForm, timeAt: time });
	};
	const onChangeSelect = value => {
		setDataForm({ ...dataForm, timeRange: value });
	};
	const onChangeSelectSubject = value => {
		setDataForm({ ...dataForm, subjectID: value });
		setVisibleModalSubject(false);
	};
	const renderNameTypeTraining = value => {
		const result = trainingType.find(ele => ele.key === value);
		if (!result) return 'Không xác định';
		return result.value;
	};
	const renderStatusSchedule = dateValue => {
		if (moment.utc(dateValue.dayAt) < moment().utc()) return <Tag color="silver">Kết thúc</Tag>;
		if (moment.utc(dateValue.dayAt) === moment().utc()) {
			if (moment.utc(dateValue.timeAt).format('HH:MM') < moment.utc().format('HH:MM'))
				return <Tag color="green">Chuẩn bị</Tag>;
			if (moment.utc(dateValue.timeAt).format('HH:MM') >= moment.utc().format('HH:MM'))
				return <Tag color="silver">Kết thúc</Tag>;
		}
		return <Tag color="cyan">Chưa diễn ra</Tag>;
	};
	return (
		<React.Fragment>
			<Form className="form-custom mt-15" {...formItemLayout} onSubmit={handleSubmit}>
				<Row gutter={16}>
					<Col xs={24} md={12}>
						<Form.Item label="Hệ đào tạo" labelAlign="left">
							<h4>{renderNameTypeTraining(info.trainingSectorID && info.trainingSectorID.type)}</h4>
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Hệ đào tạo" labelAlign="left">
							<h4> {info.trainingSectorID && info.trainingSectorID.name} </h4>
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Tiêu đề" labelAlign="left">
							{getFieldDecorator('title', {
								initialValue: info && info.title,
								rules: [
									{
										required: true,
										message: 'Không được để trống tiêu đề',
									},
								],
							})(<Input onChange={onChangeInput} placeholder="Nhập tiêu đề" />)}
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Ngày thi" labelAlign="left">
							<ConfigProvider locale={viVN}>
								{getFieldDecorator('dayAt', {
									initialValue: info && moment(info.dayAt),
									rules: [
										{
											required: true,
											message: 'Không được để trống ngày thi',
										},
									],
								})(
									<DatePicker
										onChange={onChangeDatePicker}
										disabledDate={disabledDate}
										format="DD-MM-YYYY"
										placeholder="Nhập ngày thi"
									/>,
								)}
							</ConfigProvider>
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Thời gian thi" labelAlign="left">
							{getFieldDecorator('timeAt', {
								initialValue: info && moment(info.timeAt),
								rules: [
									{
										required: true,
										message: 'Không được để trống tiêu đề',
									},
								],
							})(
								<TimePicker
									onChange={onChangeTimePicker}
									style={{ width: '100%' }}
									format="HH:mm"
									placeholder="Nhập thời gian bắt đầu thi"
								/>,
							)}
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Thời gian làm bài" labelAlign="left">
							{getFieldDecorator('timeRange', {
								initialValue: info && info.timeRange,
								rules: [
									{
										required: true,
										message: 'Không được để trống thời gian làm bài',
									},
								],
							})(
								<Select onChange={onChangeSelect} placeholder="Nhập thời gian làm bài">
									<Select.Option value={45}>45 phút</Select.Option>
									<Select.Option value={60}>60 phút</Select.Option>
									<Select.Option value={90}>90 phút</Select.Option>
									<Select.Option value={120}>120 phút</Select.Option>
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Môn học" labelAlign="left">
							<Tag style={{ fontSize: '14px', lineHeight: '25px' }}>
								# {info.subjectID && info.subjectID.tag}&ensp;-&ensp;{info.subjectID && info.subjectID.name}{' '}
							</Tag>
							&ensp;
							<Tooltip title="Danh sách môn học">
								<Button
									style={{
										margin: '0 5px 0 5px',
										height: ' 30px',
										width: '30px !important',
										color: 'black',
										background: 'white',
										border: '1px solid #e7eaec',
										fontSize: '.8rem',
										padding: '.25rem .5rem',
										lineHeight: ' 1.5',
									}}
									onClick={() => {
										getSubjectsReq({
											req: {
												sectorID: info.trainingSectorID && info.trainingSectorID._id,
												page: 1,
												limit: 10,
												keyword: '',
											},
										});
										setVisibleModalSubject(true);
									}}
									icon="setting"
								/>
							</Tooltip>
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Trạng thái lịch thi" labelAlign="left">
							{renderStatusSchedule(info)}
						</Form.Item>
					</Col>
					<Col xs={24} md={24} className="mt-10">
						<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
							<Button
								icon="plus"
								className="btn-submit"
								htmlType="submit"
								disabled={_.isEmpty(dataForm)}
								loading={loadingUpdate}
							>
								Cập nhật
							</Button>
							<Button icon="delete" className="btn-cancel ml-5" type="danger" loading={loadingRemove}>
								Xóa
							</Button>
							<Button className="btn-cancel ml-5" onClick={() => history.goBack()}>
								Quay về
							</Button>
						</span>
					</Col>
				</Row>
			</Form>
			<ModalPickSubject
				visible={visibleModalSubject}
				setVisible={setVisibleModalSubject}
				getSubjectReq={getSubjectsReq}
				subjectsData={subjectAll}
				loadingGetSubject={loadingGetSubject}
				onPick={onChangeSelectSubject}
				sectorID={info.trainingSectorID && info.trainingSectorID._id}
				subjectCurrent={info.subjectID && info.subjectID._id}
			/>
		</React.Fragment>
	);
}

FormUpdateSchedule.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	info: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectAll: PropTypes.objectOf(PropTypes.any).isRequired,
	updateReq: PropTypes.func.isRequired,
	getSubjectsReq: PropTypes.func.isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
	loadingRemove: PropTypes.bool.isRequired,
	loadingGetSubject: PropTypes.bool.isRequired,
};

export default Form.create({ name: 'update-schedule' })(FormUpdateSchedule);
