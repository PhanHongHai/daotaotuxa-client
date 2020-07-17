import styled from 'styled-components';
import {Layout} from 'antd';

import { BASE_COLOR } from '../../constands/Other';


export const HeaderCustom = styled(Layout.Header)`
	background: ${BASE_COLOR} !important;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
	padding: 0 !important;
  width:100%;
  height:50px !important;
	.icon-fold-custom {
		margin-left: 1em;
	}
	.btn-back{
		background: transparent !important;
    color: #fff !important;
    border: none !important;
		font-weight: 500;
		height: 50px;
    position: absolute !important;
	}
	.logo {
		display: flex;
		justify-content: center;
	  align-items: center;
		width: 200px;
		height:50px !important;
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
		//	height: 100%;
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
export const GroupMenuHeader = styled.div`
	float: right;
	display: flex;
	margin-right: 1em;
	height: 50px !important;
//	align-items: center;
	line-height: 4em;
	.phh-menuNoti {
		margin: 0 20px;
		i {
			font-size: 18px;
			color:#fff !important;
		}
	}
	.text-welcome {
		color: #fff !important;
		font-size: 13px;
	}
	@media only screen and (max-width: 425px) {
		.text-welcome {
			display: none !important;
		}
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


export const ContentCustom = styled(Layout.Content)`

`;
