import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import TablePoint from './TablePoint';

function ModalPoint(props) {
	const { visible, setVisible, data } = props;
	return (
		<Modal
			title="Điểm thi"
			className="phh-modal"
			onCancel={() => setVisible(false)}
			footer={null}
			width="750px"
			visible={visible}
		>
			<TablePoint data={data} />
		</Modal>
	);
}

ModalPoint.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	data: PropTypes.instanceOf(Array).isRequired,
};

export default ModalPoint;
