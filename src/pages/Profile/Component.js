import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Tree, Icon } from 'antd';
import _ from 'lodash';

import customMess from '../../utils/customMessage';
import BreadCrumb from '../../components/BreadCrumb';
import FormStudent from './Components/FormStudent';
import FormTeacher from './Components/FormTeacher';
import FormPartner from './Components/FormPartner';
import FormDefault from './Components/FormDefault';
import ModalChangePassword from './Components/ModalChangePassword';
import { translateRules } from '../../constands/Other';

const { TreeNode } = Tree;

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
		rules,
		ruleAccount,
		getRuleOfAccountStatus,
		updateInfoStatus,
		getRulesStatus,
		updateInfoReq,
		getRulesReq,
		getRuleOfAccount,
		changePasswordReq,
		changePasswordStatus,
	} = props;
	useEffect(() => {
		getRulesReq({
			req: {
				page: 1,
				limit: 12,
			},
		});
		getRuleOfAccount({
			ID: profile && profile._id,
		});
	}, [getRulesReq, profile, getRuleOfAccount]);

	const [formData, setFormData] = useState({});
	const [formInitRef, setFormInitRef] = useState(null);
	const [visibleChangePass, setVisibleChangePass] = useState(false);
	const saveFormRef = useCallback(node => {
		if (node !== null) {
			setFormInitRef(node);
		}
	}, []);
	const loadingUpdateInfo = updateInfoStatus === 'FETCHING';
	const loadingGetRules = getRulesStatus === 'FETCHING';
	const loadingGetRuleAccount = getRuleOfAccountStatus === 'FETCHING';
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
	const renderProfileByType = type => {
		switch (type) {
			case 'student':
				return (
					<FormStudent
						ref={saveFormRef}
						handleSubmit={handleSubmit}
						info={profile}
						loadingEdit={loadingUpdateInfo}
						saveDataForm={setFormData}
						openChangePass={setVisibleChangePass}
					/>
				);
			case 'teacher':
				return (
					<FormTeacher
						ref={saveFormRef}
						handleSubmit={handleSubmit}
						info={profile}
						loadingEdit={loadingUpdateInfo}
						saveDataForm={setFormData}
						openChangePass={setVisibleChangePass}
					/>
				);

			case 'partner':
				return (
					<FormPartner
						ref={saveFormRef}
						handleSubmit={handleSubmit}
						info={profile}
						loadingEdit={loadingUpdateInfo}
						saveDataForm={setFormData}
						openChangePass={setVisibleChangePass}
					/>
				);
			default:
				return (
					<FormDefault
						ref={saveFormRef}
						handleSubmit={handleSubmit}
						info={profile}
						loadingEdit={loadingUpdateInfo}
						saveDataForm={setFormData}
						openChangePass={setVisibleChangePass}
						formData={formData}
					/>
				);
		}
	};
	const renderRule = data => {
		return data.map(ele => {
			const titleRule = translateRules.find(item => item.key === ele).name;
			return (
				<TreeNode title={titleRule} key={ele}>
					<TreeNode switcherIcon={<Icon type="eye" />} title="Đọc dữ liệu" key={`${ele}-READ`} />
					<TreeNode switcherIcon={<Icon type="edit" />} title="Chỉnh sửa dữ liệu" key={`${ele}-WRITE`} />
				</TreeNode>
			);
		});
	};
	const returnCheckedRule = accountRule => {
		const result = [];
		if (accountRule.length > 0)
			accountRule.map(ele => {
				if (ele.READ) result.push(`${ele.name}-READ`);
				if (ele.WRITE) result.push(`${ele.name}-WRITE`);
				return result;
			});
		return result;
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
					<Col xs={24} sm={12} md={16} className="mb-15">
						<Card className="phh-card" title="Thông tin cá nhân" loading={_.isEmpty(profile)}>
							{renderProfileByType(profile && profile.role)}
						</Card>
					</Col>
					<Col xs={24} sm={12} md={8} className="phh-margin-bottom-15">
						<Card className="phh-card" title="Quyền" loading={loadingGetRules || loadingGetRuleAccount}>
							<Tree blockNode disabled showLine checkable defaultCheckedKeys={returnCheckedRule(ruleAccount)}>
								{renderRule(rules)}
							</Tree>
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
	rules: PropTypes.objectOf(PropTypes.object).isRequired,
	ruleAccount: PropTypes.instanceOf(Array).isRequired,
	getRuleOfAccountStatus: PropTypes.string.isRequired,
	updateInfoStatus: PropTypes.string.isRequired,
	getRulesStatus: PropTypes.string.isRequired,
	updateInfoReq: PropTypes.func.isRequired,
	getRulesReq: PropTypes.func.isRequired,
	getRuleOfAccount: PropTypes.func.isRequired,
	changePasswordReq: PropTypes.func.isRequired,
	changePasswordStatus: PropTypes.string.isRequired,
};

export default Component;
