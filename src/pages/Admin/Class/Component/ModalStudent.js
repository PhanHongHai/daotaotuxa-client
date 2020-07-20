import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Icon, Button, Tooltip, Table, Input, Popover, ConfigProvider } from 'antd';
import { ModalListStudent } from '../styled';

import LoadingCustom from '../../../../components/LoadingCustom';
import customMess from '../../../../utils/customMessage';

const { Panel } = Collapse;

function ModalStudent(props) {
	const {
		visible,
		setVisible,
		listStudent,
		listStudentPartner,
		getStudentOfClassReq,
		getStudentsReq,
		addStudentToClassReq,
		removeStudentClassReq,
		loadingAddStudentToClass,
		loadingRemoveStudentOfClass,
		loadingGetStudents,
		loadingGetStudentOfClass,
		paginationStudentOfClass,
		paginationStudents,
		classData,
	} = props;

	const [keyword, setKeyword] = useState({
		students: '',
		studentClass: '',
	});
	const [pageStudentsCurrent, setPageStudentsCurrent] = useState({
		page: 1,
		limit: 3,
	});
	const [pageStudentClassCurrent, setPageStudentClassCurrent] = useState({
		page: 1,
		limit: 3,
	});
	const refInput = useRef(null);
	const handleChangeInputStudents = e => {
		const { name, value } = e.target;
		setKeyword({ ...keyword, [name]: value });
	};
	const columnList = [
		{
			title: 'Họ tên',
			dataIndex: 'accountID.name',
			key: 'name',
			filterDropdown: () => {
				return (
					<div style={{ padding: 8 }}>
						<Input
							ref={refInput}
							onChange={handleChangeInputStudents}
							name="students"
							placeholder="tìm kiếm"
							style={{ width: 188, marginBottom: 8, display: 'block', height: '30px' }}
						/>
						<Button
							type="primary"
							icon="search"
							size="small"
							style={{ width: 90, marginRight: 8 }}
							onClick={() =>
								getStudentOfClassReq({
									req: {
										page: 1,
										limit: 3,
										keyword: keyword.students,
									},
								})
							}
						/>
						<Button
							size="small"
							style={{ width: 90 }}
							icon="sync"
							onClick={() => {
								refInput.current.state.value = '';
								setKeyword({ ...keyword, studentClass: '' });
								getStudentOfClassReq({
									req: {
										page: 1,
										limit: 3,
										keyword: '',
									},
								});
							}}
						/>
					</div>
				);
			},
			filterIcon: () => <Icon type="search" />,
		},
		{
			title: 'Email',
			dataIndex: 'accountID.email',
			key: 'email',
		},
		{
			title: 'Xử lý',
			key: 'action',
			render: row => (
				<span className="list-student-partner">
					<Tooltip title="Xóa">
						<Button
							loading={loadingRemoveStudentOfClass}
							icon="close"
							onClick={() =>
								removeStudentClassReq({
									ID: row._id,
									classID: classData._id,
									pageCurrent: pageStudentClassCurrent,
									keyword: keyword.studentClass,
									cb: res => {
										if (res.isDeleted) customMess('notification', 'success', res.msg);
									},
								})
							}
						/>
					</Tooltip>
				</span>
			),
		},
	];
	const columnListStudentPartner = [
		{
			title: 'Họ tên',
			dataIndex: 'name',
			key: 'name',
			filterDropdown: () => {
				return (
					<div style={{ padding: 8 }}>
						<Input
							ref={refInput}
							key="searchStudents"
							onChange={handleChangeInputStudents}
							name="students"
							placeholder="tìm kiếm"
							style={{ width: 188, marginBottom: 8, display: 'block', height: '30px' }}
						/>
						<Button
							type="primary"
							icon="search"
							size="small"
							style={{ width: 90, marginRight: 8 }}
							onClick={() => {
								getStudentsReq({
									req: {
										page: 1,
										limit: 3,
										keyword: keyword.students,
									},
								});
							}}
						/>
						<Button
							size="small"
							style={{ width: 90 }}
							icon="sync"
							onClick={() => {
								refInput.current.state.value = '';
								setKeyword({ ...keyword, students: '' });
								getStudentsReq({
									req: {
										page: 1,
										limit: 3,
										type: 'student',
										keyword: '',
									},
								});
							}}
						/>
					</div>
				);
			},
			filterIcon: () => <Icon type="search" />,
		},
		{
			title: 'Người đề cử',
			dataIndex: 'ownerID',
			key: 'ownerID',
			render: value => {
				if (value)
					return (
						<Popover
							title="Thông tin"
							content={
								<ul>
									<li>Email :{value.email}</li>
									<li>Địa chỉ : {value.address}</li>
									<li>SĐT :{value.phoneNumber}</li>
								</ul>
							}
						>
							<span className="pointer"> {value.name}</span>
						</Popover>
					);
				return '';
			},
		},
		{
			title: 'Xử lý',
			key: 'action',
			render: row => (
				<span className="list-student-partner">
					<Tooltip title="Thêm vào lớp">
						<Button
							icon="plus"
							style={{ color: '#1bb394' }}
							loading={loadingAddStudentToClass}
							onClick={() => {
								addStudentToClassReq({
									req: {
										classID: classData._id,
										accountID: row._id,
									},
									pageCurrent: pageStudentsCurrent,
									keyword: keyword.students,
									classID: classData._id,
									cb: res => {
										if (res.isCreated) customMess('notification', 'success', res.msg);
									},
								});
							}}
						/>
					</Tooltip>
				</span>
			),
		},
	];
	const handleChangeTableStudentClass = page => {
		setPageStudentClassCurrent({
			page: Number(page.current),
			limit: 3,
		});
		getStudentOfClassReq({
			req: {
				page: Number(page.current),
				limit: 3,
				keyword: keyword.studentClass,
			},
		});
	};
	const handleChangeTableStudents = page => {
		setPageStudentsCurrent({
			page: Number(page.current),
			limit:3,
		});
		getStudentsReq({
			req: {
				page: Number(page.current),
				limit: 3,
				keyword: keyword.students,
				type: 'student',
			},
		});
	};
	return (
		<ModalListStudent
			className="phh-modal"
			title="Danh sách học viên"
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={null}
		>
			<Collapse accordion className="phh-collapse-student" defaultActiveKey={['1']}>
				<Panel header="Học viên hiện tại" key="1">
					<ConfigProvider
						renderEmpty={() => (
							<div style={{ textAlign: 'center' }}>
								<Icon type="frown" style={{ fontSize: 20 }} />
								<h3 style={{ color: 'silver' }}>Không có dữ liệu</h3>
							</div>
						)}
					>
						<Table
							className="phh-table"
							rowKey={ele => ele._id}
							dataSource={listStudent}
							size="small"
							columns={columnList}
							scroll={{ x: true }}
							loading={{
								spinning: loadingGetStudentOfClass,
								indicator: <LoadingCustom />,
							}}
							pagination={{
								current: paginationStudentOfClass.page && Number(paginationStudentOfClass.page),
								total: paginationStudentOfClass.total,
								pageSize: paginationStudentOfClass.limit && Number(paginationStudentOfClass.limit),
								defaultCurrent: paginationStudentOfClass.page && Number(paginationStudentOfClass.page),
							}}
							onChange={handleChangeTableStudentClass}
						/>
					</ConfigProvider>
				</Panel>
				<Panel header="Học viên đề cử" key="2">
					<ConfigProvider
						renderEmpty={() => (
							<div style={{ textAlign: 'center' }}>
								<Icon type="frown" style={{ fontSize: 20 }} />
								<h3 style={{ color: 'silver' }}>Không có dữ liệu</h3>
							</div>
						)}
					>
						<Table
							className="phh-table"
							dataSource={listStudentPartner}
							rowKey={ele => ele._id}
							size="small"
							columns={columnListStudentPartner}
							scroll={{ x: true }}
							loading={{
								spinning: loadingGetStudents,
								indicator: <LoadingCustom />,
							}}
							pagination={{
								current: paginationStudents.page && Number(paginationStudents.page),
								total: paginationStudents.total,
								pageSize: paginationStudents.limit && Number(paginationStudents.limit),
								defaultCurrent: paginationStudents.page && Number(paginationStudents.page),
							}}
							onChange={handleChangeTableStudents}
						/>
					</ConfigProvider>
				</Panel>
			</Collapse>
		</ModalListStudent>
	);
}

ModalStudent.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	listStudent: PropTypes.instanceOf(Array).isRequired,
	listStudentPartner: PropTypes.instanceOf(Array).isRequired,
	getStudentOfClassReq: PropTypes.func.isRequired,
	getStudentsReq: PropTypes.func.isRequired,
	addStudentToClassReq: PropTypes.func.isRequired,
	removeStudentClassReq: PropTypes.func.isRequired,
	loadingGetStudents: PropTypes.instanceOf(PropTypes.any).isRequired,
	loadingGetStudentOfClass: PropTypes.bool.isRequired,
	paginationStudentOfClass: PropTypes.bool.isRequired,
	loadingAddStudentToClass: PropTypes.bool.isRequired,
	loadingRemoveStudentOfClass: PropTypes.bool.isRequired,
	paginationStudents: PropTypes.instanceOf(PropTypes.any).isRequired,
	classData: PropTypes.instanceOf(PropTypes.any).isRequired,
};

export default ModalStudent;
