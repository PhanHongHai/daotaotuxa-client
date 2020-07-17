import styled from 'styled-components';
import { Modal, Select } from 'antd';
import { BASE_COLOR } from '../../../constands/Other';

const colorBase = '#1bb394';

export const ClassContainer = styled.div`
	.profile-teacher {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.profile-info {
			ul {
				padding: 0;
				li {
					list-style: none;
					color: black;
					padding-bottom: 1em;
				}
			}
		}
	}
`;

export const ModalPickTeacher = styled(Modal)`
	.list-teacher {
		display: flex;
		justify-content: left;
		align-items: center;
	}
`;

export const ClassStyled = styled.div``;
export const ModalListStudent = styled(Modal)`
	.list-student-partner {
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			border: unset !important;
			background-color: transparent;
			outline: 0;
			margin: 0 5px 0 5px;
			height: 30px;
			box-shadow: unset !important;
			&:first-child {
				color: ${colorBase};
			}
			&:last-child {
				color: red;
			}
		}
	}
	.phh-collapse-student {
		border: 1px solid #1ab394;
		border-bottom: 1px solid #1ab394;
		.ant-collapse-content-box {
			padding: unset !important;
		}
	}
`;
export const ModalListTeacher = styled(Modal)`
	.list-student-partner {
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			border: unset !important;
			background-color: transparent;
			outline: 0;
			margin: 0 5px 0 5px;
			height: 30px;
			box-shadow: unset !important;
			&:first-child {
				color: ${colorBase};
			}
			&:last-child {
				color: red;
			}
		}
	}
`;
export const DetailClassStyle = styled.div`


.profile-teacher{
	display:flex;
	justify-content: left;
    align-items: center;
	.profile-info{
		font-size: 14px;
   // padding-left: 3em;
		li{
			margin-bottom:1em;
			color: black;
		}
	}
`;

export const SelectYearStyle = styled(Select)`
	.ant-select-selection--single {
		height: 35px !important;
		width: 80px !important;
		border-color: ${BASE_COLOR} !important;
		border-radius: 0 !important;
		&:hover,
		&:focus {
			border-color: ${BASE_COLOR} !important;
		}
	}
`;
