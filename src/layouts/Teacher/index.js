import React, { useState, useEffect } from 'react';
import { useHistory, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message } from 'antd';

// other
import routes from './_nav';
import AuthorizedRoute from '../../utils/authorized';
import { LayoutCustom, LayoutMain, ContentCustom } from './Layout.styled';
import LoginAction from '../../pages/Login/Action';
// import Loading from '../utils/loading';
// component
import Header from './Header';
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';

function LayoutAdmin(props) {
	const { statusFetch, userData, getProfileReq } = props;

	const [collapsed, setCollapsed] = useState(false);
	const [clientWidth, setClientWidth] = useState(window.document.body.clientWidth);
	const history = useHistory();

	useEffect(() => {
		getProfileReq({
			req: {},
			cb: res => {
				if (res.isRedirect) {
					localStorage.clear();
					history.push('/dang-nhap');
				}
				if (res.role && res.role !== 'teacher') history.push(`/${res.role}/dashboard`);
			},
		});

		const handleSize = () => setClientWidth(window.document.body.clientWidth);
		window.addEventListener('resize', handleSize);
		return () => window.removeEventListener('resize', handleSize);
	}, [history, getProfileReq]);

	const loadingGetProfile = statusFetch === 'FETCHING';
	const onChangePage = (location, checkMobile) => {
		history.push(`${location}`);
		setCollapsed(checkMobile);
	};
	const handleLogout = () => {
		localStorage.clear();
		history.push('/dang-nhap');
		message.success('Đăng xuất thành công');
	};

	const handleRenderRoute = () => {
		if (routes.length > 0) {
			return routes.map(route => {
				if (route.children && route.children.length > 0) {
					return route.children.map(routeChild => (
						<AuthorizedRoute
							key={routeChild.key}
							exact={routeChild.exact}
							path={routeChild.path}
							component={routeChild.component}
							authority
							type="admin"
						/>
					));
				}
				return (
					<AuthorizedRoute
						authority
						key={route.key}
						exact={route.exact}
						path={route.path}
						component={route.component}
						type="admin"
					/>
				);
			});
		}
	};
	return (
		<LayoutCustom>
			{clientWidth < 445 ? (
				<SidebarMobile
					collapsed={collapsed}
					setCollapsed={setCollapsed}
					onChangePage={onChangePage}
					loadingGet={loadingGetProfile}
					userData={userData}
				/>
			) : (
				<Sidebar onChangePage={onChangePage} collapsed={collapsed} loadingGet={loadingGetProfile} userData={userData} />
			)}
			<LayoutMain resize={collapsed ? 'collapsed' : 'undefind'}>
				<Header collapsed={collapsed} setCollapsed={setCollapsed} handleLogout={handleLogout} />
				<ContentCustom>
					<Switch>{handleRenderRoute()}</Switch>
				</ContentCustom>
			</LayoutMain>
		</LayoutCustom>
	);
}

const mapStateToProps = state => ({
	userData: state.loginPage.profileUser,
	statusFetch: state.loginPage.statusFetch,
});

const mapDispatchToProps = {
	getProfileReq: LoginAction.getProfileRequest,
};

LayoutAdmin.propTypes = {
	getProfileReq: PropTypes.func.isRequired,
	userData: PropTypes.objectOf(PropTypes.any).isRequired,
	statusFetch: PropTypes.string.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LayoutAdmin);
