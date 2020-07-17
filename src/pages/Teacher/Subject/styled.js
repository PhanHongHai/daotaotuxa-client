import styled from 'styled-components';
import { Modal } from 'antd';

const colorBase = '#1bb394';

export const SubjectStyle = styled.div`
.phh-list{
	ul.ant-list-items{
		li.ant-list-item{
			padding:1em !important;
			margin:12px 0;
			border: 1px solid #e8e8e8 !important;
		
		}
	}
	.phh-list-subject{
		ul{
			display:flex;
			align-items:center;
			padding:0 !important;
			li{
				list-style:none;
				margin-right: 1em;
			}
		}
	}
}
`;
export const DetailSubjectStyle = styled.div`
	.tab-custom {
		.ant-tabs-bar {
			margin: 0 0 10px 0 !important;
			.ant-tabs-nav {
				&:hover{
					color: #1bb394 !important;
				}
				.ant-tabs-tab-active {
					color: #1bb394 !important;
					background: #fff;
					border-color: #1bb394 !important;
					border-bottom: 3px solid #1bb394 !important;
				}
				.ant-tabs-tab{
					&:hover{
						color: #1bb394 !important;
					}
				}
			}
		}
		.ant-tabs-tab{
			margin-right:unset !important;
			border-radius:unset !important;
			width:250px;
			text-align:center;
		}
	}
	.group-update-subject{
		display:flex;
		align-items:center;
		.ant-form-item{
			margin-bottom:unset !important;
		}
		input{
			width:250px;
			border-color:${colorBase} !important;
			&:hover, &:focus{
				border-color:${colorBase} !important;
			}
		}
	}
	.title-tab{
		display:inline-flex;
		justify-items: center;
		align-items:center;
		button{
			margin-left:1em;
			justify-items: center;
			display: flex;
			i{
				margin-left:5px;
			}
		}
	}
	.phh-list-lesson{
		ul.ant-list-items{
			li.ant-list-item{
				padding:0 !important;
				&:last-child{
					border-bottom: 1px solid #e8e8e8 !important;
				}
			}
		}
	}
	@media only screen and (max-width: 425px) {
		.tab-custom{
			.ant-tabs-nav,.ant-tabs-tab{
				width:100% !important;
			}
			.ant-tabs-tab-prev, .ant-tabs-tab-next{
				background-color: #c7c5c52b !important;
				border: 1px solid #c7c5c52b !important;
			}
		}
	}
`;


export const UploadContainer = styled.div`
	display: flex;
	button {
		width: 200px;
		height: 35px;
		border-color: ${colorBase} !important;
		&:focus {
			border-color: ${colorBase} !important;
			color: ${colorBase} !important;
		}
		&:hover {
			color: ${colorBase} !important;
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
			border-color: ${colorBase} !important;
			&:focus {
				border-color: ${colorBase} !important;
				color: ${colorBase} !important;
			}
			&:hover {
				color: ${colorBase} !important;
			}
		}
	}
`;
export const ModalEditContentStyle = styled(Modal)`
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