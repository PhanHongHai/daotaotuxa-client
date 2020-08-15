import React, { useState, useEffect, Suspense } from 'react';
import { useHistory, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message } from 'antd';

// other
import routes from './_nav';
import AuthorizedRoute from '../../utils/authorized';
import { LayoutCustom, ContentCustom } from './styled';
import LoginAction from '../../pages/Login/Action';
// import Loading from '../utils/loading';
// component
import LoadingCustom from '../../components/LoadingCustom';
import Header from './Header';

function LayoutLearning(props) {
	const { statusFetch, userData, getProfileReq } = props;
	const [clientWidth, setClientWidth] = useState(window.document.body.clientWidth);
	const history = useHistory();

	useEffect(() => {
		getProfileReq({
			req: {},
			cb: res => {
				if (res.isRedirect) {
					localStorage.clear();
					history.push('/login');
				}
				if (res.role && res.role !== 'student') history.push(`/${res.role}/dashboard`);
			},
		});

		const handleSize = () => setClientWidth(window.document.body.clientWidth);
		window.addEventListener('resize', handleSize);
		return () => window.removeEventListener('resize', handleSize);
	}, [history, getProfileReq]);

	const loadingGetProfile = statusFetch === 'FETCHING';
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
		<LayoutCustom>
			<Header
				handleLogout={handleLogout}
				userData={userData}
				clientWidth={clientWidth}
				loadingGet={loadingGetProfile}
			/>
			<ContentCustom>
				<Switch>
					<Suspense fallback={<LoadingCustom margin={20} />}>{handleRenderRoute()}</Suspense>
				</Switch>
			</ContentCustom>
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

LayoutLearning.propTypes = {
	getProfileReq: PropTypes.func.isRequired,
	userData: PropTypes.objectOf(PropTypes.any).isRequired,
	statusFetch: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutLearning);
