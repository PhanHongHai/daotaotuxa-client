import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
	Card,
	Form,
	Button,
	Input,
	Select,
	DatePicker,
	Radio,
	ConfigProvider,
	Avatar,
	Upload,
	Icon,
	message,
} from 'antd';
import _ from 'lodash';
import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';

import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { apiUploadAvatar } from '../../../../apis/apiUpload';

import { HOST_SERVER } from '../../../../constands/Other';

import AccountAction from '../Action';
import countries from '../../../../utils/country.json';

import BreadCrumb from '../../../../components/BreadCrumb';
import customMess from '../../../../utils/customMessage';

import { AvatarUploadStyle, ButtonUpload } from '../Account.styled';

moment.locale('vi');

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

function CreateStudent(props) {
	const {
		form: { validateFields, getFieldDecorator, resetFields },
		createStatus,
		createReq,
	} = props;
	const token = localStorage.getItem('token');
	const history = useHistory();
	const [fileUpload, setFileUpload] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const [nameFileUpload, setNameFileUpload] = useState(null);

	const dispatch = useDispatch();
	const loadingCreate = createStatus === 'FETCHING';
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (fileUpload === null) message.warning('Xin chọn ảnh học viên');
			if (!err && fileUpload !== null) {
				createReq({
					req: {
						...values,
						...fileUpload,
						role: 'student',
					},
					cb: res => {
						if (res.isRedirect) {
							history.push('/admin/tai-khoan/hoc-vien');
							customMess('notification', 'success', res.msg);
							resetFields();
						}
					},
				});
			}
		});
	};
	const propsUpload = {
		showUploadList: false,
		headers: {
			accesstoken: token || null,
		},
		action: apiUploadAvatar,
		name: 'file',
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				setIsUploading(true);
			}
			if (status === 'done') {
				const {
					response: { url, path },
				} = info.file;
				setIsUploaded(true);
				setIsUploading(false);
				if (!_.isEmpty(fileUpload)) {
					dispatch(
						AccountAction.removeFileRequest({
							req: {
								path: fileUpload.pathAvatar,
							},
						}),
					);
				}
				setFileUpload({ avatar: url, pathAvatar: path });
				setNameFileUpload(info.file.name);
				message.success(`${info.file.name} upload file thành công.`);
			} else if (status === 'error') {
				setIsUploaded(false);
				setIsUploading(false);
				message.error(`${info.file.name} upload file thất bại.`);
			}
		},
		beforeUpload(file) {
			const isImage = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
			if (!isImage) {
				message.error('File không hợp lệ');
			}
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				message.error('Dung lượng ảnh nên nhỏ hơn 2MB!');
			}
			if (isImage && isLt2M) setNameFileUpload(file.name);
			return isImage && isLt2M;
		},
	};
	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="none" visible={false} pageCurrentText="Tạo tài khoản học viên" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Card className="phh-card" title="Thông tin tài khoản">
					<Form className="create-account form-custom" onSubmit={handleSubmit} {...formItemLayout}>
						<Row gutter={16}>
							{/* <Col xs={24} sm={24} md={24}>
								<Form.Item label="Email" labelAlign="left">
									{getFieldDecorator('email', {
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
									})(<Input placeholder="Nhập email" />)}
								</Form.Item>
							</Col> */}
							<Col xs={24} sm={24} md={12}>
								<Form.Item>
									<AvatarUploadStyle>
										<Row>
											<Col xs={24} md={12}>
												{isUploaded ? (
													<Avatar
														style={{ border: ' 1px solid silver' }}
														shape="square"
														size={150}
														src={`${HOST_SERVER}/${fileUpload && fileUpload.avatar}`}
													/>
												) : (
													<Avatar
														shape="square"
														size={150}
														style={{ border: ' 1px solid silver' }}
														src="https://via.placeholder.com/150"
													/>
												)}
											</Col>
											<Col xs={24} md={12}>
												<h4>Ảnh đại diện</h4>
												{fileUpload !== null ? (
													<h4>
														<Icon type="file-image" />
														&ensp;
														{nameFileUpload && nameFileUpload}
													</h4>
												) : null}
												<Upload {...propsUpload} className="upload">
													<ButtonUpload loading={isUploading}>
														<Icon type="upload" /> Chọn tệp
													</ButtonUpload>
													<span className="note">Cho phép loại tệp jpg, png, jpeg.Tối đa 2mb</span>
												</Upload>
											</Col>
										</Row>
									</AvatarUploadStyle>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12}>
								<Row>
									<Col xs={24} md={24}>
										<Form.Item label="Họ tên" labelAlign="left">
											{getFieldDecorator('name', {
												rules: [
													{
														required: true,
														message: 'Không được để trống họ tên',
													},
												],
											})(<Input placeholder="Nhập họ tên" />)}
										</Form.Item>
									</Col>
									<Col xs={24} md={24}>
										<Col xs={24} sm={12} md={24}>
											<Form.Item label="CMND" labelAlign="left">
												{getFieldDecorator('idCard', {
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
												})(<Input placeholder="Nhập CMND" />)}
											</Form.Item>
										</Col>
									</Col>
								</Row>
							</Col>
							{/* <Col xs={24} sm={12} md={24}>
								<Form.Item label="Mật khẩu" labelAlign="left">
									{getFieldDecorator('password', {
										rules: [
											{
												required: true,
												message: 'Không được để trống mật khẩu',
											},
										],
									})(<Input.Password placeholder="Nhập mật khẩu" />)}
								</Form.Item>
							</Col> */}
							<Col xs={24} sm={12} md={12}>
								<Form.Item label="Giới Tính" labelAlign="left">
									{getFieldDecorator('sex', {
										rules: [
											{
												required: true,
												message: 'Không được để trống giới tính',
											},
										],
									})(
										<Radio.Group>
											<Radio value={1}>Nam</Radio>
											<Radio value={2}>Nữ</Radio>
										</Radio.Group>,
									)}
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12}>
								<Form.Item label="Điện thoại" labelAlign="left">
									{getFieldDecorator('phoneNumber', {
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
									})(<Input placeholder="Nhập số điện thoại" />)}
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12}>
								<Form.Item label="Ngày sinh" labelAlign="left">
									<ConfigProvider locale={viVN}>
										{getFieldDecorator('birthDay', {
											rules: [
												{
													required: true,
													message: 'Không được để trống ngày sinh',
												},
											],
										})(<DatePicker disabledDate={disabledDate} placeholder="Ngày sinh" format="DD-MM-YYYY" />)}
									</ConfigProvider>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12}>
								<Form.Item label="Quê Quán" labelAlign="left">
									{getFieldDecorator('country', {
										rules: [
											{
												required: true,
												message: 'Không được để trống quê quán',
											},
										],
									})(
										<Select showSearch placeholder="Chọn quê quán">
											{countries.map(ele => (
												<Select.Option value={ele.key} key={ele.key}>
													{ele.name}
												</Select.Option>
											))}
										</Select>,
									)}
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12}>
								<Form.Item label="Địa chỉ" labelAlign="left">
									{getFieldDecorator('address', {
											rules: [
												{
													required: true,
													message: 'Không được để trống địa chỉ',
												},
											],
									})(<Input placeholder="Nhập địa chỉ" />)}
								</Form.Item>
							</Col>
						</Row>

						<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
							<Button icon="plus" className="btn-submit" htmlType="submit" loading={loadingCreate}>
								Tạo học viên
							</Button>
						</span>
					</Form>
				</Card>
			</div>
		</div>
	);
}

CreateStudent.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	createStatus: PropTypes.string.isRequired,
	createReq: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	createStatus: state.accountPage.createStudentStatus,
});

const mapDispatchToProps = {
	createReq: AccountAction.createStudentRequest,
};
export default Form.create({ name: 'student-create' })(connect(mapStateToProps, mapDispatchToProps)(CreateStudent));
