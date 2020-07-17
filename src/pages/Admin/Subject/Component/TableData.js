import React from 'react';
import PropTypes from 'prop-types';
import { Table, ConfigProvider, Button, Icon, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';

function TableData(props) {
	const { data} = props;
	const history = useHistory();
	const column = [
		{
			title: 'Tiêu đề',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Giới thiệu',
			dataIndex: 'introduce',
			key: 'introduce',
			render: value => {
				if (value.length > 30) return <Tooltip title={value}>{value.slice(0, 30)}...</Tooltip>;
				return value;
			},
		},
		{
			title: 'Xử lý',
			key: 'actions',
			render: row => {
				return (
					<div className="phh-group-btn-action">
						<Tooltip title="Chi tiết">
							<Button className="btn-edit" icon="export" onClick={() => history.push(`/admin/mon-hoc/${row.ID}`)} />
						</Tooltip>
						<Tooltip title="Xóa">
							<Button className="btn-delete" icon="delete" />
						</Tooltip>
					</div>
				);
			},
		},
	];

	return (
		<ConfigProvider
			renderEmpty={() => (
				<div style={{ textAlign: 'center' }}>
					<Icon type="frown" style={{ fontSize: 30 }} />
					<h1 style={{ color: 'silver' }}>Không có dữ liệu</h1>
				</div>
			)}
		>
			<Table 	className="phh-table" rowKey='ID' scroll={{x:true}} dataSource={data} columns={column} />
		</ConfigProvider>
	);
}

TableData.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,

};
export default TableData;
