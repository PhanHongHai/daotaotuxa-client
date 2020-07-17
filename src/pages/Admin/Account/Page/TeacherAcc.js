import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Row, Col, Input } from 'antd';
import PropTypes from 'prop-types';
// import component
import { TeacherAccount } from '../Account.styled';
import TableData from '../Component/TableData';
import ModalCreate from '../Component/ModalCreate';
// import action
import AccountAction from '../Action';
import BreadCrumb from '../../../../components/BreadCrumb';

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
];



function TeacherAcc(props) {
	const {
		listTeacher: { data, pagination },
		getStatus,
		createStatus,
		updateStatus,
		deleteStatus,
		searchStatus,
		getReq,
		createReq,
		updateReq,
		deleteReq,
		searchReq,
	} = props;

	useEffect(() => {
		getReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				type: 'teacher',
			},
		});
	}, [getReq]);

	const [visibleCreateModal, setVisibleCreateModal] = useState(false);
	const [paginationData, setPaginationData] = useState({ page: 1, limit: 10 });
	const [keyWord, setKeyWord] = useState('');
	const refSearch = useRef(null);
	const loadingGet = getStatus === 'FETCHING';
	const loadingCreate = createStatus === 'FETCHING';
	const loadingUpdate = updateStatus === 'FETCHING';
	const loadingDelete = deleteStatus === 'FETCHING';
	const loadingSearch = searchStatus === 'FETCHING';

	/**
	 * search data table
	 * @param {string} value keyword
	 */
	const handleSearch = value => {
		setKeyWord(value);
		setPaginationData({ page: 1, limit: 10 });
		searchReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
				type: 'teacher',
			},
		});
	};
	/**
	 * reload data table
	 */
	const handleReload = () => {
		setKeyWord('');
		setPaginationData({ page: 1, limit: 10 });
		refSearch.current.input.state.value = '';
		getReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				type: 'teacher',
			},
		});
	};
	return (
		<TeacherAccount>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb
							breadcrumb={breadcrumb}
							icon="none"
							visible={false}
							pageCurrentText="Quản lý tài khoản giảng viên"
						/>
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row>
					<Col span={24}>
						<Card
							className="phh-card"
							title="Danh sách giảng viên"
							extra={
								<span className="group-btn">
									<Button type="primary" icon="user-add" onClick={() => setVisibleCreateModal(true)}>
										Thêm giảng viên
									</Button>
								</span>
							}
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
									enterButton="Tìm kiếm"
									onSearch={handleSearch}
								/>
							</div>
							<TableData
								data={data}
								getUserReq={searchReq}
								updateReq={updateReq}
								deleteReq={deleteReq}
								loading={loadingGet}
								loadingSearch={loadingSearch}
								loadingUpdate={loadingUpdate}
								loadingDelete={loadingDelete}
								pagination={pagination}
								paginationData={paginationData}
								setPaginationData={setPaginationData}
								keyWord={keyWord}
								type="teacher"
							/>
						</Card>
					</Col>
				</Row>
			</div>

			<ModalCreate
				visible={visibleCreateModal}
				setVisible={setVisibleCreateModal}
				createReq={createReq}
				loadingCreate={loadingCreate}
				type="teacher"
				keyword={keyWord}
				paginationData={paginationData}
			/>
		</TeacherAccount>
	);
}

TeacherAcc.propTypes = {
	listTeacher: PropTypes.objectOf(PropTypes.any).isRequired,
	getStatus: PropTypes.string.isRequired,
	createStatus: PropTypes.string.isRequired,
	updateStatus: PropTypes.string.isRequired,
	deleteStatus: PropTypes.string.isRequired,
	searchStatus: PropTypes.string.isRequired,
	getReq: PropTypes.func.isRequired,
	createReq: PropTypes.func.isRequired,
	updateReq: PropTypes.func.isRequired,
	deleteReq: PropTypes.func.isRequired,
	searchReq: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	listTeacher: state.accountPage.listTeacher,
	getStatus: state.accountPage.getTeacherStatus,
	createStatus: state.accountPage.createTeacherStatus,
	updateStatus: state.accountPage.updateTeacherStatus,
	deleteStatus: state.accountPage.deleteTeacherStatus,
	searchStatus: state.accountPage.searchTeacherStatus,
});

const mapDispatchToProps = {
	getReq: AccountAction.getListTeacherRequest,
	createReq: AccountAction.createTeacherRequest,
	updateReq: AccountAction.updateTeacherRequest,
	deleteReq: AccountAction.deleteTeacherRequest,
	searchReq: AccountAction.searchTeacherRequest,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TeacherAcc);
