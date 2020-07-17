import { createGlobalStyle } from 'styled-components';

const ResponsizeStyle = createGlobalStyle`
@media only screen and (max-width: 425px) {
	// #####  sider
	.phh-siderBarMobile {
		.logo {
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 50px;
				height: 50px;
			}
			h1 {
				color: #fff;
				margin-left: 5px;
				font-size: 20px;
			}
		}
		.ant-drawer-content-wrapper {
			width: 240px !important;
			.ant-drawer-header {
				background-color: #2f4050 !important;
				border-radius: unset !important;
				padding: 16px !important;
				border-bottom: unset !important;
				.ant-drawer-close {
					width: 50px !important;
					height: 50px !important;
					top: -15px !important;
					right: -10px !important;
					color: #fff !important;
				}
			}
			.ant-drawer-body {
				padding: 0 !important;
			}
		}
	}
	// ##### end
	// #### summary box
	.phh-summary-box{
		.phh-summary-content {
			width:60% !important;
		}
	}
	// #### end summary boxF

	// #####  other
	.btn-reload{
		span{
			display:none !important;
		}
	}
	.phh-group-ex {
		display: flex;
		flex-direction: row;
		.ant-input-search {
			width: 100% !important;
		}
	}
	.phh-card {
		.ant-card-head-wrapper {
			display: unset !important;
			.ant-card-head-title {
				padding: 16px 0 0 0 !important;
			}
			.ant-card-extra {
				width: 100% !important;
			}
		}
	}
	// ##### end other
	// ##### chart 
	.chart-container{
		height:250px !important;
	}
	.chart-extra{
		h2, .btn-chart, .ant-input{
			margin-bottom:1em;
		}
	}
}
.group-option{
	flex-redirection:column;
}
`;
export default ResponsizeStyle;
