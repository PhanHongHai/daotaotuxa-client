import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Card, DatePicker, Radio, ConfigProvider, Typography, Spin } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import numeral from 'numeral';
import viVN from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';

// ultil
import countries from '../../../../utils/country.json';

import LoadingCustom from  '../../../../components/LoadingCustom';
import AccountAction from '../Action';
import BreadCrumb from '../../../../components/BreadCrumb';
import SummaryBox from '../../../../components/SummaryBox';
import ChartLineAccount from '../Component/ChartLineAccount';
import ChartPieUserSex from '../Component/ChartPieUserSex';
import ChartPieUserArea from '../Component/ChartPieUserArea';
import ChartDoughnutAccount from '../Component/ChartDoughnutAccount';

moment.locale('vi');

const disabledDate = current => {
	// Can not select days before today and today
	return current && current >= moment().endOf('day');
};

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
];

const tabList = [
	{
		key: 'student',
		tab: 'Học Viên',
	},
	{
		key: 'partner',
		tab: 'Đối Tác',
	},
];

const { RangePicker } = DatePicker;

const generateDataChartAccount = (data, groupType, funcSave) => {
	funcSave({
		labels: _.map(data, item => moment(item.date).format(groupType === 'hour' ? 'HH a' : 'DD-MM-YYYY')),
		totalStudent: _.map(data, item => numeral(item.totalAccountStudent).format('0,0.0[0]')),
		totalPartner: _.map(data, item => numeral(item.totalAccountPartner).format('0,0.0[0]')),
	});
};

const generateDataChartUserArea = (data, funcSave) => {
	funcSave({
		labels: _.map(data, item => countries.find(ele => ele.key === item.area).name),
		total: _.map(data, item => item.totalUser),
	});
};

