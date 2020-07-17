import React from 'react';
import PropTypes from 'prop-types';
import { Table, ConfigProvider, Button, Icon, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import LoadingCustom from '../../../../components/LoadingCustom';

function TableData(props) {
	const { data, loading, pagination, handleChangePage ,classID} = props;
	const history = useHistory();
	const column = [
		{
			title: 'Mã Môn Học',
			dataIndex: 'tag',
			key: 'tag',
			render: value => <span>#{value}</span>,
		},
		{
			title: 'Tiêu Đề',
			dataIndex: 'name',
			key: 'title',
		},
		{
			title: 'Giới Thiệu',
			dataIndex: 'introduce',
			key: 'introduce',
			render: value => {
				if (value.length > 30) return <Tooltip title={value}>{value.slice(0, 30)}...</Tooltip>;
				return value;
			},
		},
		{
			title: 'Số lượng tệp',
			dataIndex: 'documents',
			key: 'documents',
			render: documents => documents && documents.length,
		},
		{
			title: 'Xử Lý',
			key: 'actions',
			render: row => {
				return (
					<div className="phh-group-btn-default">
						<Button onClick={() => history.push(`/teacher/dashboard/mon-hoc/${classID}/${row._id}`)}>Xem</Button>
					</div>
				);
			},
		},
	];
	const handleCheckData = subjectData => {
		let listRemoveID = [];
		const result = subjectData;
		if (subjectData.length > 0) {
			listRemoveID = subjectData.map(ele => {
				if (_.isNull(ele.subjectID)) return ele._id;
				return 0;
			});
		}
		if (listRemoveID.length > 0) {
			listRemoveID.map(item => {
				return _.remove(subjectData, ele => ele._id === item);
			});
		}
		return result;
	};
	return (
		<ConfigProvider
			renderEmpty={() => (
				<div style={{ textAlign: 'center' }}>
					<Icon type="frown" style={{ fontSize: 20 }} />
					<h1 style={{ color: 'silver' }}>Không có dữ liệu</h1>
				</div>
			)}
		>
			<Table
				loading={{
					spinning: loading,
					indicator: <LoadingCustom margin={0} />,
				}}
				onChange={handleChangePage}
				className="phh-table"
				rowKey="_id"
				scroll={{ x: true }}
				dataSource={handleCheckData(data)}
				columns={column}
				pagination={pagination}
			/>
		</ConfigProvider>
	);
}

TableData.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	loading: PropTypes.bool.isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
	handleChangePage: PropTypes.func.isRequired,
	classID:PropTypes.string.isRequired,
};
export default TableData;
