import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Input, Table, Tooltip } from 'antd';
import { ModalListTeacher } from '../styled';

import LoadingCustom from '../../../../components/LoadingCustom';

function ModalPickTeacher(props) {
	const { visible, setVisible, handlePick, searchTeacherReq, loadingHandle } = props;
	const refInputSearch = useRef(null);
	const { pagination, data } = useSelector(state => state.classPage.teachers);
	const getTeachersStatus = useSelector(state => state.classPage.getTeachersStatus);
	const searchTeacherForClassStatus = useSelector(state => state.classPage.searchTeacherForClassStatus);
	const [keyWord, setKeyWord] = useState('');
	const loading = getTeachersStatus === 'FETCHING' || searchTeacherForClassStatus === 'FETCHING';
	const column = [
		{
			title: 'Họ tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Xử lý',
			key: 'actions',
			render: row => (
				<span className="list-student-partner">
					<Tooltip title="Chọn">
						<Button icon="check" style={{ color: '#1bb394' }} loading={loadingHandle} onClick={() => handlePick(row)} />
					</Tooltip>
				</span>
			),
		},
	];
	const handleReload = () => {
		setKeyWord('');
		refInputSearch.current.input.state.value = '';
		searchTeacherReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				type: 'teacher',
			},
		});
	};
	const handleSearch = value => {
		setKeyWord(value);
		searchTeacherReq({
			req: {
				limit: 10,
				page: 1,
				type: 'teacher',
				keyword: value,
			},
		});
	};
	const handleChangeTable = page => {
		searchTeacherReq({
			limit: 10,
			page: Number(page.current),
			type: 'teacher',
			keyword: keyWord,
		});
	};
	return (
		<ModalListTeacher
			className="phh-modal"
			title="Danh sách giảng viên"
			footer={null}
			visible={visible}
			onCancel={() => setVisible(false)}
		>
			<div className="modal-pick-teacher">
				<div className="phh-group-search mb-10">
					<Input.Search
						ref={refInputSearch}
						addonBefore={
							<Tooltip title="Làm mới">
								<Button
									className="btn-reload"
									style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
									icon="sync"
									onClick={handleReload}
								/>
							</Tooltip>
						}
						placeholder="Nhập từ khóa.."
						enterButton
						onSearch={handleSearch}
					/>
				</div>
				<Table
					className="phh-table"
					dataSource={data}
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
					size="small"
					columns={column}
					scroll={{ x: true }}
					onChange={handleChangeTable}
				/>
			</div>
		</ModalListTeacher>
	);
}

ModalPickTeacher.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	handlePick: PropTypes.func.isRequired,
	loadingHandle: PropTypes.bool.isRequired,
	searchTeacherReq: PropTypes.func.isRequired,
};

export default ModalPickTeacher;
