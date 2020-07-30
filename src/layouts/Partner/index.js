import React, { useState, useEffect, Suspense } from 'react';
import { useHistory, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message, Row, Col, Icon, Button } from 'antd';

// other
import routes from './_nav';
import AuthorizedRoute from '../../utils/authorized';
import { LayoutCustom, ContentCustom, PartnerLayout, HeaderLayout } from './Layout.styled';
import LoginAction from '../../pages/Login/Action';
import PartnerIcon from '../../assets/images/partner.svg';
// import Loading from '../utils/loading';
// component
import LoadingCustom from '../../components/LoadingCustom';
import Header from './Header';
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
				if (res.role && res.role !== 'partner') history.push(`/${res.role}/dashboard`);
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
							type="partner"
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
						type="partner"
					/>
				);
			});
		}
	};
	return (
		<PartnerLayout>
			<LayoutCustom>
				<Header
					clientWidth={clientWidth}
					collapsed={collapsed}
					setCollapsed={setCollapsed}
					handleLogout={handleLogout}
					userData={userData}
				/>
				{clientWidth < 445 ? (
					<SidebarMobile
						collapsed={collapsed}
						setCollapsed={setCollapsed}
						onChangePage={onChangePage}
						loadingGet={loadingGetProfile}
						userData={userData}
					/>
				) : (
					''
				)}
				<HeaderLayout>
					<div className="head-content">
						<Row gutter={16} justify={clientWidth < 445 ? 'center' : 'start'}>
							<Col xs={24} md={3}>
								<img src={PartnerIcon} alt="học viên" />
							</Col>
							<Col xs={24} md={18}>
								<span>
									<h1>{userData && userData.name}</h1>
									<p>
										<Icon type="mail" />
										&ensp;{userData && userData.email}
									</p>
								</span>
							</Col>
							<Col xs={24} md={3}>
								<Button className="button-edit" onClick={() => history.push('/partner/dashboard/tai-khoan')}>
									Cập nhật
								</Button>
							</Col>
						</Row>
					</div>
				</HeaderLayout>
				<ContentCustom>
					<Switch>
						<Suspense fallback={<LoadingCustom margin={20} />}>{handleRenderRoute()}</Suspense>
					</Switch>
				</ContentCustom>
			</LayoutCustom>
		</PartnerLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(LayoutAdmin);
