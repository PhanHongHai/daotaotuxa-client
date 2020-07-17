import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Upload, message, Modal } from 'antd';
import _ from 'lodash';

import customMess from '../../../../utils/customMessage';
import PreviewFile from '../../../../components/PreviewFile';
import { apiUploadProfile } from '../../../../apis/apiUpload';
import { ModalEditProfileStyle } from '../Account.styled';
import { HOST_SERVER } from '../../../../constands/Other';

const { confirm } = Modal;

function ModalEditProfile(props) {
	const [isUpdate, setIsUpdate] = useState(false);
	const [formData, setFormData] = useState({});
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const [currentData, setCurrentData] = useState({});
	const { data, visible, setVisible, loadingUpdate, updateReq, removeFile, loadingRemoveFile, studentID } = props;
	const token = localStorage.getItem('token');
	const propUpload = {
		showUploadList: false,
		headers: {
			accesstoken: token || null,
		},
		action: apiUploadProfile,
		name: 'file',
		onChange(info) {
			const { status, name, response } = info.file;
			if (status !== 'uploading') {
				setIsUploading(true);
			}
			if (status === 'done') {
				const { path, url } = response;
				setIsUploaded(true);
				setIsUploading(false);
				setFormData({ ...formData, path, url });
				message.success(`${name} tải lên thành công.`);
			} else if (status === 'error') {
				setIsUploaded(false);
				setIsUploading(false);
				message.error(`${name} tải tệp lên thất bại.`);
			}
		},
		beforeUpload(file) {
			const isImage = file.type === 'application/pdf';
			if (!isImage) {
				message.error('Tệp không hợp lệ');
			}
			return isImage;
		},
	};

	const handleCancel = () => {
		if (!isUploaded && _.isEmpty(formData)) setVisible(false);
		if (isUploaded && !_.isEmpty(formData) && formData.path) {
			removeFile({
				req: {
					path: formData.path,
				},
				cb: res => {
					if (res && res.isRemoved) {
						setCurrentData({});
						setFormData({});
						setIsUpdate(false);
						setVisible(false);
					}
				},
			});
		}
	};
	const handleCancelEdit = () => {
		if (!_.isEmpty(formData)) {
			confirm({
				title: 'Bạn chắc chắn hủy cập nhật hồ sơ ?',
				onOk() {
					if (formData && formData.path) {
						removeFile({
							req: {
								path: formData.path,
							},
							cb: res => {
								if (res && res.isRemoved) {
									setFormData({});
									setIsUploaded(false);
									setIsUpdate(false);
								}
							},
						});
					}
				},
				okText: 'Xác nhận',
				className: 'model-confirm',
				cancelText: 'Hủy',
			});
		} else setIsUpdate(false);
	};
	const handleUpdate = () => {
		updateReq({
			req: {
				...formData,
				profileID: data && data._id,
			},
			ID: studentID,
			cb: res => {
				if (res && res.isUpdated) {
					if (formData && formData.url) setCurrentData({ ...formData });
					setFormData({});
					setIsUpdate(false);
					setIsUploaded(false);
					customMess('notification', 'success', res.msg);
				}
			},
		});
	};
	const onChangeInput = e => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const renderBody = () => {
		if (!_.isEmpty(formData) && formData.url)
			return <PreviewFile file={`${HOST_SERVER}/${formData && formData.url}`} type="pdf" />;
		if (currentData && currentData.path && currentData.url)
			return <PreviewFile file={`${HOST_SERVER}/${currentData && currentData.url}`} type="pdf" />;
		return <PreviewFile file={`${HOST_SERVER}/${data && data.url}`} type="pdf" />;
	};
	return (
		<ModalEditProfileStyle
			className="phh-modal"
			width="700px"
			centered
			visible={visible}
			onCancel={handleCancel}
			title={
				isUpdate ? (
					<div>
						Tên hồ sơ :
						<Input
							name="title"
							defaultValue={currentData && currentData.title ? currentData.title : data && data.title}
							onChange={onChangeInput}
						/>
					</div>
				) : (
					<span>{currentData && currentData.title ? currentData.title : data && data.title}</span>
				)
			}
			footer={
				<span className="flex" style={{ justifyContent: 'flex-end' }}>
					{isUpdate ? (
						<React.Fragment>
							<Button className="btn-submit mr-5" loading={loadingUpdate} onClick={handleUpdate}>
								Lưu
							</Button>
							<Upload {...propUpload}>
								<Button loading={isUploading} className="btn-submit mr-5" icon="upload">
									Tải tệp lên
								</Button>
							</Upload>
							<Button onClick={handleCancelEdit} className="btn-cancel">
								Hủy
							</Button>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Button className="btn-submit mr-5" onClick={() => setIsUpdate(true)}>
								Cập nhật
							</Button>
							<Button onClick={handleCancel} loading={loadingRemoveFile} className="btn-cancel">
								Đóng
							</Button>
						</React.Fragment>
					)}
				</span>
			}
		>
			{renderBody()}
		</ModalEditProfileStyle>
	);
}

ModalEditProfile.propTypes = {
	data: PropTypes.objectOf(PropTypes.object).isRequired,
	studentID: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
	loadingRemoveFile: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	updateReq: PropTypes.func.isRequired,
	removeFile: PropTypes.func.isRequired,
};

export default ModalEditProfile;
