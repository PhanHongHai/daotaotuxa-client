import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import customMess from '../../../../utils/customMessage';
import FormCreatePartner from './FormCreatePartner';
import FormCreateTeacher from './FormCreateTeacher';

function ModalCreate(props) {
	const { visible, setVisible, loadingCreate, createReq, type, keyword, paginationData } = props;

	const [formInitRef, setFormInitRef] = useState(null);

	const saveFormRef = useCallback(node => {
		if (node !== null) {
			setFormInitRef(node);
		}
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		formInitRef.validateFields((err, values) => {
			if (!err) {
				createReq({
					req: {
						...values,
						role: type,
					},
					keyword,
					paginationData,
					cb: res => {
						if (res) {
							setVisible(false);
							customMess('notification', 'success', res);
							formInitRef.resetFields();
						}
					},
				});
			}
		});
	};

	return (
		<Modal
			className="phh-modal"
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={null}
			title="Thêm mới người dùng"
			width="900px"
		>
			{type === 'partner' ? (
				<FormCreatePartner ref={saveFormRef} handleSubmit={handleSubmit} loadingCreate={loadingCreate} />
			) : (
				<FormCreateTeacher ref={saveFormRef} handleSubmit={handleSubmit} loadingCreate={loadingCreate} />
			)}
		</Modal>
	);
}

ModalCreate.propTypes = {
	visible: PropTypes.bool.isRequired,
	loadingCreate: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	createReq: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	keyword: PropTypes.string.isRequired,
	paginationData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalCreate;