function AnalyAccount(props) {
	const {
		getTotals30daysStatus,
		getReportAccountByGroupTypeStatus,
		getTotalsAllTimeStatus,
		getReportUserSexStatus,
		getReportUserAreaStatus,
		reportSex,
		totals30days,
		totalsAllTime,
		getTotals30daysReq,
		getReportAccountByGroupTypeReq,
		getTotalsAllTimeReq,
		getReportUserAreaReq,
		getReportUserSexReq,
	} = props;

	const [dataChartLine, setDataChartLine] = useState({ labels: [], totalStudent: [], totalPartner: [] });
	const [dataChartUserArea, setDataChartUserArea] = useState({ labels: [], total: [] });
	const [tabPieKey, setTabPieKey] = useState('student');
	const [tabDoughnutKey, setTabDoughnutKey] = useState('student');
	const [typeTabPie, setTypeTabPie] = useState('sex');

	useEffect(() => {
		getTotalsAllTimeReq({});
		getTotals30daysReq({
			req: {
				from: moment()
					.subtract(30, 'days')
					.toISOString(),
				to: moment().toISOString(),
				groupType: 'date',
			},
		});
		getReportAccountByGroupTypeReq({
			req: {
				from: moment()
					.subtract(24, 'hours')
					.toISOString(),
				to: moment().toISOString(),
				groupType: 'hour',
			},
			cb: res => {
				if (res && res.data) generateDataChartAccount(res.data, 'hour', setDataChartLine);
			},
		});
		getReportUserSexReq({
			req: {
				type: 'student',
			},
		});
	}, []);

	const loadingGetReportAccountByGroupDate = getReportAccountByGroupTypeStatus === 'FETCHING';
	const loadingGetTotalsAllTime = getTotalsAllTimeStatus === 'FETCHING';
	const loadingGetTotals30days = getTotals30daysStatus === 'FETCHING';
	const loadingGetUserSex = getReportUserSexStatus === 'FETCHING';
	const loadingGetUserArea = getReportUserAreaStatus === 'FETCHING';

	const handleChangeTypeChartPie = e => {
		const { value } = e.target;
		setTypeTabPie(value);
		if (value === 'sex')
			getReportUserSexReq({
				req: {
					type: tabPieKey,
				},
			});
		else
			getReportUserAreaReq({
				req: {
					type: tabPieKey,
				},
				cb: res => {
					if (res && res.data) generateDataChartUserArea(res.data, setDataChartUserArea);
				},
			});
	};
	const handleChangeTabChartPie = key => {
		setTabPieKey(key);
		setTypeTabPie('sex');
		getReportUserSexReq({
			req: {
				type: key,
			},
		});
	};
	const contentList = {
		student: (
			<React.Fragment>
				<div className="chart-extra mt-10">
					<Row>
						<Col xs={24} sm={12} md={14}>
							<h3>Biểu đồ thống kê học viên</h3>
						</Col>
						<Col xs={24} sm={12} md={10}>
							<span className="btn-chart">
								<Radio.Group defaultValue={typeTabPie} onChange={handleChangeTypeChartPie} buttonStyle="solid">
									<Radio.Button value="sex">Giới Tính</Radio.Button>
									<Radio.Button value="area">Khu Vực</Radio.Button>
								</Radio.Group>
							</span>
						</Col>
					</Row>
				</div>
				{typeTabPie && typeTabPie === 'sex' ? (
					<ChartPieUserSex data={reportSex && [reportSex.totalMale, reportSex.totalFeMale]} />
				) : (
					<ChartPieUserArea dataChart={dataChartUserArea} />
				)}
			</React.Fragment>
		),
		partner: (
			<React.Fragment>
				<div className="chart-extra mt-10">
					<Row>
						<Col xs={24} sm={12} md={14}>
							<h3>Biểu đồ thống kê đối tác</h3>
						</Col>
						<Col xs={24} sm={12} md={10}>
							<span className="btn-chart">
								<Radio.Group defaultValue={typeTabPie} onChange={handleChangeTypeChartPie} buttonStyle="solid">
									<Radio.Button value="sex">Giới Tính</Radio.Button>
									<Radio.Button value="area">Khu Vực</Radio.Button>
								</Radio.Group>
							</span>
						</Col>
					</Row>
				</div>
				{typeTabPie && typeTabPie === 'sex' ? (
					<ChartPieUserSex data={reportSex && [reportSex.totalMale, reportSex.totalFeMale]} />
				) : (
					<ChartPieUserArea dataChart={dataChartUserArea} />
				)}
			</React.Fragment>
		),
	};
	const contenDoughnutList = {
		student: (
			<React.Fragment>
				<div className="chart-extra mt-10">
					<Row>
						<Col xs={24} sm={24} md={24}>
							<h3>Biểu đồ thống kê theo tài khoản học viên</h3>
						</Col>
					</Row>
				</div>
				<ChartDoughnutAccount
					data={totalsAllTime && [totalsAllTime.totalStudent, totalsAllTime.totalStudentNotActive]}
				/>
			</React.Fragment>
		),
		partner: (
			<React.Fragment>
				<div className="chart-extra mt-10">
					<Row>
						<Col xs={24} sm={12} md={14}>
							<h3>Biểu đồ thống kê theo tài khoản đối tác</h3>
						</Col>
					</Row>
				</div>
				<ChartDoughnutAccount
					data={totalsAllTime && [totalsAllTime.totalPartner, totalsAllTime.totalPartnerNotActive]}
				/>
			</React.Fragment>
		),
	};
	const handleChoseDay = date => {
		if (date.length > 1)
			getReportAccountByGroupTypeReq({
				req: {
					from: moment(date[0]).toISOString(),
					to: moment(date[1]).toISOString(),
					groupType: 'date',
				},
				cb: res => {
					if (res && res.data) {
						generateDataChartAccount(res.data, 'date', setDataChartLine);
					}
				},
			});
	};
	const handleChangeDate = e => {
		const { value } = e.target;
		switch (value) {
			case 'hour':
				getReportAccountByGroupTypeReq({
					req: {
						from: moment()
							.subtract(24, 'hours')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'hour',
					},
					cb: res => {
						if (res && res.data) generateDataChartAccount(res.data, 'hour', setDataChartLine);
					},
				});
				break;

			case '7days':
				getReportAccountByGroupTypeReq({
					req: {
						from: moment()
							.subtract(6, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) generateDataChartAccount(res.data, 'date', setDataChartLine);
					},
				});
				break;
			default:
				getReportAccountByGroupTypeReq({
					req: {
						from: moment()
							.subtract(30, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) generateDataChartAccount(res.data, 'date', setDataChartLine);
					},
				});
				break;
		}
	};
	return (
		<div id="analy-account">
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} pageCurrentText="Thống kê tài khoản" icon="user" visible={false} />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row>
					<Typography.Title level={4} className="">
						Thống kê toàn thời gian
					</Typography.Title>
					<Col span={24} className="">
						<Row gutter={16}>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									value={totalsAllTime && totalsAllTime.totalStudent}
									loading={loadingGetTotalsAllTime}
									title="Học Viên"
									type=""
									icon="user"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									value={totalsAllTime && totalsAllTime.totalPartner}
									loading={loadingGetTotalsAllTime}
									title="Đối Tác"
									type=""
									icon="team"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									value={totalsAllTime && totalsAllTime.totalTeacher}
									loading={loadingGetTotalsAllTime}
									title="Giảng Viên"
									type=""
									icon="user"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									value={totalsAllTime && totalsAllTime.totalEmployment}
									loading={loadingGetTotalsAllTime}
									title="Nhân Viên"
									type=""
									icon="user"
								/>
							</Col>
						</Row>
					</Col>
					<Typography.Title level={4} className="">
						Thống kê theo 30 ngày gần nhất
					</Typography.Title>
					<Col span={24} className="mb-15">
						<Row gutter={16}>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									value={totals30days && totals30days.totalStudent}
									loading={loadingGetTotals30days}
									title="Học Viên"
									type=""
									icon="user"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									value={totals30days && totals30days.totalPartner}
									loading={loadingGetTotals30days}
									title="Đối Tác"
									type=""
									icon="team"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									value={totals30days && totals30days.totalTeacher}
									loading={loadingGetTotals30days}
									title="Giảng Viên"
									type=""
									icon="user"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									value={totals30days && totals30days.totalEmployment}
									loading={loadingGetTotals30days}
									title="Nhân Viên"
									type=""
									icon="user"
								/>
							</Col>
						</Row>
					</Col>
					<Col xs={24} sm={24} md={24} className="mb-10">
						<Row gutter={16}>
							<Col xs={24} sm={12} md={24} className="mb-15">
								<Card title="Biểu đồ" className="card-action" loading={loadingGetReportAccountByGroupDate}>
									<div className="chart-extra">
										<Row>
											<Col xs={24} sm={12} md={10}>
												<h3>Thống kê lượng tài khoản được tạo</h3>
											</Col>
											<Col xs={24} sm={12} md={14}>
												<ConfigProvider locale={viVN}>
													<RangePicker
														disabledDate={disabledDate}
														onChange={handleChoseDay}
														format="DD-MM-YYYY"
														size="default"
													/>
												</ConfigProvider>
												<span className="btn-chart">
													<Radio.Group onChange={handleChangeDate} defaultValue="hour" buttonStyle="solid">
														<Radio.Button value="hour">24 giờ</Radio.Button>
														<Radio.Button value="7days">7 ngày</Radio.Button>
														<Radio.Button value="30days">30 ngày</Radio.Button>
													</Radio.Group>
												</span>
											</Col>
										</Row>
									</div>
									<ChartLineAccount data={dataChartLine} />
								</Card>
							</Col>
							<Col xs={24} sm={12} md={12} className="mb-15">
								<Card
									className="card-action"
									loading={loadingGetTotals30days}
									tabList={tabList}
									onTabChange={key => setTabDoughnutKey(key)}
								>
									{contenDoughnutList[tabDoughnutKey]}
								</Card>
							</Col>
							<Col xs={24} sm={12} md={12} className="mb-15">
								<Card
									className="card-action"
									tabList={tabList}
									onTabChange={handleChangeTabChartPie}
								>
									<Spin spinning={loadingGetUserSex || loadingGetUserArea} indicator={<LoadingCustom margin={50} />}>

									
									{contentList[tabPieKey]}
									</Spin>
								</Card>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
}

