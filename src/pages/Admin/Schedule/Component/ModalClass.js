import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal, Table, ConfigProvider, Icon, Tag, Tooltip, Button, Input } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';
import customMessage from '../../../../utils/customMessage';

function ModalClass(props) {
	const {
		visible,
		setVisible,
		classes: { data, pagination },
		classCurrent,
		getClassesReq,
		sectorID,
		scheduleID,
		loading,
		loadingUpdate,
		updateScheduleReq,
	} = props;
	const columns = [
		{
			title: '#',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã lớp',
			dataIndex: 'name',
			key: 'tag',
			render: value => <Tag>#{value} </Tag>,
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
	const refInput = useRef(null);
	const [keyword, setKeyword] = useState('');
	const [classData, setClassData] = useState([]);
	const returnArrClassID = dataClass => {
		const result = [];
		if (dataClass && dataClass.length > 0) {
			dataClass.forEach(ele => result.push(ele._id));
		}
		return result;
	};
	const rowSelection = {
		selectedRowKeys: returnArrClassID(classCurrent),
		hideDefaultSelections: true,
		onChange: (selectedRowKeys, selectedRows) => {
			if (selectedRows.length > 0) {
				const arrClass = [];
				selectedRows.forEach(ele => arrClass.push(ele._id));
				setClassData(arrClass);
			} else {
				customMessage('message', 'warn', 'Lịch thi phải tối thiểu 1 lớp tham gia');
			}
		},
	};
	const onChangeTable = page => {
		getClassesReq({
			req: {
				limit: Number(page.limit),
				page: Number(page.current),
				keyword,
				sectorID,
			},
		});
	};
	const handleReloadClass = () => {
		refInput.current.input.state.value = '';
		setKeyword('');
		getClassesReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				sectorID,
			},
		});
	};
	const handleSearchClass = value => {
		setKeyword(value);
		getClassesReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
				sectorID,
			},
		});
	};
	const handleUpdateClass = () => {
		if (classData && classData.length > 0)
			updateScheduleReq({
				req: {
					classes: classData,
				},
				scheduleID,
				cb: res => {
					if (res && res.isUpdated) {
						setClassData([]);
						setVisible(false);
						customMessage('notification', 'success', res.msg);
					}
				},
			});
		else customMessage('notification', 'error', 'Danh sách lớp phải tối thiểu có 1 lớp tham gia');
	};
	return (
		<Modal
			title="Danh sách lớp trong lịch thi"
			className="phh-modal"
			width="700px"
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<Button
						icon="plus"
						className="btn-submit"
						disabled={classData.length < 1}
						loading={loadingUpdate}
						onClick={handleUpdateClass}
					>
						Cập nhật danh sách
					</Button>
					<Button
						className="btn-cancel ml-5"
						onClick={() => {
							setClassData([]);
							setVisible(false);
						}}
					>
						Hủy
					</Button>
				</span>
			}
		>
			<div>
				<div className="phh-group-search mb-10">
					<Input.Search
						ref={refInput}
						addonBefore={
							<Button
								className="btn-reload"
								style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
								icon="sync"
								loading={loading}
								onClick={handleReloadClass}
							>
								Làm mới
							</Button>
						}
						placeholder="Nhập từ khóa.."
						enterButton
						onSearch={handleSearchClass}
					/>
				</div>
				<div>
					<ConfigProvider
						renderEmpty={() => (
							<div style={{ textAlign: 'center' }}>
								<Icon type="frown" style={{ fontSize: 20 }} />
								<h1 style={{ color: 'silver', fontSize: 20 }}>Không có dữ liệu</h1>
							</div>
						)}
					>
						<Table
							className="phh-table"
							dataSource={data}
							size="small"
							columns={columns}
							rowKey={ele => ele._id}
							rowSelection={rowSelection}
							onChange={onChangeTable}
							scroll={{ x: true }}
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
				</div>
			</div>
		</Modal>
	);
}

ModalClass.propTypes = {
	scheduleID: PropTypes.string.isRequired,
	sectorID: PropTypes.string.isRequired,
	classCurrent: PropTypes.instanceOf(Array).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getClassesReq: PropTypes.func.isRequired,
	updateScheduleReq: PropTypes.func.isRequired,
	classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalClass;
