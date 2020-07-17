import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button, Input } from 'antd';


import TableSubAdmin from './Component/TableSubAdmin';
import ModalCreateSubAdmin from './Component/ModalCreateSubAdmin';
import BreadCrumb from '../../../components/BreadCrumb';

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
];

function Component(props) {
	const {
		getRuleReq,
		getSubAdminReq,
		searchSubAdminReq,
		createSunAdminReq,
		updateSubAdminReq,
		deleteSubAdminReq,
		decentralizationReq,
		getGroupRuleReq,
		getRulesStatus,
		getListSubAdminStatus,
		searchSubAdminStatus,
		createSubAdminStatus,
		updateSubAdminStatus,
		deleteSubAdminStatus,
		decentralizationStatus,
		getGroupRuleStatus,
		listSubAdmin,
		rules,
		groupRule,
	} = props;

	useEffect(() => {
		getRuleReq({
			req: {
				limit: 12,
				page: 1,
			},
		});
		getSubAdminReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				type: 'employment',
			},
		});
	}, [getRuleReq, getSubAdminReq,]);

	const [keyWordSubAdmin, setKeyWordSubAdmin] = useState('');
	const [pageSubAdminData, setPageSubAdminData] = useState({ limit: 10, page: 1 });
	const [visibleCreateAdmin, setVisibleCreateAdmin] = useState(false);
	const refSearchSubAdmin = useRef(null);


	const loadingGetSubAdmin = getListSubAdminStatus === 'FETCHING';
	const loadingSearchSubAdmin = searchSubAdminStatus === 'FETCHING';
	const loadingCreateRuleSubAdmin = createSubAdminStatus === 'FETCHING';
	const loadingUpdateSubAdmin = updateSubAdminStatus === 'FETCHING';
	const loadingDeleteSubAdmin = deleteSubAdminStatus === 'FETCHING';
	const loadingGetGroupRule = getGroupRuleStatus === 'FETCHING';
	const loadingDecentralization = decentralizationStatus === 'FETCHING';
	const loadingGetRules = getRulesStatus === 'FETCHING';


	/**
	 * search data table sub admin
	 * @param {string} value keyword
	 */
	const handleSearchSubAdmin = value => {
		setKeyWordSubAdmin(value);
		setPageSubAdminData({
			limit: 10,
			page: 1,
		});
		searchSubAdminReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
				type: 'employment',
			},
		});
	};
	const handleReloadSubAdmin = () => {
		setKeyWordSubAdmin('');
		refSearchSubAdmin.current.input.state.value = '';
		getSubAdminReq({ req: { limit: 10, page: 1, keyword: '', type: 'employment' } });
	};

	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="none" visible={false} pageCurrentText="Thiết Lập" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24} className="mb-15">
						<Card
							className="phh-card"
							title="Quản lý nhân viên"
							extra={
								<span className="group-btn">
									<Button type="primary" icon="user-add" onClick={() => setVisibleCreateAdmin(true)}>
										Thêm nhân viên
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
											onClick={handleReloadSubAdmin}
										>
											Làm mới
										</Button>
									}
									placeholder="Nhập từ khóa.."
									enterButton="Tìm kiếm"
									ref={refSearchSubAdmin}
									onSearch={handleSearchSubAdmin}
								/>
							</div>
							<TableSubAdmin
								data={listSubAdmin.data}
								keyword={keyWordSubAdmin}
								pageSubAdminData={pageSubAdminData}
								setKeyWordSubAdmin={setKeyWordSubAdmin}
								pagination={listSubAdmin.pagination}
								updateReq={updateSubAdminReq}
								deleteReq={deleteSubAdminReq}
								searchReq={searchSubAdminReq}
								loadingGet={loadingGetSubAdmin}
								loadingSearch={loadingSearchSubAdmin}
								loadingUpdate={loadingUpdateSubAdmin}
								loadingDelete={loadingDeleteSubAdmin}
								loadingGetGroupRule={loadingGetGroupRule}
								loadingDecentralization={loadingDecentralization}
								loadingGetRules={loadingGetRules}
								rules={rules}
								decentralizationReq={decentralizationReq}
								getGroupRuleReq={getGroupRuleReq}
								groupRule={groupRule}
							/>
						</Card>
					</Col>
				
				</Row>
			</div>
			<ModalCreateSubAdmin
				createReq={createSunAdminReq}
				loadingCreate={loadingCreateRuleSubAdmin}
				visible={visibleCreateAdmin}
				setVisible={setVisibleCreateAdmin}
				pageSubAdminData={pageSubAdminData}
				keyword={keyWordSubAdmin}
			/>
		</div>
	);
}

Component.propTypes = {
	getRuleReq: PropTypes.func.isRequired,
	getSubAdminReq: PropTypes.func.isRequired,
	searchSubAdminReq: PropTypes.func.isRequired,
	createSunAdminReq: PropTypes.func.isRequired,
	updateSubAdminReq: PropTypes.func.isRequired,
	deleteSubAdminReq: PropTypes.func.isRequired,
	getGroupRuleReq: PropTypes.func.isRequired,
	decentralizationReq: PropTypes.func.isRequired,
	getGroupRuleStatus: PropTypes.string.isRequired,
	getListSubAdminStatus: PropTypes.string.isRequired,
	searchSubAdminStatus: PropTypes.string.isRequired,
	createSubAdminStatus: PropTypes.string.isRequired,
	updateSubAdminStatus: PropTypes.string.isRequired,
	deleteSubAdminStatus: PropTypes.string.isRequired,
	getRulesStatus: PropTypes.string.isRequired,
	decentralizationStatus: PropTypes.string.isRequired,
	listSubAdmin: PropTypes.objectOf(PropTypes.any).isRequired,
	rules: PropTypes.instanceOf(Array).isRequired,
	groupRule: PropTypes.instanceOf(Array).isRequired,
};

export default Component;
