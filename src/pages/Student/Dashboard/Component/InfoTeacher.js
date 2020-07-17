import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon, Divider } from 'antd';
import moment from 'moment';

import TeacherIcon from '../../../../assets/images/teacherIcon.svg';
import { InfoTeacherStyle } from '../styled';

import countries from '../../../../utils/country.json';

const renderCountry = value => {
	return countries.find(ele => ele.key === value).name;
};

function InfoTeacher(props) {
	const { info } = props;

	return (
		<InfoTeacherStyle>
			<Avatar  shape="square" size={80} src={TeacherIcon} style={{ marginBottom: '15px', backgroundColor: '#10998d' }} />
			<span className="profile-info">
				<ul>
					<li style={{ justifyContent: 'center' }}>
						<h2>{info && info.accountID.name} </h2>
					</li>
					<li style={{ textAlign: 'justify' }}>Giới thiệu : {info && info.accountID.introduce}</li>
					<li>
						<span>
							<Icon type="home" theme="filled" />
						</span>
						<p>Địa chỉ : {info && info.accountID.address} </p>
					</li>
					<li>
						<span>
							<Icon type="idcard" theme="filled" />
						</span>
						<p>Quê quán : {info && renderCountry(info.accountID.country)} </p>
					</li>
					<li>
						<span>
							<Icon type="calendar" theme="filled" />
						</span>
						<p>Ngày sinh : {info && moment(info.accountID.birthDay).format('DD-MM-YYYY')} </p>
					</li>
					<Divider />
					{/* <li>
						<span>
							<Icon type="facebook" theme="filled" />
						</span>
						<p>
							<a href={`https://facebook.com/${info && info.email}`} rel="noopener noreferrer" target="_blank">
								facebook.com/{info && info.email}
							</a>
						</p>
					</li> */}
					<li style={{ textAlign: 'justify' }}>Liên hệ </li>
					<li>
						<span>
							<Icon type="phone" theme="filled" />
						</span>
						<p>
							<button
								type="button"
								onClick={() => window.open('tel://017543343334', 'Tạo cuộc gọi', 'width:200,height=100')}
								className="btn-transparent pointer"
							>
								{info && info.accountID.phoneNumber}
							</button>
						</p>
					</li>
					<li>
						<span>
							<Icon type="mail" theme="filled" />
						</span>
						<p>
							<a href={`mailto: ${info && info.accountID.email}`}>{info && info.accountID.email}</a>
						</p>
					</li>
				</ul>
			</span>
		</InfoTeacherStyle>
	);
}

InfoTeacher.propTypes = {
	info: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default InfoTeacher;
