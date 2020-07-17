import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';

import CommentItem from './CommentItem';

import { CommentViewStyle } from '../styled';

const data = [
	{
		key: 1,
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content:
			'	We supply a series of design principles, practical patterns and high quality design resources  (Sketch and Axure), to help people create their product prototypes beautifully and efficiently ',
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

function CommentView(props) {
	return (
		<CommentViewStyle>
			<List
				className="comment-list"
				header={`${data.length} bình luận`}
				itemLayout="horizontal"
				dataSource={data}
				renderItem={item => <CommentItem item={item} />}
			/>
		</CommentViewStyle>
	);
}

CommentView.propTypes = {};

export default CommentView;
