import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon, PageHeader } from 'antd';
import { Link } from 'react-router-dom';

function BreadCrumb(props) {
	const { breadcrumb, pageCurrentText, icon, visible } = props;
	const renderBreadcrumb = data => {
		return data.map(ele => {
			return (
				<Breadcrumb.Item key={ele.path}>
					<Link to={ele.path}>
						<Icon type={ele.icon} />
						<span style={{ marginLeft: '10px' }}>{ele.text}</span>
					</Link>
				</Breadcrumb.Item>
			);
		});
	};
	return (
		<div className="page-header">
			<PageHeader title={pageCurrentText} />
			<Breadcrumb className="bread-crumb">
				{renderBreadcrumb(breadcrumb)}
				{(pageCurrentText && pageCurrentText === '') || visible ? (
					''
				) : (
					<Breadcrumb.Item>
						{icon !== 'none' ? <Icon type={icon} /> : ''}
						&ensp;
						{pageCurrentText}
					</Breadcrumb.Item>
				)}
			</Breadcrumb>
		</div>
	);
}

BreadCrumb.propTypes = {
	breadcrumb: PropTypes.instanceOf(Array).isRequired,
	pageCurrentText: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
};

export default BreadCrumb;