AnalyAccount.propTypes = {
	getTotals30daysStatus: PropTypes.string.isRequired,
	getReportAccountByGroupTypeStatus: PropTypes.string.isRequired,
	getTotalsAllTimeStatus: PropTypes.string.isRequired,
	getReportUserSexStatus: PropTypes.string.isRequired,
	getReportUserAreaStatus: PropTypes.string.isRequired,
	totals30days: PropTypes.objectOf(PropTypes.object).isRequired,
	totalsAllTime: PropTypes.objectOf(PropTypes.object).isRequired,
	reportSex: PropTypes.objectOf(PropTypes.object).isRequired,
	getTotals30daysReq: PropTypes.func.isRequired,
	getTotalsAllTimeReq: PropTypes.func.isRequired,
	getReportAccountByGroupTypeReq: PropTypes.func.isRequired,
	getReportUserAreaReq: PropTypes.func.isRequired,
	getReportUserSexReq: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	getTotals30daysStatus: state.accountPage.getTotals30daysStatus,
	getTotalsAllTimeStatus: state.accountPage.getTotalsAllTimeStatus,
	getReportUserSexStatus: state.accountPage.getReportUserSexStatus,
	getReportUserAreaStatus: state.accountPage.getReportUserAreaStatus,
	getReportAccountByGroupTypeStatus: state.accountPage.getReportAccountByGroupTypeStatus,
	totalsAllTime: state.accountPage.totalsAllTime,
	totals30days: state.accountPage.totals30days,
	reportSex: state.accountPage.reportSex,
});

const mapDispatchToProps = {
	getTotalsAllTimeReq: AccountAction.getTotalsAllTimeRequest,
	getTotals30daysReq: AccountAction.getTotals30daysRequest,
	getReportAccountByGroupTypeReq: AccountAction.getReportAccountByGroupTypeRequest,
	getReportUserAreaReq: AccountAction.getReportUserAreaRequest,
	getReportUserSexReq: AccountAction.getReportSexRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyAccount);
