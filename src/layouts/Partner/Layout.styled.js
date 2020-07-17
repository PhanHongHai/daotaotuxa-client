import styled from 'styled-components';

import { Layout } from 'antd';
import { BASE_COLOR } from '../../constands/Other';
import background from '../../assets/images/header-profile.png';

const colorSider = '#2f4050';

const tempWidthSider = `
  max-width: 240px !importan;
  min-width: 240px !important;
  width: 240px !important;
  flex: 0 0 240px !important;
`;

// #### styled components

export const PartnerLayout = styled.div`
	.ant-layout.ant-layout-has-sider {
		flex-direction: column !important;
	}
`;

export const LayoutCustom = styled(Layout)`
	width: 100%;
	height: 100%;
	.ant-layout {
		background-color: #f9fafb !important;
	}
	.ant-layout-sider-collapsed {
		.info-user {
			display: none !important;
			color: #fff;
		}
	}
	.ant-layout.ant-layout-has-sider {
		flex-direction: unset !important;
	}
`;

export const HeaderCustom = styled(Layout.Header)`
	height: 55px !important;
	background: #fff !important;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
	padding: 0 !important;
	width:100%:
	.icon-fold-custom {
		margin-left: 1em;
	}
	.logo {
		height: 55px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 200px;
		float: left;
		background-color: ${BASE_COLOR};
		img {
			margin-left: 1em;
			width: 50px;
			height: 50px;
		}
		h1 {
			color: #fff;
			margin-left: 5px;
			height: 100%;
			padding-right: 10px;
			font-size: 15px !important;
		}
	}
	@media only screen and (max-width: 425px) {
		width: 100% !important;
		margin-left: unset !important;
		left: 0 !important;
		.logo {
			display: none !important;
		}
	}
`;
export const HeaderLayout = styled.div`
	background-image: linear-gradient(128deg, #00897c, #1ea69b);
	width: 100%;
	height: 100%;
	position: relative;
	border-bottom: 1px solid hsla(0, 0%, 100%, 0.15);
	.head-content {
		padding: 2em 1.5em 2em 1.5em;
		max-width: 1120px;
		margin: auto;
		img {
			width: 104px;
			height: 100px;
		}
		span {
			h1 {
				font-size: 1.99rem;
				color: #fff !important;
				font-weight: bold;
				margin: unset !important;
			}
			p {
				color: hsla(0, 0%, 100%, 0.5) !important;
				font-size: 1rem;
			}
		}
		.button-edit {
			width: 150px;
			height: 50px;
			background: transparent;
			color: #fff;
			border-color: #fff;
			border-width: 2px;
			margin-top: 1.5em;
			&:hover {
				background: #fff !important;
				color: #1ea69b;
			}
		}
	}
	@media only screen and (max-width: 445px) {
		.head-content {
			img {
				display: block;
				margin: auto;
			}
			span {
				text-align: center;
			}
			.button-edit {
				display: block;
				margin: 1.5em auto 0 auto !important;
			}
		}
	}
`;

export const SiderCustom = styled(Layout.Sider)`
	${props => (!props.collapsed ? tempWidthSider : '')}
	height: 100vh;
	position: fixed !important;
	left: 0;
	box-shadow: 0 8px 10px 0 rgba(183, 192, 206, 0.2);
	-webkit-transition: width 0.1s ease, margin 0.1s ease-out;
	transition: width 0.1s ease, margin 0.1s ease-out;
	z-index: 999;
	.ant-layout-sider-children {
		background-color: ${colorSider};
		ul.ant-menu {
			height: 100% !important;
			position: relative;
			background-color: ${colorSider} !important;
			.ant-menu-item {
				margin: 0 !important;
			}
			.ant-menu-item-selected {
				background: ${BASE_COLOR} !important;
				color: white !important;
			}

			ul.ant-menu-sub {
				background-color: #293846 !important;
				border-left: 4px solid #17ab7b;
			}
		}
	}
	.logo {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1em;
		img {
			width: 50px;
			height: 50px;
		}
		h1 {
			color: #fff;
			margin-left: 5px;
			display: ${props => (!props.collapsed ? 'block' : 'none')};
		}
	}
	.info {
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url(${background});
		padding: 1em;
		flex-direction: column;
		.info-user {
			color: #fff;
			font-size: 14px;
		}
	}
`;

export const SiderMobileCustom = styled(SiderCustom)``;

export const GroupMenuHeader = styled.div`
	float: right;
	display: flex;
	margin-right: 1em;
	.phh-menuNoti {
		margin: 0 20px;
		i {
			font-size: 18px;
		}
	}
	.text-welcome {
		color: #888888 !important;
		font-size: 13px;
	}
	@media only screen and (max-width: 425px) {
		.text-welcome {
			display: none !important;
		}
	}
`;

export const ContentCustom = styled(Layout.Content)`

`;
