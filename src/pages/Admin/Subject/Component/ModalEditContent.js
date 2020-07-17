import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Upload, message, Modal } from 'antd';
import _ from 'lodash';

import customMess from '../../../../utils/customMessage';
import PreviewFile from '../../../../components/PreviewFile';
import { apiUploadDocument } from '../../../../apis/apiUpload';
import { ModalEditContentStyle } from '../styled';
import { HOST_SERVER } from '../../../../constands/Other';

const { confirm } = Modal;

function ModalEditContent(props) {
	const [isUpdate, setIsUpdate] = useState(false);
	const [formData, setFormData] = useState({});
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const { data, visible, setVisible, loadingUpdate, updateReq, removeFile, loadingRemoveFile, subjectID } = props;
	const token = localStorage.getItem('token');
	const propUpload = {
		showUploadList: false,
		headers: {
			accesstoken: token || null,
		},
		action: apiUploadDocument,
		name: 'file',
		onChange(info) {
			const { status, name, response } = info.file;
			if (status !== 'uploading') {
				setIsUploading(true);
			}
			if (status === 'done') {
				const { path, url, size } = response;
				const convertSize = (size / 1024 / 1024).toFixed(3);
				setIsUploaded(true);
				setIsUploading(false);
				setFormData({ ...formData, path, url, size: convertSize });
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
						setFormData({});
						setIsUpdate(false);
						setVisible(false);
					}
				},
			});
		}
	};
	const handleCancelEdit = () => {
		if (_.isEmpty()) {
			setFormData({});
			setIsUploaded(false);
			setIsUpdate(false);
		}
		if (!_.isEmpty(formData) && formData.title !== '') {
			confirm({
				title: 'Bạn chắc chắn hủy cập nhật nội dung môn học ?',
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
		}
	};
	const handleUpdate = () => {
		if (!_.isEmpty(formData) && formData.title === '') customMess('message', 'warning', 'Không được để trống tiêu đề');
		else {
			updateReq({
				req: {
					...formData,
					documentID: data && data._id,
				},
				ID: subjectID,
				cb: res => {
					if (res && res.isUpdated) {
						setFormData({});
						setIsUpdate(false);
						customMess('notification', 'success', res.msg);
					}
				},
			});
		}
	};
	const onChangeInput = e => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const renderBody = () => {
		if (!_.isEmpty(formData) && formData.url)
			return <PreviewFile file={`${HOST_SERVER}/${formData && formData.url}`} type="pdf" />;
		return <PreviewFile file={`${HOST_SERVER}/${data && data.url}`} type="pdf" />;
	};
	return (
		<ModalEditContentStyle
			className="phh-modal"
			width="700px"
			centered
			visible={visible}
			onCancel={handleCancel}
			title={
				isUpdate ? (
					<div className="title-input">
						Tiêu đề :
						<Input name="title" defaultValue={data && data.title} onChange={onChangeInput} />
					</div>
				) : (
					<span>{data && data.title}</span>
				)
			}
			footer={
				<span className="flex" style={{ justifyContent: 'flex-end' }}>
					{isUpdate ? (
						<React.Fragment>
							<Button
								className="btn-submit mr-5"
								loading={loadingUpdate}
								disabled={_.isEmpty(formData)}
								onClick={handleUpdate}
							>
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
		</ModalEditContentStyle>
	);
}

ModalEditContent.propTypes = {
	data: PropTypes.objectOf(PropTypes.object).isRequired,
	subjectID: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
	loadingRemoveFile: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	updateReq: PropTypes.func.isRequired,
	removeFile: PropTypes.func.isRequired,
};

export default ModalEditContent;
