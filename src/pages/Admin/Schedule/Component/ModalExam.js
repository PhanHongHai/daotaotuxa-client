import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Table, ConfigProvider, Tooltip, Button, Input, Icon } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';
import ModalViewExam from './ModalViewExam';
import customMessage from '../../../../utils/customMessage';

function ModalExam(props) {
	const {
		visible,
		setVisible,
		getExamsReq,
		loading,
		authPasswordReq,
		updateScheduleReq,
		loadingAuth,
		loadingUpdate,
		exams: { data, pagination },
		examCurrent,
		scheduleID,
	} = props;
	const refSearch = useRef(null);
	const [keyword, setKeyword] = useState('');
	const [currentExam, setCurrentExam] = useState({});
	const [visibleViewExam, setVisibleViewExam] = useState(false);

	const handleUpdateExam = examID => {
		updateScheduleReq({
			req: {
				examID,
			},
			scheduleID,
			cb: res => {
				if (res && res.isUpdated) {
					setVisible(false);
					customMessage('notification', 'success', res.msg);
				}
			},
		});
	};

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
						{examCurrent && examCurrent._id === row._id ? (
							'Đã chọn'
						) : (
							<>
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
									<Button icon="select" loading={loadingUpdate} onClick={() => handleUpdateExam(row._id)} />
								</Tooltip>
							</>
						)}
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
		<Modal
			title="Danh sách đề thi"
			footer={null}
			width="700px"
			visible={visible}
			onCancel={() => setVisible(false)}
			className="phh-modal"
		>
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
		</Modal>
	);
}

ModalExam.propTypes = {
	loading: PropTypes.bool.isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
	loadingAuth: PropTypes.bool.isRequired,
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getExamsReq: PropTypes.func.isRequired,
	authPasswordReq: PropTypes.func.isRequired,
	updateScheduleReq: PropTypes.func.isRequired,
	scheduleID: PropTypes.string.isRequired,
	exams: PropTypes.objectOf(PropTypes.any).isRequired,
	examCurrent: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalExam;
