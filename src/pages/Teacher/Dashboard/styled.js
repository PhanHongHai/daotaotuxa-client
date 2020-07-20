import styled from 'styled-components';

import { BASE_COLOR } from '../../../constands/Other';

export const DashboardTeacherStyle = styled.div`
	.frame {
		overflow: scroll;
		height: 400px;
	}
`;

export const something = styled.div``;

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
		color: ${BASE_COLOR} !important;
	}
	h3 {
		color: ${BASE_COLOR} !important;
	}
`;
