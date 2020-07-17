import React, { useState } from 'react';
import { Avatar, Upload, Icon, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { ButtonUpload, AvatarUploadStyle } from '../styled';

import AccountAction from '../../../Profile/Action';

import customMess from '../../../../utils/customMessage';
import { apiUploadAvatar } from '../../../../apis/apiUpload';
import { HOST_SERVER } from '../../../../constands/Other';

export default function UploadAvatar() {
	const token = localStorage.getItem('token');
	const [isUploaded, setIsUploaded] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [formData, setFormData] = useState({});
	const infoAccount = useSelector(state => state.loginPage.profileUser);
	const loadingEdit = useSelector(state => state.profileAccountPage.updateInfoStatus);

	const dispatch = useDispatch();

	const propUpload = {
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
				if (!_.isEmpty(formData)) {
					dispatch(
						AccountAction.removeFileAvatarRequest({
							req: {
								path: formData.pathAvatar,
							},
							cb: res => {
								if (res && res.isRemoved) {
									//	setFormData({});
								}
							},
						}),
					);
				}
				setFormData({ avatar: url, pathAvatar: path });
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
			return isImage;
		},
	};
	const handleUpdateAvatar = () => {
		dispatch(
			AccountAction.updateProfileRequest({
				req: {
					...formData,
				},
				cb: res => {
					if (res) {
						setFormData({});
						setIsUploaded(false);
						setIsUploading(false);
						customMess('notification', 'success', res.msg);
					}
				},
			}),
		);
	};
	return (
		<AvatarUploadStyle>
			{isUploaded ? (
				<Avatar
					style={{ border: ' 1px solid silver' }}
					shape="square"
					size={150}
					src={`${HOST_SERVER}/${formData.avatar}`}
				/>
			) : (
				<Avatar
					shape="square"
					size={150}
					style={{ border: ' 1px solid silver' }}
					src={
						infoAccount && infoAccount.avatar
							? `${HOST_SERVER}/${infoAccount.avatar}`
							: 'https://via.placeholder.com/150'
					}
				/>
			)}
			<Upload className="upload-container" {...propUpload}>
				<ButtonUpload loading={isUploading}>
					<Icon type="upload" /> Chọn tệp
				</ButtonUpload>
				<span className="note">Cho phép loại tệp jpg, png, jpeg.Tối đa 2mb</span>
			</Upload>
			{isUploaded ? (
				<ButtonUpload
					style={{ marginTop: '2.3em' }}
					icon="form"
					loading={loadingEdit && loadingEdit === 'FETCHING'}
					onClick={handleUpdateAvatar}
				>
					Cập nhật
				</ButtonUpload>
			) : (
				''
			)}
		</AvatarUploadStyle>
	);
}
