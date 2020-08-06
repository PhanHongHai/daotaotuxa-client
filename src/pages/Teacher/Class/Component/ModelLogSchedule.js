import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Table, Tag, ConfigProvider, Icon } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';
import ConvertNumberToText from '../../../../utils/convertNumberToText';

function ModelLogSchedule(props) {
	const {
		visible,
		setVisible,
		dataLog: { data, pagination },
		loading,
		getLogScheduleReq,
		scheduleID,
		classID,
	} = props;
	const onChangeTable = page => {
		getLogScheduleReq({
			req: {
				limit: Number(page.pageSize),
				page: Number(page.current),
				classID,
				scheduleID,
			},
		});
	};
	const handleReload = () => {
		getLogScheduleReq({
			req: {
				limit: 10,
				page: 1,
				classID,
				scheduleID,
			},
		});
	};
	const columns = [
		{
			title: '#',
			key: 'stt',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'MSHV',
			dataIndex: 'accountID',
			key: 'tag',
			render: value => <Tag style={{ fontSize: '14' }}>#{value.tag} </Tag>,
		},
		{
			title: 'Họ Tên',
			dataIndex: 'accountID',
			key: 'name',
			render: value => <span>{value.name}</span>,
		},
		{
			title: 'Điểm Thi',
			children: [
				{
					title: 'Bằng Chữ',
					dataIndex: 'result',
					key: 'point-text',
					width: 150,
					render: value => ConvertNumberToText(value),
				},
				{
					title: 'Bằng Số',
					dataIndex: 'result',
					key: 'point-number',
					width: 150,
					render: value => {
						if (value < 5) return <span style={{ color: 'red' }}>{value} </span>;
						return <span style={{ color: 'green' }}>{value} </span>;
					},
				},
			],
		},
	];
	return (
		<Modal
			title="Danh sách kết quả thi"
			className="phh-modal"
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={null}
			width="750px"
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
				<Button className="" style={{ height: '35px', color: 'white' }} icon="file-excel">
					Xuất excel
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
					className="phh-table"
					dataSource={data}
					columns={columns}
					onChange={onChangeTable}
					bordered
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
		</Modal>
	);
}

ModelLogSchedule.propTypes = {
	scheduleID: PropTypes.string.isRequired,
	classID: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getLogScheduleReq: PropTypes.func.isRequired,
	dataLog: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModelLogSchedule;
