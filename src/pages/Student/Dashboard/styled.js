import styled from 'styled-components';

import {BASE_COLOR} from '../../../constands/Other';

export const DashboardStyle = styled.div`
	.frame {
		overflow: scroll;
		height: 400px;
	}
`;

export const InfoTeacherStyle = styled.div`
	.ant-avatar {
		margin: 0 auto 10px auto !important;
		display: block;
	}
	.profile-info {
		ul {
			padding: 0 !important;
			li {
				list-style: none !important;
				display: flex;
				align-items: center;
				margin-top: 15px;
				span {
					width: 40px;
					height: 40px;
					display: inline-flex;
					border-radius: 20px;
					background-color: #d4f2e1 !important;
					justify-content: center;
					align-items: center;
					i {
						font-size: 1.2rem !important;
						color: #0ba360 !important;
					}
				}
				p {
					display: inline-block;
					margin: 0 0 0 10px !important;
				}
			}
		}
	}
`;
export const sTYLED = styled.div``;

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
