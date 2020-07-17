import React from 'react';
import PropTypes from 'prop-types';
import {Spin } from 'antd';
import moment from 'moment';

import countries from '../../../../utils/country.json';

import LoadingCustom from '../../../../components/LoadingCustom';

function InfoStudentComponent(props) {
	const { info, loading } = props;
	const renderCountry = data => {
		const result = countries.find(ele => ele.key === data);
		if (typeof result !== 'undefined') return result.name;
		return 'Không xác định';
	};
	return (
		<Spin indicator={<LoadingCustom margin={50} />} spinning={loading}>
			<div id="info">
				<ul>
					<li>Họ tên : {info && info.name} </li>
					<li>Email : {info && info.email} </li>
					<li>Số điện thoại : {info && info.phoneNumber} </li>
					<li>CMND : {info && info.idCard} </li>
					<li>Ngày sinh : {info && moment(info.birthDay).format('DD-MM-YYYY')} </li>
					<li>Giới Tính : {info && info.sex === 1 ? 'Nam' : 'Nữ'} </li>
					<li>Địa chỉ : {info && info.address} </li>
					<li>Quê quán : {info && renderCountry(info.country)} </li>
				</ul>
			</div>
		</Spin>
	);
}

InfoStudentComponent.propTypes = {
	info: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default InfoStudentComponent;
