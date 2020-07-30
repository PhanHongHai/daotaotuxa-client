import React, { useState, useEffect, Suspense } from 'react';
import { useHistory, Switch, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message, Row, Col, Button, Menu, Dropdown, Icon } from 'antd';
import socketIOClient from 'socket.io-client';

// other
import { HOST_SERVER } from '../../constands/Other';
import routes from './_nav';
import AuthorizedRoute from '../../utils/authorized';
import { LayoutCustom, ContentCustom, StudentLayout, HeaderLayout, MenuStyle } from './Layout.styled';
import LoginAction from '../../pages/Login/Action';
// import Loading from '../utils/loading';
// component
import LoadingCustom from '../../components/LoadingCustom';
import Header from './Header';
import SidebarMobile from './SidebarMobile';

import IconStudent from '../../assets/images/white.svg';

function LayoutStudent(props) {
	const { statusFetch, userData, getProfileReq } = props;
	const [collapsed, setCollapsed] = useState(false);
	const [clientWidth, setClientWidth] = useState(window.document.body.clientWidth);
	const history = useHistory();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const socket = socketIOClient(HOST_SERVER);
		socket
			.emit('authenticate', { token })
			.on('authenticated', () => {
			})
			.on('unauthorized', msg => {
				console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
				throw new Error(msg.data.type);
			});
		getProfileReq({
			req: {},
			cb: res => {
				if (res.isRedirect) {
					localStorage.clear();
					history.push('/hoc-vien');
				}
				if (res.role && res.role !== 'student') history.push(`/${res.role}/dashboard`);
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
		history.push('/hoc-vien');
		message.success('Đăng xuất thành công');
	};

	const handleRenderMenu = data => {
		if (data.length > 0) {
			return data
				.filter(ele => ele.isMenu !== false)
				.map(item => {
					return item.children && item.children.length > 0 ? (
						<li>
							<Dropdown
								overlay={
									<Menu>
										{item.children
											? item.children
													.filter(ele => ele.isMenu !== false)
													.map(child => (
														<Menu.Item key={child.key} className="sidebar-menu-item">
															<span className="menu-item-text">{child.title}</span>
														</Menu.Item>
													))
											: ''}
									</Menu>
								}
							>
								<p key={item.key} className="ant-dropdown-link">
									{item.title}
								</p>
							</Dropdown>
						</li>
					) : (
						<li key={item.key}>
							<NavLink
								activeClassName="selected"
								key={item.key}
								exact={item.isFirst}
								className="sidebar-menu-item"
								to={item.key}
							>
								<span className="menu-item-text">{item.title}</span>
							</NavLink>
						</li>
					);
				});
		}
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
							type="student"
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
						type="student"
					/>
				);
			});
		}
	};
	return (
		<StudentLayout>
			<LayoutCustom>
				<Header
					collapsed={collapsed}
					setCollapsed={setCollapsed}
					handleLogout={handleLogout}
					userData={userData}
					clientWidth={clientWidth}
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
								<img src={IconStudent} alt="học viên" />
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
								<Button className="button-edit" onClick={() => history.push('/student/dashboard/thiet-lap')}>
									Cập nhật
								</Button>
							</Col>
						</Row>
					</div>
				</HeaderLayout>
				<MenuStyle>
					<div className="menu-list">
						<ul>{handleRenderMenu(routes)}</ul>
					</div>
				</MenuStyle>
				<ContentCustom>
					<Switch>
						<Suspense fallback={<LoadingCustom margin={20} />}>{handleRenderRoute()}</Suspense>
					</Switch>
				</ContentCustom>
			</LayoutCustom>
		</StudentLayout>
	);
}

const mapStateToProps = state => ({
	userData: state.loginPage.profileUser,
	statusFetch: state.loginPage.statusFetch,
});

const mapDispatchToProps = {
	getProfileReq: LoginAction.getProfileRequest,
};

LayoutStudent.propTypes = {
	getProfileReq: PropTypes.func.isRequired,
	userData: PropTypes.objectOf(PropTypes.any).isRequired,
	statusFetch: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutStudent);
