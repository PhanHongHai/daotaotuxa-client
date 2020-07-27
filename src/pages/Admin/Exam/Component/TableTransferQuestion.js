import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Table, Icon, Tag } from 'antd';
import LoadingCustom from '../../../../components/LoadingCustom';

function TableTransferQuestion(props) {
	const { data, rowSelection, loading, pagination ,handleChangePage} = props;

	const columns = [
		{
			title: 'Nội dung',
			dataIndex: 'content',
			key: 'content',
			render: value => <span className="text" dangerouslySetInnerHTML={{ __html: value }} />,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'type',
			key: 'type',
			render: value => {
				if (value && value === 1) return 'Công khai';
				return 'Riêng tư';
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
				rowSelection={rowSelection}
				columns={columns}
				size="small"
				scroll={{ x: true }}
				onChange={handleChangePage}
				loading={{
					spinning: loading,
					indicator: <LoadingCustom margin={0} />,
				}}
				pagination={{
					current: pagination.page && Number(pagination.page),
					total: pagination.total,
					pageSize: pagination.limit && Number(pagination.limit),
					defaultCurrent: pagination.page && Number(pagination.page),
				}}
			/>
		</ConfigProvider>
	);
}

TableTransferQuestion.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	rowSelection: PropTypes.func.isRequired,
	handleChangePage: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TableTransferQuestion;
