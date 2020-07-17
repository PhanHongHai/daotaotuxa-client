import React, { useEffect } from 'react';
import { Row, Col, Form, Spin, Typography, Divider } from 'antd';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

// styled
import { ActiveAccountContainer, Container, ActiveButton } from './styled';
import LoadingCustom from '../../components/LoadingCustom';
import Logo from '../../assets/images/logo.png';

const { Title, Paragraph } = Typography;

function ActiveAccountComponent(props) {
	const { statusActive, statusCheckActive, activeReq, checkActiveReq } = props;
	const history = useHistory();
	const { tokenActive } = useParams();

	useEffect(() => {
		checkActiveReq({
			req: tokenActive,
			cb: res => {
				if (res.isRedirect) history.push('/login');
			},
		});
	}, [checkActiveReq, tokenActive, history]);

	const loadingActive = statusActive === 'FETCHING';
	const loadingCheckActive = statusCheckActive === 'FETCHING';

	const handleActiveAccount = () => {
		activeReq({
			req: tokenActive,
			cb: res => {
				if (res.isRedirect) history.push('/login');
			},
		});
	};
	return (
		<Spin spinning={loadingCheckActive} indicator={<LoadingCustom />}>
			<ActiveAccountContainer>
				<Row type="flex" justify="center" align="middle">
					<Container>
						<Form className="phh-form-login">
							<Col span={24} className="mb-20">
								<div className="logo">
									<img alt="logo" src={Logo} />
									<h1>ACADEMY</h1>
									HCM
								</div>
							</Col>
							<Col span={24}>
								<Form.Item>
									<Typography>
										<Title level={4}>Xác thực tài khoản</Title>
										<Paragraph>Để có thể sử dụng tài khoản, hãy click vào nút bên dưới để xác thực</Paragraph>
									</Typography>
									<Divider />
									<ActiveButton icon="check-circle" loading={loadingActive} onClick={handleActiveAccount}>
										Xác thực tài khoản
									</ActiveButton>
								</Form.Item>
							</Col>
						</Form>
					</Container>
				</Row>
			</ActiveAccountContainer>
		</Spin>
	);
}

ActiveAccountComponent.propTypes = {
	statusActive: PropTypes.string.isRequired,
	statusCheckActive: PropTypes.string.isRequired,
	activeReq: PropTypes.func.isRequired,
	checkActiveReq: PropTypes.func.isRequired,
};

export default ActiveAccountComponent;
