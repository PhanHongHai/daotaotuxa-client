import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import customMess from '../../../../utils/customMessage';

import FormEditTeacher from './FormEditTeacher';
import FormEditPartner from './FormEditPartner';

function ModalEdit(props) {
	const {
		info,
		visible,
		setVisible,
		updateReq,
		loadingUpdate,
		type,
		dataForm,
		setDataForm,
		paginationData,
		keyword,
	} = props;
	const [formInitRef, setFormInitRef] = useState(null);

	const saveFormRef = useCallback(node => {
		if (node !== null) {
			setFormInitRef(node);
		}
	}, []);
	const handleSubmit = e => {
		e.preventDefault();
		formInitRef.validateFields(err => {
			if (!err) {
				updateReq({
					req: {
						...dataForm,
					},
					paginationData,
					keyword,
					ID: info && info._id,
					cb: res => {
						if (res) {
							setDataForm({});
							setVisible(false);
							customMess('notification', 'success', res);
						}
					},
				});
			}
		});
	};

	return (
		<Modal
			className="phh-modal"
			title="Cập nhật người dùng"
			width="900px"
			visible={visible}
			footer={null}
			onCancel={() => {
				setDataForm({});
				formInitRef.resetFields();
				setVisible(false);
			}}
		>
			{type && type === 'partner' ? (
				<FormEditPartner
					ref={saveFormRef}
					info={info}
					loadingEdit={loadingUpdate}
					handleSubmit={handleSubmit}
					saveDataForm={setDataForm}
					dataForm={dataForm}
				/>
			) : (
				<FormEditTeacher
					ref={saveFormRef}
					info={info}
					loadingEdit={loadingUpdate}
					handleSubmit={handleSubmit}
					saveDataForm={setDataForm}
					dataForm={dataForm}
				/>
			)}
		</Modal>
	);
}

ModalEdit.propTypes = {
	info: PropTypes.objectOf(PropTypes.object).isRequired,
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	updateReq: PropTypes.func.isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	dataForm: PropTypes.objectOf(PropTypes.object).isRequired,
	paginationData: PropTypes.objectOf(PropTypes.any).isRequired,
	setDataForm: PropTypes.func.isRequired,
	keyword: PropTypes.string.isRequired,
};

export default ModalEdit;
