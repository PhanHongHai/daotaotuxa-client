import React from 'react';
import {useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox, Row, Col, Spin } from 'antd';

import { translateRules } from '../../../../constands/Other';
import customMess from '../../../../utils/customMessage';
import LoadingCustom from '../../../../components/LoadingCustom';

function PermissionTab(props) {
	const {
		rules,
		decentralizationReq,
		loadingDecentralization,
//		groupRule,
//		getGroupRuleReq,
		ID,
		loadingGetGroupRule,
	} = props;
	const groupRule = useSelector(state => state.settingPage.groupRule);
	const handleChange = e => {
		const valueCheckBox = e.target.value;
		const value = e.target.checked;
		const data = valueCheckBox.split('-');
		decentralizationReq({
			req: {
				[data[1]]: value,
				name: data[0],
				accountID: ID,
			},
			cb: res => {
				if (res) {
					customMess('notification', 'success', res);
				}
			},
		});
	};

	const renderRules = (data, permission) => {
		const defaultCheck = [];
		if (permission && typeof permission !== 'undefined')
			permission.map(item => {
				if (item.READ) defaultCheck.push(`${item.name}-READ`);
				if (item.WRITE) defaultCheck.push(`${item.name}-WRITE`);
				return defaultCheck;
			});
		return data.map(ele => {
			const nameRule = translateRules.find(item => item.key === ele).name;
			return (
				<Col span={24} key={ele}>
					<Row gutter={16}>
						<Col span={12}>
							<span style={{ fontSize: '15px', marginBottom: '10px', float: 'left' }}>
								<strong>{nameRule}</strong>
							</span>
						</Col>
						<Col span={12}>
							<Checkbox.Group key={ele} value={defaultCheck} style={{ float: 'left', width: '235px' }}>
								<Row gutter={16}>
									<Col xs={12} md={12}>
										<Checkbox onChange={handleChange} value={`${ele}-READ`}>
											Đọc
										</Checkbox>
									</Col>
									<Col xs={12} md={12}>
										<Checkbox onChange={handleChange} value={`${ele}-WRITE`}>
											Chỉnh sửa
										</Checkbox>
									</Col>
								</Row>
							</Checkbox.Group>
						</Col>
					</Row>
				</Col>
			);
		});
	};
	return (
		<div>
			<Spin indicator={<LoadingCustom />} spinning={loadingDecentralization || loadingGetGroupRule}>
				<Row justify="center">{renderRules(rules, groupRule)}</Row>
			</Spin>
		</div>
	);
}

PermissionTab.propTypes = {
	rules: PropTypes.instanceOf(Array).isRequired,
	loadingDecentralization: PropTypes.bool.isRequired,
	loadingGetGroupRule: PropTypes.bool.isRequired,
	decentralizationReq: PropTypes.func.isRequired,
//	getGroupRuleReq: PropTypes.func.isRequired,
	ID: PropTypes.string.isRequired,
//	groupRule: PropTypes.instanceOf(Array).isRequired,
};

export default PermissionTab;
