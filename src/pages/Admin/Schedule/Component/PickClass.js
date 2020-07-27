import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, ConfigProvider, Icon, Tag, Tooltip, Button, Input } from 'antd';
import moment from 'moment';

import LoadingCustom from '../../../../components/LoadingCustom';
import { trainingType } from '../../../../constands/Other';

function PickClass(props) {
	const {
		info: { data, pagination },
		sectorID,
		loadingGetClasses,
		setClassData,
		getClassesReq,
		setVisibleBtnStep2,
		selectedClass,
		setSelectedClass,
		setClassNameValue,
	} = props;
	const refInput = useRef(null);
	const [keyword, setKeyword] = useState('');
	const columns = [
		{
			title: '#',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã lớp',
			dataIndex: 'tag',
			key: 'tag',
			render: value => <Tag style={{ fontSize: 14 }}>#{value} </Tag>,
		},
		{
			title: 'Tên lớp',
			dataIndex: 'name',
			key: 'name',
			render: value => (value.length > 20 ? <Tooltip title={value}>{value.slice(0, 20)}... </Tooltip> : value),
		},
		{
			title: 'Hệ',
			dataIndex: 'trainingSectorID.type',
			key: 'sectorType',
			render: value => trainingType.find(ele => ele.key === value).value,
		},
		{
			title: 'Ngành đào tạo',
			dataIndex: 'trainingSectorID.name',
			key: 'sectorName',
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
	const rowSelection = {
		selectedRowKeys: selectedClass,
		hideDefaultSelections: true,
		onChange: (selectedRowKeys, selectedRows) => {
			if (selectedRows.length > 0) {
				setVisibleBtnStep2(true);
				setSelectedClass(selectedRowKeys);
				setClassNameValue(selectedRows);
				setClassData(selectedRowKeys);
			} else {
				setClassData([]);
				setSelectedClass([]);
				setVisibleBtnStep2(false);
			}
		},
	};

	const onChangeTable = page => {
		getClassesReq({
			req: {
				limit: Number(page.limit),
				page: Number(page.current),
				keyword,
				sectorID: sectorID && sectorID[1],
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
				sectorID: sectorID && sectorID[1],
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
				sectorID: sectorID && sectorID[1],
			},
		});
	};

	return (
		<div>
			<div className="phh-group-search mb-10">
				<Input.Search
					ref={refInput}
					addonBefore={
						<Button
							className="btn-reload"
							style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
							icon="sync"
							loading={loadingGetClasses}
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
						columns={columns}
						rowKey={ele => ele._id}
						scroll={{ x: true }}
						rowSelection={rowSelection}
						onChange={onChangeTable}
						loading={{
							spinning: loadingGetClasses,
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
	);
}

PickClass.propTypes = {
	info: PropTypes.objectOf(PropTypes.any).isRequired,
	loadingGetClasses: PropTypes.bool.isRequired,
	setClassData: PropTypes.func.isRequired,
	getClassesReq: PropTypes.func.isRequired,
	setVisibleBtnStep2: PropTypes.func.isRequired,
	sectorID: PropTypes.string.isRequired,
	selectedClass: PropTypes.objectOf(PropTypes.any).isRequired,
	setSelectedClass: PropTypes.func.isRequired,
	setClassNameValue: PropTypes.func.isRequired,
};

export default PickClass;
