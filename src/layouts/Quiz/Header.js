import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Menu, Avatar, Button } from 'antd';



import { HeaderCustom, GroupMenuHeader } from './styled';

import Logo from '../../assets/images/logo-white.png';

function HeaderComponent(props) {
	const { handleLogout, clientWidth, loadingGet, userData, } = props;


	const menu = (
		<Menu>
			<Menu.Item>
				<a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
					1st menu item
				</a>
			</Menu.Item>
			<Menu.Item>
				<a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
					2nd menu item
				</a>
			</Menu.Item>
			<Menu.Item>
				<a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
					3rd menu item
				</a>
			</Menu.Item>
		</Menu>
	);

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
					<span className="phh-menuNoti">
						<Dropdown placement="bottomRight" overlay={menu}>
							<Icon theme="filled" type="bell" />
						</Dropdown>
					</span>
					<span className="phh-menuAcc">
						<Dropdown
							placement="bottomCenter"
							trigger="hover"
							overlay={
								<Menu>
									<Menu.Item>Xin chào! {userData && userData.name}</Menu.Item>
									<Menu.Item >
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
