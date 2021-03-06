import React from 'react';
import { Card, Steps, Row, Col, Typography, Breadcrumb } from 'antd';
import { useHistory, Link } from 'react-router-dom';

import FormEditAccount from './Component/FormEdit';
import ChangePassowrd from './Component/ChangePassword';

import { StepStyle, ButtonBack } from './styled';

const { Step } = Steps;

function AccountSetting() {
	const [current, setCurrent] = React.useState(0);
	const history = useHistory();
	const renderByCurrent = value => {
		switch (value) {
			case 0:
				return (
					<Card title="Thông tin tài khoản" className="phh-card-v2">
						<FormEditAccount />
					</Card>
				);
			default:
				return (
					<Card title="Đổi mật khẩu" className="phh-card-v2">
						<ChangePassowrd />
					</Card>
				);
		}
	};
	return (
		<div className="container mt-15 mb-15">
			<Row gutter={16}>
				<Col xs={24} md={24} className="mb-10">
					<Typography.Title level={3}>Thiết Lập Tài Khoản</Typography.Title>
					<Breadcrumb>
						<Breadcrumb.Item>
							<Link to="/partner/dashboard">Dashboard</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>Thiết lập tài khoản</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
				<Col xs={24} md={18}>
					{renderByCurrent(current)}
				</Col>
				<Col xs={24} md={6}>
					<StepStyle
						progressDot
						direction="vertical"
						size="small"
						current={current}
						onChange={curre => setCurrent(curre)}
					>
						<Step title={<h3>Thông tin cơ bản</h3>} />
						<Step title={<h3>Đổi mật khẩu</h3>} />
					</StepStyle>
					<ButtonBack icon="rollback" onClick={() => history.push('/partner/dashboard')}>
						Quay về trang chủ
					</ButtonBack>
				</Col>
			</Row>
		</div>
	);
}

export default AccountSetting;
