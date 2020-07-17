import styled from 'styled-components';
import { Modal } from 'antd';

import { BASE_COLOR } from '../../../constands/Other';

export const StundentAccount = styled.div`
	.tab-custom {
		.ant-tabs-bar {
			margin: 0 0 10px 0 !important;
			.ant-tabs-nav {
				&:hover {
					color: #1bb394 !important;
				}
				.ant-tabs-tab-active {
					color: #1bb394 !important;
					background: #fff;
					border-color: #1bb394 !important;
					border-bottom: 3px solid #1bb394 !important;
				}
				.ant-tabs-tab {
					&:hover {
						color: #1bb394 !important;
					}
				}
			}
		}
		.ant-tabs-tab {
			margin-right: unset !important;
			border-radius: unset !important;
			width: 100%;
			text-align: center;
		}
	}
	@media only screen and (max-width: 425px) {
		.tab-custom {
			.ant-tabs-nav {
				width: 100% !important;
			}
		}
	}
`;
export const TeacherAccount = styled.div``;
export const ListProfileStyle = styled.div`
	min-height: 450px;
	overflow-x: auto;
	@media only screen and (max-width: 425px) {
		width: 100%;
		min-height: 250px !important;
	}
`;
export const UploadContainer = styled.div`
	display: flex;
	button {
		width: 200px;
		height: 35px;
		border-color: ${BASE_COLOR} !important;
		&:focus {
			border-color: ${BASE_COLOR} !important;
			color: ${BASE_COLOR} !important;
		}
		&:hover {
			color: ${BASE_COLOR} !important;
		}
	}
	p {
		margin-left: 10px;
		font-size: 13px;
	}
	@media only screen and (max-width: 425px) {
		flex-direction: column;
		.ant-upload.ant-upload-select {
			width: 100%;
			button {
				width: 100% !important;
			}
		}
		p {
			text-align: center;
		}
	}
`;

export const ReUploadContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: left;
	p {
		margin-right: 10px;
	}
	.upload-container {
		padding: 0 !important;
		button {
			height: 35px;
			border-color: ${BASE_COLOR} !important;
			&:focus {
				border-color: ${BASE_COLOR} !important;
				color: ${BASE_COLOR} !important;
			}
			&:hover {
				color: ${BASE_COLOR} !important;
			}
		}
	}
`;

export const ModalEditProfileStyle = styled(Modal)`
	.ant-modal-title {
		input {
			width: 80% !important;
			height: 35px;
			font-size: 14px !important;
		}
	}
	.ant-modal-body {
		padding: 0 !important;
	}
`;
