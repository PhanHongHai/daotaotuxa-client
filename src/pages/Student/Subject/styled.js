import styled from 'styled-components';
import { List } from 'antd';

export const FrameViewLessonStyle = styled.div`
	background: #fff;
	border: 0 solid #ebf2f2;
	box-shadow: 0 2px 1px -1px rgba(48, 64, 62, 0.2), 0 1px 1px 0 rgba(48, 64, 62, 0.14),
		0 1px 3px 0 rgba(48, 64, 62, 0.12);
	.lesson-title {
		display: block;
		background: #1bb394;
		border-bottom: 1px solid silver;
		width: 100%;
		height: 80px;
		text-align: center;
		padding: 2em;
		h2 {
			color: #fff !important;
		}
	}
	.frame-container {
		width: 100%;
		.box {
			border-radius: 0 !important;
		}
		.frame-file {
			overflow: auto;
			height: 450px;
			max-height: 450px;
			canvas {
				transition: transform 0.25s, visibility 0.25s ease-in;
			}
		}
	}
`;

export const ListSubjectStyle = styled(List)`
	.subject-item {
		background: #fff !important;
		box-shadow: 0 2px 1px -1px rgba(48, 64, 62, 0.2), 0 1px 1px 0 rgba(48, 64, 62, 0.14),
			0 1px 3px 0 rgba(48, 64, 62, 0.12);
		transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
		will-change: box-shadow;
		background-clip: border-box;
		border: 0 solid #ebf2f2;
		border-radius: 0.25rem;
		.ant-list-item-meta-avatar {
			margin-left: 16px;
		}
	}
`;

export const LessonStyle = styled.div`
	position: relative;
	.sidebar-lesson {
		width: 450px;
		overflow-y: scroll;
		background: #fff;
		border: 0 solid #ebf2f2;
		min-height: 585px;
		box-shadow: 0 2px 1px -1px rgba(48, 64, 62, 0.2), 0 1px 1px 0 rgba(48, 64, 62, 0.14),
			0 1px 3px 0 rgba(48, 64, 62, 0.12);
		.lesson-list {
			ul {
				li {
					text-align: justify;
					padding-left: 1em;
					&.active{
						background:#1ca4998f !important;
						span{
							color:#fff !important;
						}
					}
				}
			}
		}
	}
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
			text-align: center;
			width:145px;
		}
		.ant-tabs-tab-prev,
		.ant-tabs-tab-next {
			background: #e2dfdf !important;
		}
	}
	@media only screen and (max-width: 425px) {
		.sidebar-lesson {
			width: 100% !important;
			min-height: 450px !important;
		}
		.tab-custom {
			.ant-tabs-tab,
			.ant-tabs-nav {
				width: 100% !important;
			}
		}
	}
`;
