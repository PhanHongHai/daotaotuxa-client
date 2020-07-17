import styled from 'styled-components';

import { BASE_COLOR } from '../../../constands/Other';

export const ProgressComponentStyled = styled.div`
	.progress {
		display: flex;
		justify-content: center;
	}
	.analy {
		.item {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			p {
				font-size: 13px !important;
			}
		}
	}
	button {
		margin: auto;
		width: 100%;
		display: block;
		background-color: ${BASE_COLOR} !important;
		color: #fff !important;
		&:hover,
		&:focus {
			color: #fff !important;
			filter: brightness(115%);
			border-color: ${BASE_COLOR} !important;
		}
	}
`;

export const CalendarAttendanceStyle = styled.div`
	.calendar-custom {
		.ant-fullcalendar-content {
			bottom: 21% !important;
			left: 20% !important;
		}
	}
`;

export const AttendancedDay = styled.div`
	width: 26px;
	height: 24px;
	background: #0ed6b14a !important;
`;

export const ListProfileStyle = styled.div``;

export const InfoStudentStyle = styled.div`
	border: 1px solid #f2f4f9;
	border-radius: 0.25rem;
	box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
	background-color: #fff;
	#info-header {
		#icon {
			width: 100%;
			height: 100px;
			position: relative;
			background-color: ${BASE_COLOR};
			h1 {
				color: #fff !important;
				font-size: 20px !important;
				padding: 10px;
			}
			img {
				height: 70px;
				position: absolute;
				right: 0;
				bottom: 0;
			}
			#btn-option{
				padding:10px;
				.ant-radio-button-wrapper{
					height:35px !important;
					border-radius:0 !important;
				}
			}
		}
		#avatar {
			position: absolute;
			top: 4.5em;
			left: 8%;
			.ant-avatar {
				border: 4px solid #fff;
			}
		}
		#info {
			margin-top: 3em;
			ul {
				padding: 0 1em 0 1em !important;
				li {
					list-style: none;
					border-top: 1px solid silver;
					padding: 10px;
					text-align: justify;
					color: black;
				}
			}
		}
	}
`;
