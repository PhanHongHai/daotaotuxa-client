import styled from 'styled-components';
import { Form } from 'antd';

import {BASE_COLOR} from '../../../constands/Other';

export const FormCreateQuestionStyle = styled(Form)``;

export const ExamViewStyle = styled.div`
	margin: 0.5em 0;
	padding: 2em;
	background-color: #fff;
	border: 1px solid #f2f4f9;
	box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
	.btn-question{
		display:flex;
		button{
			height:30px !important;
		}
	}
	.exam-header{
		display: flex;
    justify-content: center;
		.btn-edit{
			margin-left: 5px;
			display: inline-flex;
			background-color: transparent !important;
			outline: 0 !important;
			box-shadow: unset !important;
			border: none !important;
			color: #999c9e !important;
			font-weight: bold !important;
			box-shadow: unset!important;
			outline: 0 !important;
			height:30px !important;
			width:30px !important;

			i{
				font-size: 15px; !important;
			}
		}
		.exam-header-edit{
			width: 100%;
			margin-bottom:10px;
			display: flex;
			justify-content: center;
			align-items: center;
			.group{
				display: flex;
				justify-content: center;
			align-items: center;
			}
			input{
				border-color: ${BASE_COLOR} !important;
				&:hover,&:focus{
					border-color: #1ab394;
					box-shadow: 0 0 0 2px #1ab3943b;
				}
			}
		}
	}
	.exam-item {
    h3{
      text-align: justify;
      display: inline-flex;
		}
		.btn-edit{
			margin-left: 5px;
			display: inline-flex;
			background-color: transparent !important;
			outline: 0 !important;
			box-shadow: unset !important;
			border: none !important;
			color: #999c9e !important;
			font-weight: bold !important;
			box-shadow: unset!important;
			outline: 0 !important;
			height:30px !important;
			i{
				font-size: 15px; !important;
			}
		}
		ul {
			padding-left: 1em !important;
			li {
				list-style: none !important;
				color: rgba(0, 0, 0, 0.85);
				font-weight: 500;
				text-align: justify;
				p{
					display: inline-block;
				}
				&.answer {
					color: #1bb394 !important;
					span.text{
						p{
						text-decoration: underline;
						}
					}
				}
			}
		}
	}
`;

export const something = styled.div``;
