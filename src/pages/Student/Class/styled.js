import styled from 'styled-components';
import { List, Layout, Button } from 'antd';

import { BASE_COLOR } from '../../../constands/Other';
import { PreviewFileStyle } from '../../../styles/component.styled';

const { Sider } = Layout;

const tempWidthSider = `
  max-width: 300px !importan;
  min-width: 300px !important;
  width: 300px !important;
  flex: 0 0 300px !important;
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

export const InfoClassStyle = styled.div`
	ul {
		padding: 0 !important;
		li {
			list-style: none !important;
			display: flex;
			align-items: center;
			div {
				width: 33px;
				height: 33px;
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
`;

export const FrameViewLessonStyle = styled(PreviewFileStyle)`
	.pdf-container {
		width: 100%;
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
					&.active {
						background: #1ca4998f !important;
						span {
							color: #fff !important;
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
			width: 145px;
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

export const InfoTeacherSmallStyle = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	jusutify-content: center;
	align-items: center;
	.avatar {
		background: ${BASE_COLOR} !important;
		width: 100px;
    height: 90px;
    padding: 1em;
		img{
			width:100%;
			height:auto:
		}
	}
	ul.info{
		text-align: justify;
		li{
			margin-bottom: 4px;
			span{
				p{
					margin: 0 !important;
				}
				.btn-transparent{
					width: unset !important;
				}
			}
		}
	}
`;

export const LayoutReadFileStyle = styled(Layout)``;
export const SiderMenuFileStyle = styled(Sider)`
	${props => (props.isCollapsed ? '' : tempWidthSider)}
	height: 100vh;
`;

export const InfoSubjectStyle = styled.div`
	.carousel-custom {
		.slick-dots li {
			&.slick-active {
				button {
					background-color: ${BASE_COLOR} !important;
				}
			}
			button {
				width: 14px !important;
				height: 14px !important;
				border-radius: 20px !important;
				background: gray !important;
			}
		}
		.slick-dots-bottom {
			bottom: 30px !important;
		}
		.info-subject {
			display: flex;
			align-items: center;

			ul {
				margin-left: 3em;
				li {
				}
			}
		}
	}
`;

export const ListDocumentStyle = styled.div`
	.select-type {
		.ant-select {
			width: 100%;
			.ant-select-selection {
				border: unset !important;
				border-radius: 0 !important;
			}
		}
	}
	.list-file-item {
		.ant-card-body {
			padding: 0 !important;
		}
		ul {
			padding-top: 10px;
			max-height: 294px;
			//	overflow-y: scroll;
			li {
				margin-bottom: 1em;
				&::after {
					left: 0;
					right: unset !important;
					border-color: ${BASE_COLOR} !important;
				}
				&:focus,
				&:hover,
				&.ant-menu-item-selected {
					color: ${BASE_COLOR} !important;
				}
				&.ant-menu-item-selected {
					background-color: #1bb3941f !important;
				}
			}
		}
	}
`;

export const CommentViewStyle = styled.div`
	.collapse-message {
		background-color: #fff !important;
		.ant-comment-inner {
			padding: 0 !important;
		}
	}
	p.comment-text {
		background-color: #f3f3f3;
		padding: 1em;
		color: black !important;
	}
`;
export const BoxFeatureStyle = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	padding: 2em;
	flex-direction: column;
	align-items: center;
	i {
		font-size: 20px;
		margin-bottom: 10px;
		color:${BASE_COLOR} !important;
	}
	h3 {
		font-size: 13px;
		color:${BASE_COLOR} !important;
	}
`;

export const ButtonListStyle = styled(Button)`
	width: 100%;
	border: none !important;
	background-color: ${BASE_COLOR} !important;
	border-radius: unset !important;
	color: #fff !important;
	&:hover,
	&focus {
		color: #fff !important;
		filter: brightness(115%);
	}
`;
