import React, { useEffect, useState } from 'react';
import { Row, Col, Radio, Card, DatePicker, ConfigProvider, Icon, Divider } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import _ from 'lodash';
import viVN from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';

import SummaryBox from '../../../components/SummaryBox';
import BreadCrumb from '../../../components/BreadCrumb';
import ChartAccount from './Component/ChartAccount';
import ChartPieNoActive from './Component/ChartPieNonActive';

import { CardAccountNotApproveStyle } from './styled';

moment.locale('vi');

const { RangePicker } = DatePicker;

const disabledDate = current => {
	// Can not select days before today and today
	return current && current >= moment().endOf('day');
};
const generateDataChartAccount = (data, groupType, funcSave) => {
	funcSave({
		labels: _.map(data, item => moment(item.date).format(groupType === 'hour' ? 'HH a' : 'DD-MM-YYYY')),
		totalStudent: _.map(data, item => numeral(item.totalAccountStudent).format('0,0.0[0]')),
		totalPartner: _.map(data, item => numeral(item.totalAccountPartner).format('0,0.0[0]')),
	});
};

function DashboardAdmin(props) {
	const { getTotalsReq, getReportsAccountReq, getTotalsReportStatus, getReportsAccountStatus, totalsReport } = props;
	const [dataChart, setDataChart] = useState({ labels: [], totalStudent: [], totalPartner: [] });

	useEffect(() => {
		getTotalsReq({});
		getReportsAccountReq({
			req: {
				from: moment()
					.subtract(24, 'hours')
					.toISOString(),
				to: moment().toISOString(),
				groupType: 'hour',
			},
			cb: res => {
				if (res && res.data) generateDataChartAccount(res.data, 'hour', setDataChart);
			},
		});
	}, []);

	const loadingGetTotals = getTotalsReportStatus === 'FECTHING';
	const loadingGetReportsAccount = getReportsAccountStatus === 'FECTHING';

	const handleChangeDate = e => {
		const { value } = e.target;
		switch (value) {
			case 'hour':
				getReportsAccountReq({
					req: {
						from: moment()
							.subtract(24, 'hours')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'hour',
					},
					cb: res => {
						if (res && res.data) generateDataChartAccount(res.data, 'hour', setDataChart);
					},
				});
				break;

			case '7days':
				getReportsAccountReq({
					req: {
						from: moment()
							.subtract(6, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) generateDataChartAccount(res.data, 'date', setDataChart);
					},
				});
				break;

			default:
				getReportsAccountReq({
					req: {
						from: moment()
							.subtract(30, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) generateDataChartAccount(res.data, 'date', setDataChart);
					},
				});
				break;
		}
	};
	const handleChoseDay = date => {
		if (date.length > 1)
			getReportsAccountReq({
				req: {
					from: moment(date[0]).toISOString(),
					to: moment(date[1]).toISOString(),
					groupType: 'date',
				},
				cb: res => {
					if (res && res.data) {
						generateDataChartAccount(res.data, 'date', setDataChart);
					}
				},
			});
	};
	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={[]} pageCurrentText="Dashboard" icon="home" visible />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row gutter={16}>
					<Col span={24} className="mb-5">
						<Row gutter={16}>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotals}
									value={totalsReport && totalsReport.totalStudent}
									title="Học Viên"
									type=""
									icon="user"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotals}
									value={totalsReport && totalsReport.totalPartner}
									title="Đối Tác"
									type=""
									icon="team"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotals}
									value={totalsReport && totalsReport.totalTeacher}
									title="Giảng Viên"
									type=""
									icon="user"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotals}
									value={totalsReport && totalsReport.totalEmployment}
									title="Nhân Viên"
									type=""
									icon="user"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotals}
									value={totalsReport && totalsReport.totalSector}
									title="Ngành Đào Tạo"
									type=""
									icon="book"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotals}
									value={totalsReport && totalsReport.totalSubject}
									title="Môn Học"
									type=""
									icon="folder-open"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotals}
									value={totalsReport && totalsReport.totalClass}
									title="Lớp Học"
									type=""
									icon="home"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotals}
									value={totalsReport && totalsReport.totalLesson}
									title="Bài học"
									type=""
									icon="file-pdf"
								/>
							</Col>
						</Row>
					</Col>
					<Col xs={24} md={14} className="mb-10">
						<Card className="phh-card card-no-pd">
							<CardAccountNotApproveStyle>
								<div className="content">
									<h3>Học viện chưa duyệt</h3>
									{loadingGetTotals ? (
										<Icon type="loading" />
									) : (
										<h1> {totalsReport && totalsReport.totalStudentNotApprove} </h1>
									)}
									<p>
										<Icon type="question-circle" theme="filled" />
										&ensp;Số tài khoản học viên được tạo từ đối tác chưa được kiểm duyệt
									</p>
									<Divider />
									<h3>Học viên được được đề cử</h3>
									{loadingGetTotals ? (
										<Icon type="loading" />
									) : (
										<h1> {totalsReport && totalsReport.totalStudentCreateByPartner} </h1>
									)}
									<p>
										<Icon type="question-circle" theme="filled" />
										&ensp;Số tài khoản học viên được tạo từ đối tác
									</p>
								</div>
								<div className="footer">
									<Link to="/admin/tai-khoan/hoc-vien">Xem chi tiết</Link>
								</div>
							</CardAccountNotApproveStyle>
						</Card>
					</Col>
					<Col xs={24} md={10} className="mb-10">
						<Card className="phh-card" title="Thống kê tài khoản chưa được kích hoạt" loading={loadingGetTotals}>
							<ChartPieNoActive
								valueChart={totalsReport && [totalsReport.totalStudentNotActive, totalsReport.totalPartnerNotActive]}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={24} md={24}>
						<Card title="Biểu Đồ" className="card-action" loading={loadingGetReportsAccount}>
							<div className="chart-extra">
								<Row>
									<Col xs={24} sm={12} md={10}>
										<h3>Thống kê lượng tài khoản được tạo</h3>
									</Col>
									<Col xs={24} sm={12} md={14}>
										<ConfigProvider locale={viVN}>
											<RangePicker
												disabledDate={disabledDate}
												format="DD-MM-YYYY"
												size="default"
												onChange={handleChoseDay}
											/>
										</ConfigProvider>
										<span className="btn-chart">
											<Radio.Group defaultValue="hour" buttonStyle="solid" onChange={handleChangeDate}>
												<Radio.Button value="hour">24 giờ</Radio.Button>
												<Radio.Button value="7days">7 ngày</Radio.Button>
												<Radio.Button value="30days">30 ngày</Radio.Button>
											</Radio.Group>
										</span>
									</Col>
								</Row>
							</div>
							<ChartAccount data={dataChart} />
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
}

DashboardAdmin.propTypes = {
	getTotalsReq: PropTypes.func.isRequired,
	getReportsAccountReq: PropTypes.func.isRequired,
	getTotalsReportStatus: PropTypes.string.isRequired,
	getReportsAccountStatus: PropTypes.string.isRequired,
	totalsReport: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DashboardAdmin;
