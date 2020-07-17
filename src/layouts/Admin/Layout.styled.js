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

// const headerDefault = `
// width: calc(100% - 240px);
// right: 0;
// left: 240px;
// `;
// const headerResize = `
// width: calc(100% - 80px);
// left: 80px;
// right: 0;
// `;
const ContentDefault = `
width: calc(100% - 240px);
margin-left: 240px;
`;
const ContentResize = `
width: calc(100% - 80px);
margin-left: 80px;
`;

// #### styled components

export const LayoutCustom = styled(Layout)`
	width: 100%;
	height: 100vh;
	.ant-layout {
		background-color: #f9fafb !important;
		height: 100%!important;
	}
	.ant-layout-sider-collapsed {
		.info-user {
			display: none !important;
			color: #fff;
		}
	}
	@media only screen and (max-width:425px){
		height:100% !important;
	}
`;
export const LayoutMain = styled(Layout)`
	height: 100vh !important;
	background: #f9fafb;
	${props => (props.resize !== 'collapsed' ? ContentDefault : ContentResize)}
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	flex-direction: column;
	-webkit-transition: margin 0.1s ease, width 0.1s ease;
	transition: margin 0.1s ease, width 0.1s ease;

	@media only screen and (max-width: 425px) {
		width: 100% !important;
		margin-left: unset !important;
	}
`;

export const HeaderCustom = styled(Layout.Header)`
	height: 60px !important;
	background: transparent !important;
	border-bottom: 1px solid #e7eaec !important;
	padding: 0 20px !important;
	-webkit-transition: width 0.1s ease, left 0.1s ease;
	transition: width 0.1s ease, left 0.1s ease;
	padding: 0;
	width:100%:
	// position: fixed;
	// z-index: 978;
	.trigger {
		font-size: 20px;
	}

	@media only screen and (max-width: 425px) {
		width: 100% !important;
		margin-left: unset !important;
		left: 0 !important;
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
	.phh-menuAcc {
		height: 50px !important;
	}
	@media only screen and (max-width: 425px) {
		.text-welcome {
			display: none !important;
		}
	}
`;

export const ContentCustom = styled(Layout.Content)`
	//margin-top: 60px;
`;
