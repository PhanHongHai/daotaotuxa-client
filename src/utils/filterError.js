import { message, notification } from 'antd';

const returnError = (err, type) => {
	if (type === 'message') message.error(err);
	else
		notification.error({
			message: 'Lỗi',
			description: err,
		});
};

/**
 * used to filter error from response
 * @param {string || array} error
 */
const filterError = (err, type = 'message') => {
	if (Array.isArray(err)) {
		err.forEach(ele => {
			if (ele.messages && Array.isArray(ele.messages)) {
				ele.messages.forEach(error => {
					returnError(error, type);
				});
			} else returnError(ele.message, type);
		});
	} else message.error(err);
};

export default filterError;
