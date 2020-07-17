import React, {  useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card,  } from 'antd';
import _ from 'lodash';

import customMess from '../../../utils/customMessage';
import BreadCrumb from '../../../components/BreadCrumb';
import FormTeacher from './Components/FormTeacher';
import ModalChangePassword from './Components/ModalChangePassword';


const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
];




function Component(props) {
	const {
		profile,
		updateInfoStatus,
		updateInfoReq,
		changePasswordReq,
		changePasswordStatus,
	} = props;

	const [formData, setFormData] = useState({});
	const [formInitRef, setFormInitRef] = useState(null);
	const [visibleChangePass, setVisibleChangePass] = useState(false);
	const saveFormRef = useCallback(node => {
		if (node !== null) {
			setFormInitRef(node);
		}
	}, []);
	const loadingUpdateInfo = updateInfoStatus === 'FETCHING';
	const loadingChangePassword = changePasswordStatus === 'FETCHING';

	const handleSubmit = e => {
		e.preventDefault();
		formInitRef.validateFields(err => {
			if (!err) {
				updateInfoReq({
					req: {
						...formData,
					},
					cb: res => {
						if (res) {
							setFormData({});
							customMess('notification', 'success', res.msg);
						}
					},
				});
			}
		});
	};

	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} pageCurrentText="Thông tin tài khoản" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24} className="mb-15">
						<Card className="phh-card" title="Thông tin cá nhân" loading={_.isEmpty(profile)}>
							<FormTeacher
								ref={saveFormRef}
								handleSubmit={handleSubmit}
								info={profile}
								loadingEdit={loadingUpdateInfo}
								saveDataForm={setFormData}
								openChangePass={setVisibleChangePass}
							/>
						</Card>
					</Col>
				
				</Row>
			</div>
			<ModalChangePassword
				visible={visibleChangePass}
				setVisible={setVisibleChangePass}
				loading={loadingChangePassword}
				changeReq={changePasswordReq}
			/>
		</div>
	);
}

Component.propTypes = {
	profile: PropTypes.objectOf(PropTypes.object).isRequired,
	updateInfoStatus: PropTypes.string.isRequired,
	updateInfoReq: PropTypes.func.isRequired,
	changePasswordReq: PropTypes.func.isRequired,
	changePasswordStatus: PropTypes.string.isRequired,
};

export default Component;
