import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table, Tag, Button, Tooltip, Input } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';
import customMessage from '../../../../utils/customMessage';

function TablePointAll(props) {
	const {
		dataPoint: { data, pagination },
		type,
		loading,
		getReq,
		subjectID,
		classID,
		subjectsOfClass,
		updatePointMiddleReq,
		loadingUpdatePointMiddle,
	} = props;
	const [isEditRow, setIsEditRow] = React.useState(false);
	const [valueMiddlePoint, setValueMiddlePoint] = React.useState(null);
	const [pageCurrent, setPageCurrent] = React.useState({
		limit: 10,
		page: 1,
	});
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
	const renderTitleSubject = () => {
		if (subjectID !== null && subjectsOfClass.length > 0) {
			const result = subjectsOfClass.find(ele => ele.subjectID._id === subjectID);
			if (result) return result.subjectID.name;
		}
		return 'Không xác định';
	};
	const onChangeInputMiddlePoint = e => {
		const { value } = e.target;
		setValueMiddlePoint(value);
	};
	const onChangeTable = page => {
		setPageCurrent({
			limit: Number(page.pageSize),
			page: Number(page.current),
		});
		getReq({
			req: {
				limit: Number(page.pageSize),
				page: Number(page.current),
				classID,
				subjectID,
			},
		});
	};
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
			title: renderTitleSubject(),
			children: [
				{
					title: 'Điểm Giữa Kỳ (30%)',
					key: 'point-mid',
					width: 150,
					render: row => {
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
									{isEditRow === row._id ? (
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<Input
												style={{ height: '30px' }}
												name="pointMiddle"
												onChange={onChangeInputMiddlePoint}
												defaultValue={row.pointMiddle}
											/>
											<span
												style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginLeft: '5px' }}
											>
												<Button
													style={{
														marginRight: 5,
													}}
													onClick={() => {
														updatePointMiddleReq({
															req: {
																pointMiddle: Number(valueMiddlePoint),
															},
															pageCurrent,
															subjectID,
															classID,
															ID: row._id,
															cb: res => {
																if (res && res.isUpdated) {
																	setIsEditRow(null);
																	setValueMiddlePoint(null);
																	customMessage('notification', 'success', res.msg);
																}
															},
														});
													}}
													disabled={valueMiddlePoint === null}
													icon="check"
													className="btn-transparent"
													loading={loadingUpdatePointMiddle}
												/>
												<Button
													style={{}}
													onClick={() => setIsEditRow(null)}
													icon="close"
													className="btn-transparent"
												/>
											</span>
										</div>
									) : (
										<>
											<span style={{color:row.pointMiddle < 5 ? 'red' : 'green'}}>{row.pointMiddle}</span>
											<Tooltip title="Sửa">
												<Button
													style={{
														position: ' absolute',
														top: 0,
														right: '10%',
														cursor: 'pointer',
													}}
													onClick={() => setIsEditRow(row._id)}
													icon="edit"
													className="btn-transparent"
												/>
											</Tooltip>
										</>
									)}
								</span>
							);
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
					key: 'point-total',
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
				onChange={onChangeTable}
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
	dataPoint: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectsOfClass: PropTypes.objectOf(PropTypes.any).isRequired,
	type: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	loadingUpdatePointMiddle: PropTypes.bool.isRequired,
	subjectID: PropTypes.string.isRequired,
	classID: PropTypes.string.isRequired,
	updatePointMiddleReq: PropTypes.func.isRequired,
	getReq: PropTypes.func.isRequired,
};

export default TablePointAll;
