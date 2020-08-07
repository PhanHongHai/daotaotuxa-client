import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table, Tag, Button, Tooltip, Input } from 'antd';
import _ from 'lodash';

import LoadingCustom from '../../../../components/LoadingCustom';

function TablePointAll(props) {
	const {
		dataPoint: { data, pagination },
		type,
		loading,
	} = props;
	const [isEditRow, setIsEditRow] = React.useState(false);
	const column = [
		{
			title: '#',
			key: 'stt',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã học viên',
			dataIndex: 'tag',
			key: 'tag',
		},
		{
			title: 'Họ Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Lập trình web',
			dataIndex: 'ltw',
			key: 'ltw',
		},
		{
			title: 'Ngoại ngữ chuyên ngành',
			dataIndex: 'nncn',
			key: 'nncn',
		},
		{
			title: 'Hệ thống thông tin',
			dataIndex: 'httt',
			key: 'httt',
		},
		{
			title: 'Toán đại cương',
			dataIndex: 'ltm',
			key: 'ltm',
		},
		{
			title: 'Vật lý đại cương',
			dataIndex: 'vldc',
			key: 'vldc',
		},
	];
	const columnPointSubject = [
		{
			title: '#',
			key: 'stt',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã học viên',
			dataIndex: 'accountID',
			key: 'tag',
			render: value => <Tag style={{ fontSize: 14 }}>#{value.tag} </Tag>,
		},
		{
			title: 'Họ Tên',
			dataIndex: 'accountID',
			key: 'name',
			render: value => <span>{value.name} </span>,
		},
		{
			title: 'Tên môn học',
			children: [
				{
					title: 'Điểm Giữa Kỳ (30%)',
					dataIndex: 'pointMiddle',
					key: 'point-mid',
					width: 150,
					render: value => {
						if (value < 5)
							return (
								<span
									className="edit-row"
									style={{
										color: 'red',
										position: 'relative',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									{isEditRow ? (
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<Input value={value} />
											<span
												style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginLeft: '5px' }}
											>
												<Button
													style={{
														marginRight: 5,
													}}
													onClick={() => setIsEditRow(false)}
													icon="check"
													className="btn-transparent"
												/>
												<Button
													style={{}}
													onClick={() => setIsEditRow(false)}
													icon="close"
													className="btn-transparent"
												/>
											</span>
										</div>
									) : (
										<>
											{value}
											<Tooltip title="Sửa">
												<Button
													style={{
														position: ' absolute',
														top: 0,
														right: '10%',
														cursor: 'pointer',
													}}
													onClick={() => setIsEditRow(true)}
													icon="edit"
													className="btn-transparent"
												/>
											</Tooltip>
										</>
									)}
								</span>
							);
						return <span style={{ color: 'green' }}>{value} </span>;
					},
				},
				{
					title: 'Điểm Cuối Kỳ (70%)',
					dataIndex: 'pointLast',
					key: 'point-last',
					width: 150,
					render: value => {
						if (value < 5) return <span style={{ color: 'red' }}>{value} </span>;
						return <span style={{ color: 'green' }}>{value} </span>;
					},
				},
				{
					title: 'Điểm Tổng Kết',
					dataIndex: 'pointTotal',
					key: 'point-last',
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
				bordered
				columns={type ? column : columnPointSubject}
				rowKey={ele => ele._id}
				scroll={{ x: true }}
				loading={{
					spinning: loading,
					indicator: <LoadingCustom margin={10} />,
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

TablePointAll.propTypes = {
	dataPoint: PropTypes.instanceOf(Array).isRequired,
	type: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default TablePointAll;
