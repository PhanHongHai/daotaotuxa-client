import React from 'react';
import PropTypes from 'prop-types';
import { Icon , } from 'antd';

import { SubjectItemStyle } from '../styled';



function SubjectItem(props) {
	const { data } = props;
	return (
		<SubjectItemStyle>
			<span>
				{data && data.tag}-{data && data.name}
			</span>
			<ul>
				<li>
					<Icon type="read" /> Bài học
				</li>
				<li>
					<Icon type="form" /> Bài tập
				</li>
				<li>
					<Icon type="folder" /> Tài liệu
				</li>
			</ul>
		</SubjectItemStyle>
	);
}

SubjectItem.propTypes = {
	data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default SubjectItem;
