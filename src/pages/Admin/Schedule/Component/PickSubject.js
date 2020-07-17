import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, ConfigProvider, Icon, Input, Tooltip, Button, Cascader, Row, Col } from 'antd';
import _ from 'lodash';

import LoadingCustom from '../../../../components/LoadingCustom';
import { trainingType } from '../../../../constands/Other';

function PickSubject(props) {
	const {
		infoSubject: { data, pagination },
		loadingGetSector,
		loadingGetSubject,
		setSubjectData,
		nextStep,
		sectorData,
		getSubjectReq,
		getClassesReq,
		setSectorID,
		sectorID,
	} = props;
	const refInput = useRef(null);
	const [keyword, setKeyword] = useState('');
	const columns = [
		{
			title: '#',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã môn học',
			dataIndex: 'subjectID.tag',
			key: 'tag',
			render: value => <span>#{value}</span>,
		},
		{
			title: 'Tên môn học',
			dataIndex: 'subjectID.name',
			key: 'name',
		},
		{
			title: 'Mô tả',
			dataIndex: 'subjectID.introduce',
			key: 'introduce',
		},
		{
			title: 'Hành động',
			key: 'actions',
			render: row => {
				return (
					<span className="phh-group-btn-action">
						<Tooltip title="Chọn">
							<Button
								className="btn-edit"
								icon="select"
								onClick={() => {
									setSubjectData(row.subjectID);
									getClassesReq({
										req: {
											page: 1,
											limit: 10,
											keyword: '',
											sectorID: sectorID && sectorID[1],
										},
									});
									nextStep();
								}}
							/>
						</Tooltip>
					</span>
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

	const optionSector = sectorArr => {
		const result = [];
		if (sectorArr.length > 0) {
			trainingType.map(ele => {
				const sectorDataByType = _.filter(sectorArr, { type: ele.key });
				const children = sectorDataByType.map(item => {
					return { value: item._id, label: item.name };
				});
				if (children.length > 0)
					result.push({
						value: ele.key,
						label: ele.value,
						children,
					});
				return result;
			});
		}
		return result;
	};
	const handleChangeSector = value => {
		if (value.length > 0) {
			setSectorID(value);
			getSubjectReq({
				req: {
					sectorID: value[1],
					page: 1,
					limit: 10,
					keyword: '',
				},
			});
		}
	};
	const onChangeTable = page => {
		getSubjectReq({
			req: {
				limit: Number(page.limit),
				page: Number(page.current),
				keyword,
				sectorID:sectorID && sectorID[1],
			},
		});
	};
	const handleReload = () => {
		refInput.current.input.state.value = '';
		setKeyword('');
		getSubjectReq({
			req: {
				sectorID:sectorID && sectorID[1],
				keyword: '',
				page: 1,
				limit: 10,
			},
		});
	};
	const handleSearch = value => {
		setKeyword(value);
		getSubjectReq({
			req: {
				sectorID:sectorID && sectorID[1],
				keyword: value,
				page: 1,
				limit: 10,
			},
		});
	};
	return (
		<div>
			<div className="mt-10 mb-15">
				<Row justify="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Col xs={4}>
						<h4>Chọn ngành đào tạo</h4>
					</Col>
					<Col xs={14}>
						{loadingGetSector ? (
							<Icon type="loading" />
						) : (
							<Cascader
								style={{ width: '100%' }}
								onChange={handleChangeSector}
								placeholder="Chọn ngành đào tạo"
								options={optionSector(sectorData)}
								defaultValue={sectorID}
							/>
						)}
					</Col>
				</Row>
			</div>
			<div>
				<div className="phh-group-search mt-10 mb-10">
					<Input.Search
						ref={refInput}
						addonBefore={
							<Button
								className="btn-reload"
								style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
								icon="sync"
								onClick={handleReload}
							>
								Làm mới
							</Button>
						}
						placeholder="Nhập từ khóa.."
						enterButton="Tìm kiếm"
						onSearch={handleSearch}
					/>
				</div>
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
						dataSource={handleCheckData(data)}
						onChange={onChangeTable}
						columns={columns}
						rowKey={ele => ele._id}
						scroll={{ x: true }}
						loading={{
							spinning: loadingGetSubject,
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

PickSubject.propTypes = {
	infoSubject: PropTypes.objectOf(PropTypes.any).isRequired,
	sectorData: PropTypes.objectOf(PropTypes.any).isRequired,
	loadingGetSector: PropTypes.bool.isRequired,
	loadingGetSubject: PropTypes.bool.isRequired,
	setSubjectData: PropTypes.func.isRequired,
	nextStep: PropTypes.func.isRequired,
	getSubjectReq: PropTypes.func.isRequired,
	setSectorID: PropTypes.func.isRequired,
	getClassesReq: PropTypes.func.isRequired,
	sectorID: PropTypes.string.isRequired,
};

export default PickSubject;
