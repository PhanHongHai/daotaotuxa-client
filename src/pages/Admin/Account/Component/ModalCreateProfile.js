import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Upload, Icon, Modal, message } from 'antd';

import { UploadContainer, ReUploadContainer } from '../Account.styled';
import { apiUploadProfile } from '../../../../apis/apiUpload';
import customMess from '../../../../utils/customMessage';

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

const token = localStorage.getItem('token');

function ModalCreateProfile(props) {
	const {
		visible,
		setVisible,
		studentID,
		form: { getFieldDecorator, validateFields, resetFields },
		loadingCreateProfile,
		loadingRemoveFile,
		createProfileReq,
		removeFile,
	} = props;
	const [formData, setFormData] = React.useState({});
	const [isUploading, setIsUploading] = React.useState(false);
	const [isUploaded, setIsUploaded] = React.useState(false);
	const [fileName, setFileName] = React.useState('');
	const propUpload = {
		showUploadList: false,
		headers: {
			accesstoken: token || null,
		},
		action: apiUploadProfile,
		name: 'file',
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				setIsUploading(true);
			}
			if (status === 'done') {
				const {
					response: { path, url },
					name,
				} = info.file;

				setIsUploaded(true);
				setIsUploading(false);
				setFileName(name);
				setFormData({ ...formData, path, url });
				message.success(`${info.file.name} upload file thành công.`);
			} else if (status === 'error') {
				setIsUploaded(false);
				setIsUploading(false);
				message.error(`${info.file.name} upload file thất bại.`);
			}
		},
		beforeUpload(file) {
			const isImage = file.type === 'application/pdf';
			if (!isImage) {
				message.error('File không hợp lệ');
			}
			return isImage;
		},
	};
	const onChangeTitle = e => {
		const { value, name } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		validateFields(errs => {
			if (!errs && !formData.url) message.warning('Không được để trống tệp hồ sơ');
			if (!errs && formData.url) {
				createProfileReq({
					req: {
						...formData,
						accountID: studentID,
					},
					cb: res => {
						if (res && res.isCreated) {
							setFormData({});
							resetFields();
							setFileName('');
							setVisible(false);
							customMess('notification', 'success', res.msg);
						}
					},
				});
			}
		});
	};
	const handleCancel = () => {
		if (!isUploaded) {
			setFormData({});
			setFileName('');
			setVisible(false);
		}
		if (formData && formData.path && isUploaded) {
			removeFile({
				req: {
					path: formData.path,
				},
				cb: res => {
					if (res && res.isRemoved) {
						setFormData({});
						setFileName('');
						setVisible(false);
					}
				},
			});
		}
	};
	return (
		<Modal className="phh-modal" title="Tạo mới hồ sơ" visible={visible} onCancel={handleCancel} footer={null}>
			<Form className="create-subject form-custom" {...formItemLayout} onSubmit={handleSubmit}>
				<Form.Item label="Tiêu đề">
					{getFieldDecorator('title', {
						rules: [
							{
								required: true,
								message: 'Không được để trống tiêu đề',
							},
						],
					})(<Input onChange={onChangeTitle} name="title" placeholder="Nhập tiêu đề bài học" />)}
				</Form.Item>
				<Form.Item label="Tải hồ sơ">
					{fileName && fileName !== '' ? (
						<ReUploadContainer>
							<p>{fileName}</p>
							<div className="upload-container">
								<Upload {...propUpload}>
									<Button loading={isUploading || loadingCreateProfile}>
										<Icon type="upload" /> {isUploading ? 'Đang tải lên' : 'Chọn file mới'}
									</Button>
								</Upload>
							</div>
						</ReUploadContainer>
					) : (
						<UploadContainer>
							<Upload {...propUpload}>
								<Button loading={isUploading || loadingCreateProfile}>
									<Icon type="upload" /> {isUploading ? 'Đang tải lên' : 'Chọn file'}
								</Button>
							</Upload>
							<p> Cho phép loại tệp pdf.</p>
						</UploadContainer>
					)}
				</Form.Item>

				<span className="flex" style={{ justifyContent: 'flex-end' }}>
					<Button icon="plus" className="btn-submit" htmlType="submit" loading={loadingCreateProfile}>
						Tạo hồ sơ
					</Button>
					<Button className="btn-cancel ml-5" onClick={handleCancel} loading={loadingRemoveFile}>
						Hủy
					</Button>
				</span>
			</Form>
		</Modal>
	);
}

ModalCreateProfile.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.object).isRequired,
	loadingCreateProfile: PropTypes.bool.isRequired,
	loadingRemoveFile: PropTypes.bool.isRequired,
	createProfileReq: PropTypes.func.isRequired,
	removeFile: PropTypes.func.isRequired,
	studentID: PropTypes.string.isRequired,
};

export default Form.create({ name: 'create-lesson' })(ModalCreateProfile);
