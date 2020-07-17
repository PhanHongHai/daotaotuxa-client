import React from 'react';
import { Icon, Upload, Spin, message } from 'antd';
import PropTypes from 'prop-types';

import LoadingCustom from './LoadingCustom';

const { Dragger } = Upload;
const token = localStorage.getItem('token');

function UploadFile(props) {
	const { apiUpload, loadingUpload, setIsUploading, setLocalFileUrl } = props;
	const propsUpload = {
		name: 'file',
		multiple: false,
		action: apiUpload,
		showUploadList:false,
		headers:{
			accesstoken: token || null,
		},
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				setIsUploading(true);
			}
			if (status === 'done') {
				setIsUploading(false);
				setLocalFileUrl(URL.createObjectURL(info.file.originFileObj));
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
		<div className="upload-container">
			<span className="upload-title">
				Upload nội dung <br /> (Các định dạng hỗ trợ .pdf)
			</span>
			<div className="upload-frame">
				<Dragger {...propsUpload}>
					<Spin spinning={loadingUpload} indicator={<LoadingCustom margin={0} />}>
						<div>
							<p className="ant-upload-drag-icon">
								<Icon type="file-pdf" />
							</p>
							<p className="ant-upload-text">Chọn file</p>
						</div>
					</Spin>
				</Dragger>
			</div>
		</div>
	);
}
UploadFile.propTypes = {
	apiUpload: PropTypes.string.isRequired,
	loadingUpload: PropTypes.bool.isRequired,
	setIsUploading: PropTypes.func.isRequired,
	setLocalFileUrl: PropTypes.func.isRequired,
};
export default UploadFile;
