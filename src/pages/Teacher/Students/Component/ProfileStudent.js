import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Skeleton, Icon, ConfigProvider } from 'antd';

import { ListProfileStyle } from '../styled';

import LoadingCustom from '../../../../components/LoadingCustom';

function ListProfileStudent(props) {
	const { data, loading } = props;
	return (
		<ConfigProvider
			renderEmpty={() => (
				<div style={{ textAlign: 'center' }}>
					<Icon type="frown" style={{ fontSize: 30 }} />
					<h1 style={{ color: 'silver' }}>Không có dữ liệu</h1>
				</div>
			)}
		>
			<ListProfileStyle>
				<List
					loading={{
						spinning: loading,
						indicator: <LoadingCustom margin={5} />,
					}}
					itemLayout="horizontal"
					dataSource={data}
					renderItem={item => (
						<List.Item
							key={item._id}
							actions={[<Button icon="eye" style={{ color: 'black' }} className="btn-transparent">Xem</Button>]}
						>
							<Skeleton title={false} loading={loading}>
								<List.Item.Meta
									title={
										<span style={{ color: 'black' }}>
											<Icon type="file-pdf" />
											&ensp;{item.title}
										</span>
									}
								/>
							</Skeleton>
						</List.Item>
					)}
				/>
			</ListProfileStyle>
		</ConfigProvider>
	);
}

ListProfileStudent.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default ListProfileStudent;
