import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';

function ModalQuickTest(props) {
	const { visible, setVisible } = props;
	return (
		<Modal
			title="Thi thử"
			footer={null}
			className="phh-modal"
			widht="700px"
			visible={visible}
			onCancel={() => setVisible(false)}
		>

			
		</Modal>
	);
}

ModalQuickTest.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
};

export default ModalQuickTest;
