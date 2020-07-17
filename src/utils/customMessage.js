import { notification, message } from 'antd';

const openNotificationWithIcon = (msg, action) => {
	notification[action]({
		message: 'Thông báo',
		description: msg,
		placement: 'bottomRight',
		className:'notifi-custom',
	});
};

const openMessage = (msg, action) => {
	message[action](msg);
};

/**
 * 
 * @param {string} type loai thong bao - message || notification
 * @param {string} action icon thong bao - success || warning || error
 * @param {string} mess noi dung thong bao - ....
 */
export default function(type, action, mess) {
	if (type === 'message') openMessage(mess, action);
	else openNotificationWithIcon(mess, action);
}
