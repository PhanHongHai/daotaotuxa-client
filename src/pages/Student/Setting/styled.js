import styled from 'styled-components';
import { Steps, Button } from 'antd';
import { BASE_COLOR } from '../../../constands/Other';

export const StepStyle = styled(Steps)`
	.ant-steps-item-container {
		display: flex;
		.ant-steps-icon-dot {
			width: 9px !important;
			height: 9px !important;
		}
		.ant-steps-item-icon {
			width: 11px !important;
		}
		.ant-steps-item-content {
			width: 100% !important;
			h3 {
				color: rgba(111, 107, 107, 0.85) !important;
			}
		}
	}
	@media only screen and (max-width: 425px) {
		margin-top: 15px !important;
	}
`;

export const ButtonBack = styled(Button)`
	color: ${BASE_COLOR} !important;
	border-color: ${BASE_COLOR} !important;
	&:focus {
		border-color: ${BASE_COLOR} !important;
		color: ${BASE_COLOR} !important;
	}
	@media only screen and (max-width: 425px) {
		margin: auto;
		display: block !important;
	}
`;
export const AvatarUploadStyle = styled.div`
	display: flex;
	.upload-container {
		margin-left: 1em;
		.note {
			display: block;
			color: black;
			font-size: 13px;
			padding: 1em;
		}
	}
	@media only screen and (max-width: 425px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

export const ButtonUpload = styled(Button)`
	width: 20vw;
	color: ${BASE_COLOR} !important;
	border-color: ${BASE_COLOR} !important;
	&:hover {
		border-color: ${BASE_COLOR} !important;
		color: #fff !important;
		background: ${BASE_COLOR} !important;
	}
	@media only screen and (max-width: 425px) {
		width: 100% !important;
	}
`;
