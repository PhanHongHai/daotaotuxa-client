import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table, Tooltip, Button, Input } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';
import ModalViewExam from './ModalViewExam';

function PickExam(props) {
	const {
		info: { data, pagination },
		loading,
		loadingAuth,
		nextStep,
		getExamsReq,
		setExamData,
		authPasswordReq,
	} = props;

	const [keyword, setKeyword] = useState('');
	const refSearch = useRef(null);
	const [visibleViewExam, setVisibleViewExam] = useState(false);
	const [currentExam, setCurrentExam] = useState({});

	useEffect(() => {
		getExamsReq({
			req: {
				page: 1,
				limit: 10,
				keyword: '',
			},
		});
	}, []);

	const columns = [
		{
			title: '#',
			key: 'index',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Tiêu đề',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Số lượng câu hỏi',
			dataIndex: 'questions',
			key: 'number',
			render: value => value.length,
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: row => {
				return (
					<div className="phh-group-btn-action">
						<Tooltip title="Xem đề thi">
							<Button
								icon="eye"
								onClick={() => {
									setCurrentExam(row);
									setVisibleViewExam(true);
								}}
							/>
						</Tooltip>
						<Tooltip title="Chọn">
							<Button
								icon="select"
								onClick={() => {
									setExamData(row);
									nextStep();
								}}
							/>
						</Tooltip>
					</div>
				);
			},
		},
	];
	const onChangeTable = page => {
		getExamsReq({
			req: {
				limit: Number(page.limit),
				page: Number(page.current),
				keyword,
			},
		});
	};
	const handleReload = () => {
		refSearch.current.input.state.value = '';
		setKeyword('');
		getExamsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
			},
		});
	};
	const handleSearchExam = value => {
		setKeyword(value);
		getExamsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
			},
		});
	};

	return (
		<div>
			<div className="phh-group-search mb-10">
				<Input.Search
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
					ref={refSearch}
					placeholder="Nhập từ khóa.."
					onSearch={handleSearchExam}
					enterButton
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
						rowKey={ele => ele._id}
						dataSource={data}
						columns={columns}
						scroll={{ x: true }}
						onChange={onChangeTable}
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
			<ModalViewExam
				visible={visibleViewExam}
				setVisible={setVisibleViewExam}
				data={currentExam}
				authAccountReq={authPasswordReq}
				loadingAuth={loadingAuth}
			/>
		</div>
	);
}

PickExam.propTypes = {
	loading: PropTypes.bool.isRequired,
	loadingAuth: PropTypes.bool.isRequired,
	info: PropTypes.objectOf(PropTypes.any).isRequired,
	nextStep: PropTypes.func.isRequired,
	getExamsReq: PropTypes.func.isRequired,
	setExamData: PropTypes.func.isRequired,
	authPasswordReq: PropTypes.func.isRequired,
};

export default PickExam;
