import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Menu, Icon, Avatar, Dropdown  } from 'antd';
import { useHistory } from 'react-router-dom';

//
import routes from './_nav';
import Logo from '../../assets/images/logo-white.png';
import { SiderMobileCustom } from './Layout.styled';

const showRole = value => {
	switch (value) {
		case 'admin':
			return 'Quản trị viên';
		case 'employment':
			return 'Nhân viên';
		default:
			return 'Giảng viên';
	}
};

function SidebarMobile(props) {
	const { collapsed, setCollapsed, onChangePage,  userData, handleLogout, loadingGet, } = props;
	const history = useHistory();

	const handleRenderMenu = data => {
		if (data.length > 0) {
			return data
				.filter(ele => ele.isMenu !== false)
				.map(item => {
					return item.children && item.children.length > 0 ? (
						<Menu.SubMenu
							className="sidebar-submenu"
							key={item.key}
							title={
								<span>
									<Icon className="menu-item-icon" type={item.icon} />
									<span className="menu-item-text">{item.title}</span>
								</span>
							}
						>
							{item.children
								? item.children
										.filter(ele => ele.isMenu !== false)
										.map(child => (
											<Menu.Item key={child.key} className="sidebar-menu-item">
												<Icon className="menu-item-icon" type={child.icon} />
												<span className="menu-item-text">{child.title}</span>
											</Menu.Item>
										))
								: ''}
						</Menu.SubMenu>
					) : (
						<Menu.Item key={item.key} className="sidebar-menu-item">
							<Icon className="menu-item-icon" type={item.icon} />
							<span className="menu-item-text">{item.title}</span>
						</Menu.Item>
					);
				});
		}
	};
	return (
		<Drawer
			className="phh-siderBarMobile"
			title={
				<div className="logo">
					<img src={Logo} alt="logo" />
					<h1> ACADEMY HCM</h1>
				</div>
			}
			placement="left"
			onClose={() => setCollapsed(false)}
			visible={collapsed}
		>
			<SiderMobileCustom>
				<div className="info">
					{loadingGet ? (
						<Icon type="loading" />
					) : (
						<Avatar size="large" style={{ backgroundColor: '#87d068' }} icon="user" />
					)}
					<span className="info-user">
						<Dropdown
							placement="bottomCenter"
							trigger="click"
							overlay={
								<Menu>
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
							<p>
								{userData && userData.email}&ensp;
								<Icon type="caret-down" />
							</p>
						</Dropdown>
						<p>Vai trò : {userData && showRole(userData.role)}</p>
					</span>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					onClick={data => onChangePage(data.key, false)}
					defaultSelectedKeys={[history.location.pathname ? history.location.pathname : '/app/dashboard']}
				>
					{handleRenderMenu(routes)}
				</Menu>
			</SiderMobileCustom>
		</Drawer>
	);
}

SidebarMobile.propTypes = {
	collapsed: PropTypes.bool.isRequired,
	setCollapsed: PropTypes.func.isRequired,
	onChangePage: PropTypes.func.isRequired,
	userData: PropTypes.objectOf(PropTypes.any).isRequired,
	handleLogout: PropTypes.func.isRequired,
	loadingGet: PropTypes.bool.isRequired,
};

export default SidebarMobile;
