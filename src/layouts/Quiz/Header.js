import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Menu, Avatar, Button } from 'antd';

import {useHistory} from 'react-router-dom';

import { HeaderCustom, GroupMenuHeader } from './styled';

import Logo from '../../assets/images/logo-white.png';

function HeaderComponent(props) {
	const { handleLogout, clientWidth, loadingGet, userData, } = props;
	const history = useHistory();

	return (
		<HeaderCustom>
			<div>
				<div className="logo">
					<img src={Logo} alt="logo" />
					<h1> ACADEMY HCM</h1>
				</div>
				{clientWidth < 445 ? (
					<Button icon='rollback' className='btn-back'>Quay về trang chủ</Button>
				) : ''}

				<GroupMenuHeader>
					<p className="text-welcome">Chào mừng đến với Academy HCM</p>
					<span className="phh-menuAcc  ml-10">
						<Dropdown
							placement="bottomCenter"
							trigger="hover"
							overlay={
								<Menu>
									<Menu.Item>Xin chào! {userData && userData.name}</Menu.Item>
									<Menu.Item onClick={() => history.push('/student/dashboard/thiet-lap')}>
										<Icon type="user" />
										Quản lý tài khoản
									</Menu.Item>
									<Menu.Item onClick={handleLogout}>
										<Icon type="logout" />
										Đăng xuất
									</Menu.Item>
								</Menu>
							}
						>
							<Avatar size="default" style={{ backgroundColor: '#87d068' }} icon={loadingGet ? 'loading' : 'user'} />
						</Dropdown>
					</span>
				</GroupMenuHeader>
			</div>
		</HeaderCustom>
	);
}

HeaderComponent.propTypes = {
	handleLogout: PropTypes.func.isRequired,
	clientWidth: PropTypes.number.isRequired,
	loadingGet: PropTypes.bool.isRequired,
	userData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default HeaderComponent;
