import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Skeleton, Icon, Menu, Dropdown, ConfigProvider } from 'antd';

import { ListProfileStyle } from '../Account.styled';

import LoadingCustom from '../../../../components/LoadingCustom';

function ListProfileStudent(props) {
	const { data, loading, saveInfo, openEdit, openRemove, loadingRemove } = props;
	const handleOpenView = value => {
		saveInfo(value);
		openEdit(true);
	};
	const handleOpenRemove = value => {
		openRemove(value);
	};

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
							actions={[
								<Dropdown
									overlayClassName="dropdown-origin"
									overlay={
										<Menu>
											<Menu.Item key="0" onClick={() => handleOpenView(item)}>
												Xem
											</Menu.Item>
											<Menu.Item key="3" onClick={() => handleOpenRemove(item)}>
												{loadingRemove ? <Icon type="loading" /> : 'Xóa'}
											</Menu.Item>
										</Menu>
									}
									trigger={['click']}
								>
									<Button icon="more" style={{ color: 'black' }} className="btn-transparent" />
								</Dropdown>,
							]}
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
	loadingRemove: PropTypes.bool.isRequired,
	saveInfo: PropTypes.func.isRequired,
	openEdit: PropTypes.func.isRequired,
	openRemove: PropTypes.func.isRequired,
};

export default ListProfileStudent;
