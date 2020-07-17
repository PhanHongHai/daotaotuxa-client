import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';

function ListLesson(props) {
	const { urlLesson, data, setUrlLesson } = props;
	return (
		<div>
			<List
				className="lesson-list"
				size="large"
				dataSource={data}
				renderItem={item => (
					<List.Item key={item._id} className={urlLesson && urlLesson._id === item._id ? 'active' : ''}>
						<Button
							className="btn-transparent"
							icon="file-pdf"
							onClick={() => {
								setUrlLesson(item);
							}}
						>
							&ensp;{item.title}
						</Button>
					</List.Item>
				)}
			/>
		</div>
	);
}

ListLesson.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	setUrlLesson: PropTypes.func.isRequired,
	urlLesson: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ListLesson;
