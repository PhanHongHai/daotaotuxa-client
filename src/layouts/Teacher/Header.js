import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Menu, Button } from 'antd';

import { HeaderCustom, GroupMenuHeader } from './Layout.styled';

function HeaderComponent(props) {
	const { setCollapsed, collapsed, handleLogout } = props;


	return (
		<HeaderCustom resize={collapsed ? 'collapsed' : 'undefind'}>
			<div>
				<Icon
					className="trigger icon-fold-custom"
					type={collapsed ? 'menu-unfold' : 'menu-fold'}
					onClick={() => setCollapsed(!collapsed)}
				/>
				<GroupMenuHeader>
					<p className='text-welcome'>Chào mừng đến với Academy HCM</p>
					<span className="phh-menuAcc">
						<Button icon="logout" className="btn-transparent" onClick={handleLogout}>
							Đăng xuất
						</Button>
					</span>
				</GroupMenuHeader>
			</div>
		</HeaderCustom>
	);
}

HeaderComponent.propTypes = {
	setCollapsed: PropTypes.func.isRequired,
	handleLogout: PropTypes.func.isRequired,
	collapsed: PropTypes.bool.isRequired,
};

export default HeaderComponent;
