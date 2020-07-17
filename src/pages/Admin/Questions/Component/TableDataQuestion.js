import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, ConfigProvider, Icon, Tooltip, Tag, Switch } from 'antd';
import { useHistory } from 'react-router-dom';

import LoadingCustom from '../../../../components/LoadingCustom';

function TableDataQuestion(props) {
	const { data, pagination, loading, loadingRemove, handleRemoveQuestion, handleChangePage } = props;

	const history = useHistory();

	const columns = [
		{
			title: '#',
			key: 'index',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Nội dung',
			dataIndex: 'content',
			key: 'content',
			render: value => <span className="text" dangerouslySetInnerHTML={{ __html: value }} />,
		},
		{
			title: 'Môn học liên quan',
			dataIndex: 'tag',
			key: 'tag',
			render: value => {
				if (value && value.length > 0) return value.map(ele => <Tag key={ele}> {ele} </Tag>);
			},
		},
		{
			title: 'Mức độ',
			dataIndex: 'level',
			key: 'level',
			render: value => {
				switch (value) {
					case 1:
						return <Tag color="green">Dễ</Tag>;
					case 2:
						return <Tag color="geekblue">Trung bình</Tag>;
					case 3:
						return <Tag color="orange">Khó</Tag>;
					default:
						return <Tag color="red">Rất khó</Tag>;
				}
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'type',
			key: 'type',
			render: value => {
				return <Switch checkedChildren="Công khai" unCheckedChildren="Riêng tư" checked={value} />;
			},
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: row => {
				return (
					<div className="phh-group-btn-action">
						<Tooltip title="Chi tiết">
							<Button icon="export" onClick={() => history.push(`/admin/ngan-hang-cau-hoi/chi-tiet/${row._id}`)} />
						</Tooltip>
						<Tooltip title="Xóa">
							<Button icon="delete" loading={loadingRemove} onClick={() => handleRemoveQuestion(row)} />
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
			<Table
				className="phh-table"
				rowKey={ele => ele._id}
				dataSource={data}
				columns={columns}
				scroll={{ x: true }}
				onChange={handleChangePage}
				pagination={{
					current: pagination.page && Number(pagination.page),
					total: pagination.total,
					pageSize: pagination.limit && Number(pagination.limit),
					defaultCurrent: pagination.page && Number(pagination.page),
				}}
				loading={{
					spinning: loading,
					indicator: <LoadingCustom margin={0} />,
				}}
			/>
		</ConfigProvider>
	);
}

TableDataQuestion.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingRemove: PropTypes.bool.isRequired,
	handleRemoveQuestion: PropTypes.func.isRequired,
	handleChangePage: PropTypes.func.isRequired,
};

export default TableDataQuestion;
