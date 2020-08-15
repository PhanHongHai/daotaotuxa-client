import styled from 'styled-components';
import { Button } from 'antd';

import bgLogin from '../../assets/images/bg.png';

// #####  login container
export const LoginContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-item: center;
	background-image: url(${bgLogin});
	background-color: rgb(0, 189, 135);

`;
// ##### end loging container

export const Container = styled.div`
	background-color: #fff;
	border-radius: 3px;
	width: 450px;
	box-shadow: -1px 1px 10px 8px rgba(86, 86, 88, 0.29);
	.logo {
		display: flex;
		justify-content: center;
		width: 100%;
		height: auto;
		img {
			width: 40px;
			height: 40px;
		}
		h1 {
			color: rgb(0, 189, 135);
			font-weight: bold;
			margin-left: 10px;
		}
	}
	.phh-form-login {
		padding: 3em;
		label {
			font-size: 15px;
			font-weight: 600;
			margin-bottom: 5px;
			display: block;
		}
		input {
			height: 40px;
			font-size: 15px;
		}
		.ant-input-suffix {
			i {
				font-size: 15px;
			}
		}
	}
	form.phh-form-get-start{
		padding: 3em;
	}
	@media only screen and (max-width: 425px) {
		width: 90% !important;
		.phh-form-login {
			padding: 5%;
		}
	}
`;

export const LoginButton = styled(Button)`
	display: block;
	margin: auto;
	width: 100%;
	height: 50px;
	color: #fff !important;
	margin-top: 10px;
	&:hover,
	&:active,
	&:focus {
		background-color: rgb(0, 189, 135) !important;
		color: #fff;
		filter: brightness(115%);
	}
	background-color: rgb(0, 189, 135) !important;
`;

export const StyleButton = styled(Button)`
display: block;
margin: auto;
width: 100%;
height: 50px !important;
color: #fff !important;
margin-top: 10px;
&:hover,
&:active,
&:focus {
	border-color:${prop => prop.color} !important;
	color: #fff;
	filter: brightness(115%);
}
background-color: ${prop => prop.color} !important;


`;