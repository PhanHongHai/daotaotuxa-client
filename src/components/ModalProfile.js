import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Upload, message } from 'antd';
import _ from 'lodash';

import LoadingCustom from './LoadingCustom';
import UploadFile from './UploadFile';
import PreviewFile from './PreviewFile';

import { apiUploadProfile } from '../apis/apiUpload';

const token = localStorage.getItem('token');

function ModalProfile(props) {
	const { visible, setVisible, data, getStatus, studentID,getProfileReq } = props;

	const [isUploading, setIsUploading] = useState(false);
	const [localFileUrl, setLocalFileUrl] = useState(null);
	const renderBody = () => {
		if (localFileUrl !== null) return <PreviewFile file={localFileUrl} type="pdf" />;
		if (!_.isEmpty(data) && localFileUrl === null) return <PreviewFile file={data} type="pdf" />;
		return (
			<UploadFile
				setIsUploading={setIsUploading}
				loadingUpload={isUploading}
				apiUpload={apiUploadProfile(studentID)}
				setLocalFileUrl={setLocalFileUrl}
			/>
		);
	};
	const propsUpload = {
		name: 'file',
		action: apiUploadProfile(studentID),
		multiple: false,
		showUploadList: false,
		headers: {
			accesstoken: token || null,
		},
		onChange(info) {
			const { status } = info.file;
			if (status === 'uploading') {
				setIsUploading(true);
			}
			if (status === 'done') {
				setIsUploading(false);
				setLocalFileUrl(URL.createObjectURL(info.file.originFileObj));
				getProfileReq({
					ID:studentID
				});
				message.success(`${info.file.name} upload hồ sơ thành công.`);

			} else if (status === 'error') {
				setIsUploading(false);
				message.error(`${info.file.name} upload hồ sơ thất bại.`);
			}
		},
		beforeUpload(file) {
			const isImage = file.type === 'application/pdf';
			if (!isImage) {
				message.error('File không hợp lệ');
			}
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				message.error('Dung lượng file lớn hơn 2MB!');
			}
			return isImage && isLt2M;
		},
	};
	return (
		<Modal
			width="600px"
			className="phh-modal modal-preview"
			visible={visible}
			onCancel={() => {
				setLocalFileUrl(null);
				setVisible(false);
			}}
			footer={
				<span>
					{_.isEmpty(data) ? (
						''
					) : (
						<Upload {...propsUpload}>
							<Button className="btn" icon="upload">
								Cập nhập
							</Button>
						</Upload>
					)}
					<Button onClick={() => setVisible(false)} className="btn-cancel ml-10">
						Đóng
					</Button>
				</span>
			}
			title="Hồ sơ học viên"
		>
			{getStatus || isUploading ? <LoadingCustom margin={10} /> : renderBody()}
		</Modal>
	);
}

ModalProfile.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getProfileReq: PropTypes.func.isRequired,
	data: PropTypes.string.isRequired,
	getStatus: PropTypes.bool.isRequired,
	studentID: PropTypes.string.isRequired,
};

export default ModalProfile;
