import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Tag, Tooltip, ConfigProvider, Table } from 'antd';
import moment from 'moment';

function ModalViewClass(props) {
	const { data, visible, setVisible } = props;
	const columns = [
		{
			title: '#',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã lớp',
			dataIndex: 'tag',
			key: 'tag',
			render: value => <Tag>#{value} </Tag>,
		},
		{
			title: 'Tên lớp',
			dataIndex: 'name',
			key: 'tag',
			render: value => (value.length > 20 ? <Tooltip title={value}>{value.slice(0, 20)}... </Tooltip> : value),
		},
		{
			title: 'Thời gian học',
			key: 'dateTime',
			render: row => (
				<span>
					{moment(row.startAt).year()} - &ensp;{moment(row.endAt).year() + 4}
				</span>
			),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: value => {
				switch (value) {
					case 'OP':
						return <Tag color="#1bb394">Chờ Khai giảng</Tag>;
					case 'HP':
						return <Tag color="blue">Đang diễn ra</Tag>;
					default:
						return <Tag color="gray">Kết thúc</Tag>;
				}
			},
		},
	];
	return (
		<Modal
			className="phh-modal"
			title="Danh sách lớp"
			width="700px"
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={null}
		>
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
					dataSource={data}
					columns={columns}
					rowKey={ele => ele._id}
					scroll={{ x: true }}
					pagination={{
						total: data && data.length,
						pageSize: 6,
						defaultCurrent: 1,
					}}
				/>
			</ConfigProvider>
		</Modal>
	);
}

ModalViewClass.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
};

export default ModalViewClass;
