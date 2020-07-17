import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';

function MessageAction(props) {
	const { msg } = props;

	const openNotificationWithIcon = () => {
		notification.success({
			message: 'Thông báo',
			description: msg,
			placement: 'bottomRight',
			duration: 2.5,
		});
	};

	return <React.Fragment>{openNotificationWithIcon}</React.Fragment>;
}

MessageAction.propTypes = {
	msg: PropTypes.string.isRequired,
};

export default MessageAction;
