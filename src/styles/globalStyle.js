import { createGlobalStyle } from 'styled-components';
import _utilityClasses from './utilityClasses';
import { BASE_COLOR } from '../constands/Other';

const colorBase = '#1bb394';

const GlobalStyle = createGlobalStyle`
html {
	scroll-behavior: smooth;
}
html,
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif !important;
	background-color: #f3f3f4 !important;
}

.sk-center {
	.sk-circle-fade-dot:before {
		background-color: #22c388 !important;
	}
}

// #####  summary box

.phh-summary-box {
	display: flex;
	justify-content: left;
	align-items: center;
	background-color: #fff;
	padding: 1.5rem;
	-webkit-box-shadow: 0 0 4px 0px rgba(56, 65, 74, 0.23);
	box-shadow: 0 0 4px 0px rgba(56, 65, 74, 0.23);
	border-radius: 0.25rem;
	span {
		width: 50px;
		height: 50px;
		background-color: rgb(0, 189, 135);
		color: white;
		border-radius: 25px;
		display: flex;
		justify-content: center;
		font-size: 25px;
		align-items: center;
	}
	.phh-summary-content {
		margin-left: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		p {
			font-size: 13px;
		}
	}
}
// ##### end summary box
// #####  defind
.bread-crumb {
	padding: 24px !important;
	float: right;
}
.page-header {
	border-bottom: 1px solid #e7eaec !important;
	background-color: #fff !important;
	.ant-page-header {
		display: inline-block;
		.ant-page-header-title-view-title {
			font-size: 20px !important;
		}
	}
}
// ##### modal
.phh-modal{
	.ant-modal-close-x{
		i{
			color:#fff !important;
		}
	}
	.ant-modal-header{
		background-color: #1ab394;
		border-color: #1ab394;
		.ant-modal-title{
			color:#fff !important;
		}
		
	}

}
.model-confirm{
	.ant-btn{
		height: 30px !important;
		&:hover, &:focus{
			color:${colorBase} !important;
			border-color:${colorBase} !important;
		}
	}
	.ant-btn-primary{
		background-color:${colorBase} !important;
		float:right;
		color:#fff !important;
		&:hover, &:focus{
			color:#fff !important;
			border-color:${colorBase} !important;
		}
	}
}
// #####  other
.btn{
	background-color:${colorBase} !important;
	height:35px !important;
	color:#fff !important;
	&:hover, &:focus{
		color:#fff !important;
		filter: brightness(115%);
		border-color:${colorBase} !important;
	}
}

.btn-submit{
	background-color:${colorBase} !important;
	height:30px !important;
	color:#fff !important;
	&:hover, &:focus{
		color:#fff !important;
		filter: brightness(115%);
		border-color:${colorBase} !important;
	}
}
.phh-group-btn-action {
	display: flex;
	justify-content: center;
	align-items: center;
	.btn-type{
		margin: 0 5px 0 5px;
    height: 30px;
    width: 30px !important;
    color: black;
    background: white;
    border: 1px solid #e7eaec;
    font-size: .8rem;
    padding: .25rem .5rem;
    line-height: 1.5;
    border-radius: 4px;
	}
	button {
		margin: 0 5px 0 5px;
		height: 30px;
		width: 30px !important;
		color: black;
    background: white;
    border: 1px solid #e7eaec;
    font-size: .8rem;
    padding: .25rem .5rem;
		line-height: 1.5;
		&:hover,&:focus{
			color: black;
			border-color: #a9aaab;
		}
		i{
			color:black;
		}
	}
}
.phh-group-btn-default{
	button {
		margin: 0 5px 0 5px;
		height: 30px;
		color: black;
    background: white;
    border: 1px solid #e7eaec;
    font-size: .8rem;
    padding: .25rem .5rem;
		line-height: 1.5;
		&:hover,&:focus{
			color: black;
			border-color: #a9aaab;
		}
	}
}
.phh-group-search{
		button{
			text-shadow:unset !important;
			box-shadow:unset !important;
			background-color:#1bb394 !important;
			height:40px;
			border-color: ${colorBase} !important;
		}
		input{
			height:40px !important;
		}
}
button.btn-reload{
	border:unset !important;
	background-color:transparent !important;
	height: 38px;
	&:focus{
		box-shadow:unset !important;
		outline:0;
	}
}
.phh-group-ex {
	display: flex;
	justify-content: left;
	align-items: center;
	input {
		height: 35px;
	}
	button {
		margin: 0 0 0 10px;
		height: 35px !important;
	}
}
.group-btn {
	button {
		margin: 0 5px 0 5px;
		height: 35px;
		box-shadow: unset !important;
		&:first-child {
			background-color: ${colorBase} !important;
			color: white;
			&:hover{
				color:white !important;
			}
		}
		color:black;
		border-color:${colorBase};
		&:hover{
			color:${colorBase};
		}
	}
}
.ant-pagination{
.ant-pagination-item-active{
	background-color:${colorBase} !important;
	a,a:hover, a:focus{
		color:#fff;
	}
}
}
span.search-small{
	.ant-input-group-wrapper{
		width:350px !important;
		input{
			background-color: #edf0f2;
    	border-color: #edf0f2;
			color: #303840;
			&:focus{
				box-shadow:unset !important;
			}
		}
		.ant-input-group-addon{
			button{
				background-color:${colorBase} !important;
				border-color:${colorBase} !important;
			}
		}
	}
}
.phh-table {
	.ant-switch-checked {
	//	box-shadow: 0 2px 6px 0 #25b799a3 !important;

		background-color: ${colorBase} !important;
		.ant-switch-inner{
			width:55px;
		}
	}
	.ant-switch {
	//	box-shadow: 0 2px 6px 0 #25b799a3;
	
	}
	.ant-table-thead{
		th{
			padding:8px 15px !important;
			text-align:center;
		}
	}
	.ant-table-tbody{
		td{
			padding:8px 15px !important;
			text-align:center;
		}
	}
	.ant-pagination-prev, .ant-pagination-next, .ant-pagination-jump-prev, .ant-pagination-jump-next, .ant-pagination-item{
		min-width:25px !important;
		height:25px !important;
		line-height:25px !important;
	}
}

.create-account,
.form-custom,
.update-account {
	.ant-input-number {
		height: 35px;
		font-size: 14px !important;
		border-color: ${BASE_COLOR} !important;
		&:hover,&:focus{
			border-color: #1ab394;
			box-shadow: 0 0 0 2px #1ab3943b;
		}
	}
	input {
		height: 35px;
		padding-left: 10px !important;
		font-size: 14px !important;
	}
	.ant-select-selection--single {
		height: 35px !important;
	}
	.ant-calendar-picker-input{
		height: 35px !important;
		display:flex !important;
		align-items:center !important;
		
	}
	.btn-event{
		height:35px !important;
		border-color: ${colorBase} !important;
		&:focus,&:hover{
			color:${colorBase} !important;
		}
	}
	.ant-calendar-picker {
		width: 100%;
		height: 35px !important;
		input {
			padding-left: 12px !important;
			font-size: 14px !important;
		}
	}
}
.phh-rule-tree {
	display: flex;
	flex-wrap: wrap;
	li {
		margin-right: 50px;
		ul.ant-tree-child-tree {
			li {
				margin-right: unset !important;
			}
		}
	}
}
.form-custom{
	input, textarea, .ant-select-selection, .ant-calendar-picker-input,.ant-calendar-picker{
			border-color: ${BASE_COLOR} !important;
		&:hover,&:focus{
			border-color: #1ab394;
			box-shadow: 0 0 0 2px #1ab3943b;
		}
	}
	#student-create_country, .ant-select-search input{
		box-shadow:none;
	}
	input.ant-calendar-range-picker-input{
		&:hover,&:focus{
			border-color:unset !important;
			box-shadow:unset !important;
		}
	}
}
.title-input{
	input{
		border-color: ${BASE_COLOR} !important;
		height:35px !important;
		font-size: 14px !important;
		&:hover,&:focus{
			border-color: #1ab394;
			box-shadow: 0 0 0 2px #1ab3943b;
		}
	}
}
.container{
	max-width:1120px !important;
	padding:0 1.5em 0 1.5em;
	margin:auto;
}
.container-fluid{
	max-width:1280px !important;
	padding:0 .5em 0 .5em;
	margin:auto;


}
.phh-card{
	border: 1px solid #f2f4f9;
  border-radius: 0.25rem;
	box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
	.ant-card-head{
		border-bottom:unset !important;
	}
	.ant-card-body{
		padding:0 24px 24px 24px !important;
	}
}
.phh-card-v2{
	box-shadow: 0 2px 1px -1px rgba(48,64,62,.2), 0 1px 1px 0 rgba(48,64,62,.14), 0 1px 3px 0 rgba(48,64,62,.12);
	transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
	will-change: box-shadow;
	background-clip: border-box;
	border: 0 solid #ebf2f2;
	border-radius: .25rem;
}
i.icon-fold-custom{
	background-color: #1bb394;
	padding: 7px;
	color: #fff;
	border-radius: 3px;
	font-size: 18px !important;
}

.card-body-transparent{
	.ant-card-body{
		display:none !important;
	}
}
.card-no-pd{
	.ant-card-body{
		padding:0 !important;
	}
}
.card-transparent{
	background:transparent !important;
	.ant-card-head{
		border-bottom:unset !important;
		padding:0 10px !important;
		.ant-card-head-title{
			font-size:20px !important;
		}
	}
	.ant-card-body{
		padding:0 !important;
	}
}
.btn-transparent{
	background-color: transparent !important;
	outline: 0 !important;
	box-shadow: unset !important;
	border: none !important;
	color: #999c9e !important;
	font-weight: bold !important;
	box-shadow: unset!important;
  outline: 0 !important;
  width: 100% !important;
  text-align: left !important;
  height: 100% !important;
	i{
		font-weight: bold !important;
	}
}
.ant-dropdown{
	.ant-dropdown-menu {
		background-color: #2f4050 !important;
		.ant-dropdown-menu-item{
			color:#fff !important;
			&:hover{
			 background-color: #1bb394 !important;
			}
	}
	}
}
.sidebar-submenu{
	.ant-menu-sub{
		background-color: #2f4050 !important;
		color:#fff !important;
		.ant-menu-item{
			&:hover{
				background-color: #1bb394 !important;
			 }
		}
		.ant-menu-item-selected{
			background-color: #1bb394 !important;
		}
	}
}
.btn-cancel{
	height: 30px !important;
	&:hover, &:focus{
		color:${colorBase} !important;
		border-color:${colorBase} !important;
	}
}

.dropdown-origin{
	.ant-dropdown-menu{
		background-color: #fff !important;
		.ant-dropdown-menu-item{
			color:black !important;
			&:hover{
				color:#fff !important;
			}
		}
	}
}

// #### upload

.upload-container {
	background-color: #fff;
	border-radius: 5px;
	padding: 1em;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	.upload-title {
		text-align: center;
		margin-bottom:1em;
	}
	.upload-frame {
		display: flex;
		justify-content: center;
		width: 300px;
		height:250px;
		.ant-upload.ant-upload-drag{
			width: 300px;
			height:250px !important;
		}
	}
}

// ### preivew file
#content{
	user-select: none;
	pointer-events: none;
}
.modal-preview{
	width:800px !important;
	.ant-modal-body{
		padding:unset !important;
	}
}

// ##### chart
.card-action{
	border: 1px solid #f2f4f9;
  border-radius: 0.25rem;
	box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
	.ant-card-head{
		border-bottom:unset !important;
	}
	.ant-tabs-bar{
		border-bottom:unset !important;
	}
	.ant-tabs .ant-tabs-large-bar .ant-tabs-tab{
		font-size: 14px;
		&:active, &:hover{
			color:${BASE_COLOR} !important;
		}
	}
	.ant-tabs-tab-active{
		color:${BASE_COLOR} !important;
	}
	.ant-tabs-ink-bar{
		background-color:${BASE_COLOR} !important;
	}
	.ant-card-body{
		padding:0 24px !important;
		.chart-extra{
			margin-bottom:2em;
			display:flex;
			align-items: center;
			flex-wrap: wrap;
			.btn-chart{
				margin: 0 0 0 5px;
				.ant-radio-button-wrapper{
					line-height:30px !important;
					height: 30px;
					color: ${BASE_COLOR} !important;
					border-color: ${BASE_COLOR} !important;
					border-radius:0 !important;
					&:hover{
						color: #fff !important;
						background-color: ${BASE_COLOR} !important;
					}
				}
				.ant-radio-button-wrapper-checked{
					background:  ${BASE_COLOR} !important;
					color: #fff !important;
				}
			}
			.ant-input{
				height:30px !important;
				border-color: ${BASE_COLOR} !important;
				border-radius: unset !important;
				&:hover{
					border-color: ${BASE_COLOR} !important;
				}
			}
			.ant-row{
				width:100%;
			}
			h2{
				line-height: 2em;
			}
		}
	}
}
.radio-custom{
	.ant-radio-checked .ant-radio-inner, .ant-radio-input:focus, .ant-radio-inner:focus{
		border-color:${BASE_COLOR} !important;
	}
	.ant-radio-inner::after{
		background-color:  ${BASE_COLOR} !important;
	}
}
.tab-custom{
	.ant-tabs-nav .ant-tabs-tab-active{
		color:${BASE_COLOR} !important;
	}
	.ant-tabs-tab{
		&:hover{
			color:${BASE_COLOR} !important;
		}
	}
	.ant-tabs-ink-bar{
		background-color:${BASE_COLOR} !important;
	}
}
.calendar-custom{
	.ant-fullcalendar-selected-day .ant-fullcalendar-value{
		background:${BASE_COLOR} !important;
	}
	label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked{
		color:${BASE_COLOR} !important;
		border-color:${BASE_COLOR} !important;
	}
	.ant-fullcalendar-today .ant-fullcalendar-value{
		box-shadow: 0 0 0 1px ${BASE_COLOR} inset !important;
	
	}
}
.chart-container{
	height:300px;
}
.btn-analy{
	background-color: #4cd6c1 !important;
	color: #fff!important;
	&:hover{
		filter: brightness(115%);
	}
}
.flex{
	display:flex !important;
	align-item:center !important;
}

///
.pointer{
	cursor:pointer;
}
.icon-white{
	i{
		color:#fff !important;
	}
}
.fl-right{
	float:right !important;
}
.fl-left{
	float:left !important;
}


// notification custom
.notifi-custom{
		border-left:5px solid ${BASE_COLOR} !important;
		.ant-notification-notice-with-icon{
			.anticon.ant-notification-notice-icon-success{
				color:${BASE_COLOR} !important;
			}
		}
}

.text{
	display: inline-block;
	p{
		margin:0 !important;
	}
}

.group-option{
	displat:flex;
	
}
.select-pick {
	margin-left: 20px;
	display: flex;
	align-items:center;
	h4 {
		margin-right: 5px;
	}
	.ant-select-selection--single {
		height: 35px !important;
		width:100%;
		display:block;
	}
}

.modal-exam{
.exam-item{
	h3{
		text-align: justify;
		display: inline-flex;
	}
	ul{
		padding-left: 1em !important;
		li{
			list-style:none !important;
			color: rgba(0, 0, 0, 0.85);
			font-weight:500;
			text-align: justify;
			&.answer{
				color:green !important;
				span.text{
					p{
					text-decoration: underline;
					}
				}
			}
		}
	}
}
.ant-modal-footer{
	display: flex;
	justify-content: flex-end;
	.btn-danger{
		height: 30px !important;
		border-color:${BASE_COLOR} !important;
		color:${BASE_COLOR} !important;
	}
}
}

.form-exam-auto{
	
	p.text{
		display:inline-block;
		color:rgba(0, 0, 0, 0.85);
		padding-left:1em;
	}
}

.phh-date-pick{
	.ant-calendar-picker-input{
		height:35px !important;
	}
}


${_utilityClasses}
`;
export default GlobalStyle;
