import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Form, Button, Input, Select, DatePicker, Radio, ConfigProvider, Modal, Spin } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import AccountAction from '../Action';
import countries from '../../../../utils/country.json';
import BreadCrumb from '../../../../components/BreadCrumb';
import customMess from '../../../../utils/customMessage';
import ListProfileStudent from '../Component/ListProfileStudent';
import ModalCreateProfile from '../Component/ModalCreateProfile';
import ModalEditProfile from '../Component/ModalEditProfile';
import LoadingCustom from '../../../../components/LoadingCustom';


const { confirm } = Modal;

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
	{
		icon: 'user',
		path: '/admin/tai-khoan/hoc-vien',
		text: 'Quản lý học viên',
	},
];

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 20 },
	},
};

const disabledDate = current => {
	return current && current > moment().endOf('day');
};

moment.locale('vi');

function EditStudent(props) {
	const {
		form: { validateFields, getFieldDecorator },
		updateStudentStatus,
		createProfileStatus,
		getDetailStatus,
		removeFileStatus,
		updateReq,
		getDetailReq,
		detailAccount,
		createProfileReq,
		removeFile,
		profileStudent,
		getProfileReq,
		getProfileStudentStatus,
		removeProfileStudentStatus,
		updateProfileStudentStatus,
		updateProfileReq,
		removeProfileReq,
	} = props;
	const { ID } = useParams();
	useEffect(() => {
		getDetailReq({
			ID,
		});
		getProfileReq({
			ID,
		});
	}, [ID, getDetailReq, getProfileReq]);

	const [formData, setFormData] = useState({});
	const [visibleCreateProfile, setVisibleCreateProfile] = useState(false);
	const [visibleEditProfile, setVisibleEditProfile] = useState(false);
	const [profileDataPick, setProfileDataPick] = useState({});
	const history = useHistory();
	const loadingGetDetail = getDetailStatus === 'FETCHING';
	const loadingEdit = updateStudentStatus === 'FETCHING';
	const loadingCreateProfile = createProfileStatus === 'FETCHING';
	const loadingRemoveFile = removeFileStatus === 'FETCHING';
	const loadingGetProfile = getProfileStudentStatus === 'FETCHING';
	const loadingUpdateProfile = updateProfileStudentStatus === 'FETCHING';
	const loadingRemoveProfile = removeProfileStudentStatus === 'FETCHING';

	const handleSubmit = e => {
		e.preventDefault();
		validateFields(err => {
			if (!err) {
				updateReq({
					req: {
						...formData,
					},
					ID,
					cb: res => {
						if (res) {
							customMess('notification', 'success', res.msg);
						}
					},
				});
			}
		});
	};

	const onChangeInput = e => {
		const target = e.target;
		setFormData({ ...formData, [target.name]: target.value });
	};
	const onChangeSelect = value => {
		setFormData({ ...formData, country: value });
	};
	const onChangeDate = date => {
		setFormData({ ...formData, birthDay: date });
	};
	const handleDelete = profileData => {
		confirm({
			title: `Bạn có muốn xóa hồ sơ : ${profileData.title} ?`,
			onOk() {
				removeProfileReq({
					profileID: profileData && profileData._id,
					ID,
					cb: res => {
						if (res && res.isRemoved) customMess('notification', 'success', res.msg);
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};
	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb
							breadcrumb={breadcrumb}
							icon="none"
							visible={false}
							pageCurrentText="Chi tiết tài khoản học viên"
						/>
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row gutter={16}>
					<Col xs={24} md={10} className="mb-10">
						<Card
							title="Hồ sơ"
							className="phh-card"
							extra={
								<span className="group-btn">
									<Button type="primary" icon="plus" onClick={() => setVisibleCreateProfile(true)}>
										Tạo hồ sơ
									</Button>
								</span>
							}
						>
							<ListProfileStudent
								data={profileStudent}
								loading={loadingGetProfile}
								saveInfo={setProfileDataPick}
								openEdit={setVisibleEditProfile}
								openRemove={handleDelete}
								loadingRemove={loadingRemoveProfile}
							/>
						</Card>
					</Col>
					<Col xs={24} md={14}>
						<Card className="phh-card" title="Thông tin tài khoản">
							<Spin spinning={loadingGetDetail} indicator={<LoadingCustom margin={10} />}>
								<Form className="create-account form-custom" onSubmit={handleSubmit} {...formItemLayout}>
									<Row gutter={16}>
										<Col xs={24} sm={24} md={24}>
											<Form.Item label="Email" labelAlign="left">
												{getFieldDecorator('email', {
													initialValue: detailAccount && detailAccount.email,
													rules: [
														{
															required: true,
															message: 'Không được để trống email',
														},
														{
															type: 'email',
															message: 'Email không hợp lệ',
														},
														{
															whitespace: true,
															message: 'Chứa ký tự không hợp lệ',
														},
													],
												})(<Input onChange={onChangeInput} name="email" placeholder="Nhập email" />)}
											</Form.Item>
										</Col>
										<Col xs={24} sm={24} md={24}>
											<Form.Item label="Họ tên" labelAlign="left">
												{getFieldDecorator('name', {
													initialValue: detailAccount && detailAccount.name,
													rules: [
														{
															required: true,
															message: 'Không được để trống họ tên',
														},
													],
												})(<Input onChange={onChangeInput} name="name" placeholder="Nhập họ tên" />)}
											</Form.Item>
										</Col>

										<Col xs={24} sm={12} md={24}>
											<Form.Item label="Số điện thoại" labelAlign="left">
												{getFieldDecorator('phoneNumber', {
													initialValue: detailAccount && detailAccount.phoneNumber,
													rules: [
														{
															required: true,
															message: 'Không được để trống điện thoại',
														},
														{
															pattern: /^[0-9]*$/,
															message: 'Không phải là số !',
														},
													],
												})(<Input onChange={onChangeInput} name="phoneNumber" placeholder="Nhập số điện thoại" />)}
											</Form.Item>
										</Col>
										<Col xs={24} sm={12} md={24}>
											<Form.Item label="CMND" labelAlign="left">
												{getFieldDecorator('idCard', {
													initialValue: detailAccount && detailAccount.idCard,
													rules: [
														{
															required: true,
															message: 'Không được để trống CMND',
														},
														{
															pattern: /^[0-9]*$/,
															message: 'Không phải là số !',
														},
													],
												})(<Input onChange={onChangeInput} name="idCard" placeholder="Nhập CMND" />)}
											</Form.Item>
										</Col>

										<Col xs={24} sm={12} md={24}>
											<Form.Item label="Ngày sinh" labelAlign="left">
												<ConfigProvider locale={viVN}>
													{getFieldDecorator('birthDay', {
														initialValue: detailAccount && moment(detailAccount.birthDay),
														rules: [
															{
																required: true,
																message: 'Không được để trống ngày sinh',
															},
														],
													})(
														<DatePicker
															onChange={onChangeDate}
															disabledDate={disabledDate}
															placeholder="Ngày sinh"
															format="DD-MM-YYYY"
														/>,
													)}
												</ConfigProvider>
											</Form.Item>
										</Col>
										<Col xs={24} sm={12} md={24}>
											<Form.Item label="Giới Tính" labelAlign="left">
												{getFieldDecorator('sex', {
													initialValue: detailAccount && Number(detailAccount.sex),
													rules: [
														{
															required: true,
															message: 'Không được để trống giới tính',
														},
													],
												})(
													<Radio.Group className="radio-custom" onChange={onChangeInput} name="sex">
														<Radio value={1}>Nam</Radio>
														<Radio value={2}>Nữ</Radio>
													</Radio.Group>,
												)}
											</Form.Item>
										</Col>
										<Col xs={24} sm={12} md={24}>
											<Form.Item label="Quê Quán" labelAlign="left">
												{getFieldDecorator('country', {
													initialValue: detailAccount && detailAccount.country,
													rules: [
														{
															required: true,
															message: 'Không được để trống quê quán',
														},
													],
												})(
													<Select showSearch onChange={onChangeSelect} placeholder="Chọn quê quán">
														{countries.map(ele => (
															<Select.Option value={ele.key} key={ele.key}>
																{ele.name}
															</Select.Option>
														))}
													</Select>,
												)}
											</Form.Item>
										</Col>
										<Col xs={24} sm={12} md={24}>
											<Form.Item label="Địa chỉ" labelAlign="left">
												{getFieldDecorator('address', { initialValue: detailAccount && detailAccount.address })(
													<Input onChange={onChangeInput} name="address" placeholder="Nhập địa chỉ" />,
												)}
											</Form.Item>
										</Col>
									</Row>
									<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
										<Button
											icon="edit"
											disabled={_.isEmpty(formData)}
											className="btn-submit	mr-5"
											htmlType="submit"
											loading={loadingEdit}
										>
											Cập nhật
										</Button>
										<Button className="btn-cancel" onClick={() => history.goBack()}>
											Quay về
										</Button>
									</span>
								</Form>
							</Spin>
						</Card>
					</Col>
				</Row>
			</div>
			<ModalCreateProfile
				visible={visibleCreateProfile}
				setVisible={setVisibleCreateProfile}
				createProfileReq={createProfileReq}
				loadingCreateProfile={loadingCreateProfile}
				removeFile={removeFile}
				loadingRemoveFile={loadingRemoveFile}
				studentID={ID}
			/>
			<ModalEditProfile
				updateReq={updateProfileReq}
				loadingUpdate={loadingUpdateProfile}
				visible={visibleEditProfile}
				setVisible={setVisibleEditProfile}
				data={profileDataPick}
				removeFile={removeFile}
				loadingRemoveFile={loadingRemoveFile}
				studentID={ID}
			/>
		</div>
	);
}

EditStudent.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	detailAccount: PropTypes.objectOf(PropTypes.any).isRequired,
	profileStudent: PropTypes.instanceOf(Array).isRequired,
	getDetailStatus: PropTypes.string.isRequired,
	createProfileStatus: PropTypes.string.isRequired,
	updateStudentStatus: PropTypes.string.isRequired,
	getProfileStudentStatus: PropTypes.string.isRequired,
	updateProfileStudentStatus: PropTypes.string.isRequired,
	removeProfileStudentStatus: PropTypes.string.isRequired,
	removeFileStatus: PropTypes.string.isRequired,
	getDetailReq: PropTypes.func.isRequired,
	createProfileReq: PropTypes.func.isRequired,
	updateReq: PropTypes.func.isRequired,
	removeFile: PropTypes.func.isRequired,
	getProfileReq: PropTypes.func.isRequired,
	updateProfileReq: PropTypes.func.isRequired,
	removeProfileReq: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	createStatus: state.accountPage.EditStudentStatus,
	getDetailStatus: state.accountPage.getDetailStatus,
	detailAccount: state.accountPage.detailAccount,
	createProfileStatus: state.accountPage.createProfileStudentStatus,
	removeFileStatus: state.accountPage.removeFileStatus,
	profileStudent: state.accountPage.profileStudent,
	getProfileStudentStatus: state.accountPage.getProfileStudentStatus,
	removeProfileStudentStatus: state.accountPage.removeProfileStudentStatus,
	updateProfileStudentStatus: state.accountPage.updateProfileStudentStatus,
});

const mapDispatchToProps = {
	getDetailReq: AccountAction.getDetailAccountRequest,
	getProfileReq: AccountAction.getProfileStudentByIDRequest,
	updateReq: AccountAction.updateStudentRequest,
	createProfileReq: AccountAction.createProfileStudentRequest,
	updateProfileReq: AccountAction.updateProfileStudentRequest,
	removeProfileReq: AccountAction.removeProfileStudentRequest,
	removeFile: AccountAction.removeFileRequest,
};
export default Form.create({ name: 'student-edit' })(connect(mapStateToProps, mapDispatchToProps)(EditStudent));
