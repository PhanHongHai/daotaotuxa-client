import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Row, Col, Input, Tabs, Modal } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import component
import { StundentAccount } from '../Account.styled';
import TableData from '../Component/TableData';
import TableApproveStudent from '../Component/TableApproveStudent';
// import action
import AccountAction from '../Action';
import BreadCrumb from '../../../../components/BreadCrumb';
import customMessage from '../../../../utils/customMessage';

const { TabPane } = Tabs;
const { confirm } = Modal;

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
];

function StudentAcc(props) {
	const {
		listStudent: { pagination, data },
		listStudentNotApprove,
		getStatus,
		updateStatus,
		deleteStatus,
		searchStatus,
		approveStudentStatus,
		getAccountNotApproveStatus,
		approveReq,
		getReq,
		updateReq,
		deleteReq,
		searchReq,
		getAccountNotApprove,
	} = props;

	useEffect(() => {
		getReq({
			req: {
				limit: 10,
				page: 1,
				type: 'student',
				keyword: '',
			},
		});
		getAccountNotApprove({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				type: 'student',
			},
		});
	}, [getReq, getAccountNotApprove]);

	const history = useHistory();

	const [keyWord, setKeyWord] = useState('');
	const [keywordApprove, setKeywordApprove] = useState('');
	const [paginationData, setPaginationData] = useState({ page: 1, limit: 10 });
	const [pageCurrent, setpageCurrent] = useState({ page: 1, limit: 10 });
	const refSearch = useRef(null);
	const loadingGet = getStatus === 'FETCHING';
	const loadingUpdate = updateStatus === 'FETCHING';
	const loadingDelete = deleteStatus === 'FETCHING';
	const loadingSearch = searchStatus === 'FETCHING';
	const loadingApprove = approveStudentStatus === 'FETCHING';
	const loadingGetStudentApprove = getAccountNotApproveStatus === 'FETCHING';
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
				type: 'student',
			},
		});
	};
	const handleSearchStudentNotApprove = value => {
		setKeywordApprove(value);
		setpageCurrent({ page: 1, limit: 10 });
		getAccountNotApprove({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
				type: 'student',
			},
		});
	};
	/**
	 * reload data table student
	 */
	const handleReload = () => {
		setKeyWord('');
		setPaginationData({ page: 1, limit: 10 });
		refSearch.current.input.state.value = '';
		getReq({
			req: {
				limit: 10,
				page: 1,
				type: 'student',
				keyword: '',
			},
		});
	};
	/**
	 * reload data table student not approve
	 */
	const handleReloadStudentNotApprove = () => {
		setKeywordApprove('');
		setpageCurrent({ page: 1, limit: 10 });
		refSearch.current.input.state.value = '';
		getAccountNotApprove({
			req: {
				limit: 10,
				page: 1,
				type: 'student',
				keyword: '',
			},
		});
	};
	const handleApprove = row => {
		confirm({
			title: `Xác nhận duyệt tài khoản học viên ${row.name} ?`,
			onOk() {
				approveReq({
					req: {
						isApproved: true,
					},
					pageCurrent,
					keyword: keywordApprove,
					ID: row._id,
					cb: res => {
						if (res && res.isApproved) customMessage('notification', 'success', res.msg);
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};
	const handleChangePage = page => {
		getAccountNotApprove({
			req: {
				limit: 10,
				page: Number(page.current),
				keyword: keywordApprove,
				type: 'student',
			},
		});
	};
	return (
		<StundentAccount>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb
							breadcrumb={breadcrumb}
							icon="none"
							visible={false}
							pageCurrentText="Quản lý tài khoản học viên"
						/>
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row>
					<Col span={24}>
						<Tabs type="card tab-custom">
							<TabPane tab={<span>Danh sách tài khoản học viên</span>} key="1">
								<Card className="phh-card">
									<div className="phh-group-search mb-10 mt-10 flex" style={{ alignItems: 'center' }}>
										<Input.Search
											addonBefore={
												<Button
													className="btn-reload"
													style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
													icon="sync"
													onClick={() => handleReload()}
												>
													Làm mới
												</Button>
											}
											ref={refSearch}
											placeholder="Nhập từ khóa.."
											enterButton
											onSearch={handleSearch}
										/>
										<span className="group-btn">
											<Button
												icon="user-add"
												style={{ height: '40px' }}
												onClick={() => history.push('/admin/tai-khoan/hoc-vien/them')}
											/>
										</span>
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
										keyWord={keyWord}
										type="student"
										setPaginationData={setPaginationData}
										paginationData={paginationData}
									/>
								</Card>
							</TabPane>
							<TabPane tab={<span>Danh sách tài khoản học viên được đề cử</span>} key="2">
								<Card className="phh-card">
									<div className="phh-group-search mb-10 mt-10">
										<Input.Search
											addonBefore={
												<Button
													className="btn-reload"
													style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
													icon="sync"
													onClick={() => handleReloadStudentNotApprove()}
												>
													Làm mới
												</Button>
											}
											ref={refSearch}
											placeholder="Nhập từ khóa.."
											enterButton
											onSearch={handleSearchStudentNotApprove}
										/>
									</div>
									<TableApproveStudent
										data={listStudentNotApprove && listStudentNotApprove.data}
										pagination={listStudentNotApprove && listStudentNotApprove.pagination}
										loadingApprove={loadingApprove}
										loading={loadingGetStudentApprove}
										handleApprove={handleApprove}
										onTableChange={handleChangePage}
									/>
								</Card>
							</TabPane>
						</Tabs>
					</Col>
				</Row>
			</div>
		</StundentAccount>
	);
}

const mapStateToProps = state => ({
	listStudent: state.accountPage.listStudent,
	getStatus: state.accountPage.getStudentStatus,
	createStatus: state.accountPage.createStudentStatus,
	updateStatus: state.accountPage.updateStudentStatus,
	deleteStatus: state.accountPage.deleteStudentStatus,
	searchStatus: state.accountPage.searchStudentStatus,
	createProfiletStatus: state.accountPage.createProfileStudentStatus,
	updateProfileStatus: state.accountPage.updateProfileStudentStatus,
	getAccountNotApproveStatus: state.accountPage.getAccountNotApproveStatus,
	approveStudentStatus: state.accountPage.approveStudentStatus,
	listStudentNotApprove: state.accountPage.listStudentNotApprove,
});

const mapDispatchToProps = {
	getReq: AccountAction.getListStudentRequest,
	createReq: AccountAction.createStudentRequest,
	updateReq: AccountAction.updateStudentRequest,
	approveReq: AccountAction.approveStudentRequest,
	deleteReq: AccountAction.deleteStudentRequest,
	searchReq: AccountAction.searchStudentRequest,
	getAccountNotApprove: AccountAction.getAccountNotApproveRequest,
};

StudentAcc.propTypes = {
	listStudent: PropTypes.objectOf(PropTypes.any).isRequired,
	listStudentNotApprove: PropTypes.objectOf(PropTypes.any).isRequired,
	getStatus: PropTypes.string.isRequired,
	updateStatus: PropTypes.string.isRequired,
	deleteStatus: PropTypes.string.isRequired,
	getAccountNotApproveStatus: PropTypes.string.isRequired,
	searchStatus: PropTypes.string.isRequired,
	approveStudentStatus: PropTypes.string.isRequired,
	getReq: PropTypes.func.isRequired,
	updateReq: PropTypes.func.isRequired,
	approveReq: PropTypes.func.isRequired,
	deleteReq: PropTypes.func.isRequired,
	searchReq: PropTypes.func.isRequired,
	getAccountNotApprove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentAcc);
