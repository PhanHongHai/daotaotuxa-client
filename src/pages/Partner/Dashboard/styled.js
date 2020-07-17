import styled from 'styled-components';
import { Select } from 'antd';

import {BASE_COLOR} from '../../../constands/Other';


export const SelectYearStyle = styled(Select)`
	.ant-select-selection--single {
		height: 35px !important;
		width: 80px !important;
		border-color: ${BASE_COLOR} !important;
		border-radius: 0 !important;
		&:hover,
		&:focus {
			border-color: ${BASE_COLOR} !important;
		}
	}
`;

export const something = styled.div``;
