import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PostList(props) {
	const { data } = props;
	const renderPostItem = postData => {
		if (postData.length) {
			return postData.map(ele => (
				<li key={ele._id}>
					<Link to="/student/dashboard/thao-luan/123">
						<p> {ele.title} </p>
					</Link>
				</li>
			));
		}
	};
	return (
		<div>
			<ul style={{ padding: '0 0 0 1em' }}> {renderPostItem(data)} </ul>
		</div>
	);
}

PostList.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};

export default PostList;
