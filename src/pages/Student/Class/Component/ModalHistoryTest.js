import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, ConfigProvider, Table, Tag, Icon } from 'antd';
import moment from 'moment';

import LoadingCustom from '../../../../components/LoadingCustom';
import { scheduleTitle } from '../../../../constands/Other';

function ModalHistoryTest(props) {
	const {
		visible,
		setVisible,
		loading,
		getLogPointReq,
		logsPointData: { data, pagination },
	} = props;
	const onChangeTable = page => {
		getLogPointReq({
			req: {
				limit: Number(page.limit),
				page: Number(page.current),
			},
		});
	};
	const handleReload = () => {
		getLogPointReq({
			req: {
				limit: 10,
				page: 1,
			},
		});
	};
	const column = [
		{
			title: '#',
			key: 'stt',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã môn học',
			dataIndex: 'subjectID.tag',
			key: 'tag',
			render: value => <Tag>#{value} </Tag>,
		},
		{
			title: 'Tên môn học',
			dataIndex: 'subjectID.name',
			key: 'name',
			render: value => <Tag>{value} </Tag>,
		},
		{
			title: 'Nội dung thi',
			dataIndex: 'scheduleID.type',
			key: 'type',
			render: value => {
				const result = scheduleTitle.find(ele => ele.key === value);
				if (result) return result.value;
				return 'Không xác định';
			},
		},
		{
			title: 'Ngày Kiểm Tra',
			dataIndex: 'scheduleID.dayAt',
			key: 'dayAt',
			render: value => moment(value).format('DD-MM-YYYY'),
		},
		{
			title: 'Thời gian thi',
			dataIndex: 'scheduleID.timeAt',
			key: 'timeAt',
			render: value => moment(value).format('HH:mm'),
		},
		{
			title: 'Thời gian làm bài',
			dataIndex: 'scheduleID.timeRange',
			key: 'timeRange',
			render: value => `${value} phút`,
		},
		{
			title: 'Kết quả thi',
			dataIndex: 'result',
			key: 'result',
			render: value => {
				return <span style={{ color: value < 5 ? 'red' : 'green' }}>{value} </span>;
			},
		},
	];
	return (
		<Modal
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={null}
			title="Lịch sử bài kiểm tra"
			className="phh-modal"
			width="850px"
		>
			<div className="phh-group-search mb-10" style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					className=" mr-5"
					style={{ height: '35px', color: 'white' }}
					icon="sync"
					loading={loading}
					onClick={handleReload}
				>
					Làm mới
				</Button>
			</div>
			<ConfigProvider
				renderEmpty={() => (
					<div style={{ textAlign: 'center' }}>
						<Icon type="frown" style={{ fontSize: 30 }} />
						<h1 style={{ color: 'silver' }}>Không có dữ liệu</h1>
					</div>
				)}
			>
				<Table
					bordered
					className="phh-table"
					dataSource={data}
					columns={column}
					rowKey={ele => ele._id}
					scroll={{ x: true }}
					onChange={onChangeTable}
					loading={{
						spinning: loading,
						indicator: <LoadingCustom />,
					}}
					pagination={{
						current: pagination.page && Number(pagination.page),
						total: pagination.total,
						pageSize: pagination.limit && Number(pagination.limit),
						defaultCurrent: pagination.page && Number(pagination.page),
					}}
				/>
			</ConfigProvider>
		</Modal>
	);
}

ModalHistoryTest.propTypes = {
	visible: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getLogPointReq: PropTypes.func.isRequired,
	logsPointData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalHistoryTest;
