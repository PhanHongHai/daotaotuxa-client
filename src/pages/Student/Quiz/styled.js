import styled from 'styled-components';

import { BASE_COLOR } from '../../../constands/Other';

export const FrameQuestionStyle = styled.div`
	padding: 1em;
	.question-item {
		border-bottom: 1px solid silver;
		.question-name {
			text-align: justify;
			color: #585858;
		}
	}
	.radio-custom {
		.ant-radio-wrapper {
			color: #585858 !important;
		}
	}
`;

export const NotiStyle = styled.div`
	width: 600px;
	margin: auto;
	background: #fff;
	box-shadow: 0 2px 1px -1px rgba(48, 64, 62, 0.2), 0 1px 1px 0 rgba(48, 64, 62, 0.14),
		0 1px 3px 0 rgba(48, 64, 62, 0.12);
	transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
	will-change: box-shadow;
	background-clip: border-box;
	border: 0 solid #ebf2f2;
	border-radius: 0.25rem;
	.ant-result-extra {
		ul {
			display: flex;
			justify-content: center;
			padding: 0 !important;
			flex-wrap: wrap;
			li {
				list-style: none !important;
				margin-left: 2em;
				position: relative;
				padding-right: 1em;
				padding-top: 10px;
				&:first-child,
				&:nth-child(3) {
					&:after {
						content: '';
						width: 2px;
						position: absolute;
						top: 13px;
						right: -10px;
						height: 14px;
						background: silver;
					}
				}
			}
		}
	}
	@media only screen and (max-width: 425px) {
		width: 100% !important;
	}
`;

export const SidebarTimeStyle = styled.div`
	height: 100vh;
	border-right: 1px solid silver;
	h2 {
		color: black;
		font-weight: 500;
		text-align: center;
	}
	.info-schedule {
		ul {
			padding: 0;
			li {
				padding: 1em;
				border: 1px solid #e4e4e4;
				border-left: 0;
				border-right: 0;
				color: #1bb394;
				font-weight: 500;
			}
		}
	}
	.count-down-time {
		width: 150px;
		height: 150px;
		margin: auto;
		border-radius: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		background: ${BASE_COLOR};
		h3 {
			color: #fff;
		}
		span {
			font-size: 30px;
			color: #fff;
		}
	}
	.btn-send {
		width: 60%;
		margin: auto;
		display: block;
		background-color: ${BASE_COLOR} !important;
		color: #fff !important;
		border-color: #4dc3ab !important;
		&:focus {
			color: #fff !important;
			border-color: #4dc3ab !important;
		}
	}
	.btn-back {
		width: 60%;
		margin: auto;
		display: block;
		border-color: #4dc3ab !important;
		&:focus {
			border-color: #4dc3ab !important;
		}
	}
	.choice {
		span {
			&:first-child {
				background: #d4d4d4;
				width: 100%;
				height: 40px;
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
				color: black;
				font-weight: 500;
			}
			&:last-child {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				h2 {
					&:first-child {
						color: green;
						font-weight: bold;
					}
					&:last-child {
						color: red;
						font-weight: bold;
					}
				}
			}
		}
	}
	@media only screen and (max-width: 445px) {
		height: unset !important;
		box-shadow: 0 2px 1px -1px rgba(48, 64, 62, 0.2), 0 1px 1px 0 rgba(48, 64, 62, 0.14),
			0 1px 3px 0 rgba(48, 64, 62, 0.12);
		will-change: box-shadow;
		background-clip: border-box;
		border: 0 solid #ebf2f2;
		.sidebar-mobile {
			.frame-time {
				display: inline-block;
				padding: 10px 0 0 10px;
				p {
					font-weight: 500;
					font-size: 14px;
					display: inline-block;
					color: black;
				}
				.clock {
					display: inline-block;
					font-weight: 500;
					font-size: 14px;
					color: black;
				}
			}
			.btn-info {
				float: right;
				display: flex;
				button {
					height: 30px;
					margin: 6px 5px 0 0;
					border-color: ${BASE_COLOR} !important;
				}
			}
		}
	}
	.ant-anchor-wrapper {
		box-shadow: 0 2px 1px -1px rgba(48, 64, 62, 0.2), 0 1px 1px 0 rgba(48, 64, 62, 0.14),
			0 1px 3px 0 rgba(48, 64, 62, 0.12);
		will-change: box-shadow;
		background-clip: border-box;
		border: 0 solid #ebf2f2;
	}
`;

export const ResuleQuizStyle = styled.div`
	.result {
		ul {
			li {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: black;
				span {
					width: 70px;
					height: 70px;
					border: 5px solid #1bb394;
					border-radius: 40px;
					font-size: 17px;
					display: flex;
					justify-content: center;
					align-items: center;
					color: black;
					margin-bottom: 5px;
				}
				&:after {
					display: none;
				}
			}
		}
	}
	.btn-back {
		width: 40%;
		border-color: ${BASE_COLOR} !important;
		${BASE_COLOR} !important;
		margin: auto;
		&:focus {
			border-color: ${BASE_COLOR} !important;
			color: ${BASE_COLOR} !important;
		}
	}
`;
