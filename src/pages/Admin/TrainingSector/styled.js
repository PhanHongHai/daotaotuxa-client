import styled from 'styled-components';
import { Tabs } from 'antd';

export const DetailSectorStyle = styled.div`
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

export const TabStyle = styled(Tabs)`
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
	}
	.ant-tabs-tab-prev,
		.ant-tabs-tab-next {
			background-color: #c7c5c52b !important;
			border: 1px solid #c7c5c52b !important;
		}
	@media only screen and (max-width: 425px) {
		.ant-tabs-nav,
		.ant-tabs-tab {
			width: 100% !important;
		}
	}
`;

export const SubjectItemStyle = styled.div``;
