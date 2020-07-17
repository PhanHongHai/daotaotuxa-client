import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';

import CommentItem from './CommentItem';

const data = [
	{
		key: 1,
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content:
			'We supply a series of design principles, practical patterns and high quality design resources  (Sketch and Axure), to help people create their product prototypes beautifully and efficiently ',
		children: [
			{
				key: 2,
				author: 'Han Solo',
				avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				content:
					'	We supply a series of design principles, practical patterns and high quality design resources  (Sketch and Axure), to help people create their product prototypes beautifully and efficiently ',
			},
		],
	},
	{
		key: 2,
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content:
			'	We supply a series of design principles, practical patterns and high quality design resources  (Sketch and Axure), to help people create their product prototypes beautifully and efficiently ',
		children: [],
	},
];
function CommentList(props) {
	return (
		<div>
			<List
				className="comment-list"
				header={<h1>{data.length} bình luận</h1>}
				itemLayout="horizontal"
				dataSource={data}
				renderItem={item => <CommentItem item={item} />}
			/>
		</div>
	);
}

CommentList.propTypes = {};

export default CommentList;
