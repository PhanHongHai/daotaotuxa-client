import styled from 'styled-components';
import { Form } from 'antd';

import { BASE_COLOR } from '../../../constands/Other';

export const FormCreateQuestionStyle = styled(Form)`
	.list-answer {
		.radio-answer {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 150px;
			border: 1px solid;
			box-shadow: 1px 1px #e8e8e8;
			background-color: #f7f8f9;
			.ant-radio-checked {
				.ant-radio-inner {
					border-color: ${BASE_COLOR} !important;
					&:after {
						background-color: ${BASE_COLOR} !important;
					}
				}
			}

			@media only screen and (max-width: 425px) {
				height: 50px !important;
			}
		}
		.content-answer {
			display: block;
			height: 150px;
			border: 1px solid;
			box-shadow: 1px 1px #e8e8e8;
			.phh-ckeditor {
				.ck-editor__editable_inline {
					min-height: 110px;
				}
			}
		}
	}
`;

export const FormEditQuestionStyle = styled(FormCreateQuestionStyle)``;
export const something = styled.div``;
