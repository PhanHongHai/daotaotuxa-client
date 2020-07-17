import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Radio, DatePicker, ConfigProvider, Typography, Select } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import viVN from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';

// action
import ClassAction from '../Action';
// components
import BreadCrumb from '../../../../components/BreadCrumb';
import SummaryBox from '../../../../components/SummaryBox';
import ChartPieTypeClass from '../Component/ChartPieTypeClass';
import ChartBarClass from '../Component/ChartBarClass';
// other
import { trainingType } from '../../../../constands/Other';
import { SelectYearStyle } from '../styled';

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
	{
		icon: 'audit',
		path: '/admin/lop-hoc',
		text: 'Quản lý lớp học',
	},
];
const { RangePicker } = DatePicker;

const tabList = [
	{
		key: 'type',
		tab: 'Hệ đào tạo',
	},
	{
		key: 'sector',
		tab: 'Ngành đào tạo',
	},
];

const generateDataChartPieTypeClass = (data, funcSave) => {
	funcSave({
		labels: _.map(data, item => trainingType.find(ele => ele.key === item.key).value),
		total: _.map(data, item => item.total),
	});
};
const generateDataChartPieSector = (data, funcSave) => {
	funcSave({
		labels: _.map(data, item => item.key),
		total: _.map(data, item => item.total),
	});
};
const generateDataChartTotalClassByYear = (data, funcSave) => {
	if (!_.isEmpty(data))
		funcSave([
			data.january,
			data.febraury,
			data.march,
			data.april,
			data.may,
			data.june,
			data.july,
			data.august,
			data.september,
			data.october,
			data.november,
			data.december,
		]);
};

const renderOptionYear = () => {
	const year = moment().year();
	const options = [];
	for (let i = year - 10; i < year + 10; i += 1) {
		options.push(
			<Select.Option key={i} value={i} className="year-item">
				{i}
			</Select.Option>,
		);
	}
	return options;
};

function AnalyClass(props) {
	const {
		getTotalClassAllTimeStatus,
		getTotalClass30dayStatus,
		getReportClassByTrainingTypeStatus,
		getReportClassByTrainingSectorStatus,
		getReportTotalStudentByTrainingTypeStatus,
		getReportTotalStudentByTrainingSectorStatus,
		getReportTotalClassByYearStatus,
		totalAlltime,
		total30day,
		getTotalAllTimeReq,
		getTotalByGroupDateReq,
		getReportClassByTrainingTypeReq,
		getReportClassByTrainingSectorReq,
		getReportTotalStudentByTrainingTypeReq,
		getReportTotalStudentByTrainingSectorReq,
		getReportTotalClassByYearReq,
	} = props;
	const [tabKeyByClass, setTabKeyByClass] = useState('type');
	const [tabKeyByStudent, setTabKeyByStudent] = useState('type');
	const [dataChartPieTypeClass, setDataChartPieTypeClass] = useState({ labels: [], total: [] });
	const [dataChartPieSectorClass, setDataChartPieSectorClass] = useState({ labels: [], total: [] });
	const [dataChartPieTotalStudentType, setDataChartPieTotalStudentType] = useState({ labels: [], total: [] });
	const [dataChartPieTotalStudentSector, setDataChartPieTotalStudentSector] = useState({
		labels: [],
		total: [],
	});
	const [dataChartTotalClassByYear, setDataChartTotalClassByYear] = useState([]);
	const [defaultOptionReport, setDefaultOptionReport] = useState({
		classByType: 'hour',
		classBySector: 'hour',
		studentByType: 'hour',
		studentBySector: 'hour',
	});
	useEffect(() => {
		getTotalAllTimeReq({});
		getTotalByGroupDateReq({
			req: {
				from: moment()
					.subtract(30, 'days')
					.toISOString(),
				to: moment().toISOString(),
				groupType: 'date',
			},
		});
		getReportClassByTrainingTypeReq({
			req: {
				from: moment()
					.subtract(24, 'hours')
					.toISOString(),
				to: moment().toISOString(),
				groupType: 'hour',
			},
			cb: res => {
				if (res && res.data) {
					generateDataChartPieTypeClass(res.data, setDataChartPieTypeClass);
				}
			},
		});
		getReportTotalStudentByTrainingTypeReq({
			req: {
				from: moment()
					.subtract(24, 'hours')
					.toISOString(),
				to: moment().toISOString(),
				groupType: 'hour',
			},
			cb: res => {
				if (res && res.data) {
					generateDataChartPieTypeClass(res.data, setDataChartPieTotalStudentType);
				}
			},
		});

		getReportTotalClassByYearReq({
			req: {
				year: moment().year(),
			},
			cb: res => {
				if (res && res.data) generateDataChartTotalClassByYear(res.data, setDataChartTotalClassByYear);
			},
		});
	}, []);

	const loadingGetTotalAllTime = getTotalClassAllTimeStatus === 'FETCHING';
	const loadingGetTotalByGroupDate = getTotalClass30dayStatus === 'FETCHING';
	const loadingGetReportClassByTrainingType = getReportClassByTrainingTypeStatus === 'FETCHING';
	const loadingGetReportClassByTrainingSector = getReportClassByTrainingSectorStatus === 'FETCHING';
	const loadingGetReportStudentByTrainingType = getReportTotalStudentByTrainingTypeStatus === 'FETCHING';
	const loadingGetReportStudentByTrainingSector = getReportTotalStudentByTrainingSectorStatus === 'FETCHING';
	const loadingGetReportTotalClassByYear = getReportTotalClassByYearStatus === 'FETCHING';

	const handleChangeOptionTrainingType = e => {
		const { value } = e.target;
		setDefaultOptionReport({ ...defaultOptionReport, classByType: value });
		switch (value) {
			case 'hour':
				getReportClassByTrainingTypeReq({
					req: {
						from: moment()
							.subtract(24, 'hours')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'hour',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieTypeClass(res.data, setDataChartPieTypeClass);
						}
					},
				});
				break;
			case '7day':
				getReportClassByTrainingTypeReq({
					req: {
						from: moment()
							.subtract(6, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieTypeClass(res.data, setDataChartPieTypeClass);
						}
					},
				});
				break;

			default:
				getReportClassByTrainingTypeReq({
					req: {
						from: moment()
							.subtract(30, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieTypeClass(res.data, setDataChartPieTypeClass);
						}
					},
				});
				break;
		}
	};
	const handleChangeOptionTrainingSector = e => {
		const { value } = e.target;
		setDefaultOptionReport({ ...defaultOptionReport, classBySector: value });
		switch (value) {
			case 'hour':
				getReportClassByTrainingSectorReq({
					req: {
						from: moment()
							.subtract(24, 'hours')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'hour',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieSector(res.data, setDataChartPieSectorClass);
						}
					},
				});
				break;
			case '7day':
				getReportClassByTrainingSectorReq({
					req: {
						from: moment()
							.subtract(6, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieSector(res.data, setDataChartPieSectorClass);
						}
					},
				});
				break;

			default:
				getReportClassByTrainingSectorReq({
					req: {
						from: moment()
							.subtract(30, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieSector(res.data, setDataChartPieSectorClass);
						}
					},
				});
				break;
		}
	};
	const handleChangeOptionReportStudentByTrainType = e => {
		const { value } = e.target;
		setDefaultOptionReport({ ...defaultOptionReport, studentByType: value });
		switch (value) {
			case 'hour':
				getReportTotalStudentByTrainingTypeReq({
					req: {
						from: moment()
							.subtract(24, 'hours')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'hour',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieTypeClass(res.data, setDataChartPieTotalStudentType);
						}
					},
				});
				break;
			case '7day':
				getReportTotalStudentByTrainingTypeReq({
					req: {
						from: moment()
							.subtract(6, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieTypeClass(res.data, setDataChartPieTotalStudentType);
						}
					},
				});
				break;

			default:
				getReportTotalStudentByTrainingTypeReq({
					req: {
						from: moment()
							.subtract(30, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieTypeClass(res.data, setDataChartPieTotalStudentType);
						}
					},
				});
				break;
		}
	};
	const handleChangeOptionReportStudentByTrainSector = e => {
		const { value } = e.target;
		setDefaultOptionReport({ ...defaultOptionReport, studentBySector: value });
		switch (value) {
			case 'hour':
				getReportTotalStudentByTrainingSectorReq({
					req: {
						from: moment()
							.subtract(24, 'hours')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'hour',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieSector(res.data, setDataChartPieTotalStudentSector);
						}
					},
				});
				break;
			case '7day':
				getReportTotalStudentByTrainingSectorReq({
					req: {
						from: moment()
							.subtract(6, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieSector(res.data, setDataChartPieTotalStudentSector);
						}
					},
				});
				break;

			default:
				getReportTotalStudentByTrainingSectorReq({
					req: {
						from: moment()
							.subtract(30, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) {
							generateDataChartPieSector(res.data, setDataChartPieTotalStudentSector);
						}
					},
				});
				break;
		}
	};
	const handleChoseDateReportClassByType = date => {
		if (date.length > 1)
			getReportClassByTrainingSectorReq({
				req: {
					from: moment(date[0]).toISOString(),
					to: moment(date[1]).toISOString(),
					groupType: 'date',
				},
				cb: res => {
					if (res && res.data) {
						generateDataChartPieTypeClass(res.data, setDataChartPieSectorClass);
					}
				},
			});
	};
	const handleChoseDateReportClassBySector = date => {
		if (date.length > 1)
			getReportClassByTrainingTypeReq({
				req: {
					from: moment(date[0]).toISOString(),
					to: moment(date[1]).toISOString(),
					groupType: 'date',
				},
				cb: res => {
					if (res && res.data) {
						generateDataChartPieSector(res.data, setDataChartPieTypeClass);
					}
				},
			});
	};
	const handleChoseDateReportStudentByTrainType = date => {
		if (date.length > 1)
			getReportTotalStudentByTrainingTypeReq({
				req: {
					from: moment(date[0]).toISOString(),
					to: moment(date[1]).toISOString(),
					groupType: 'date',
				},
				cb: res => {
					if (res && res.data) {
						generateDataChartPieTypeClass(res.data, setDataChartPieTotalStudentType);
					}
				},
			});
	};
	const handleChoseDateReportStudentByTrainSector = date => {
		if (date.length > 1)
			getReportTotalStudentByTrainingSectorReq({
				req: {
					from: moment(date[0]).toISOString(),
					to: moment(date[1]).toISOString(),
					groupType: 'date',
				},
				cb: res => {
					if (res && res.data) {
						generateDataChartPieSector(res.data, setDataChartPieTotalStudentSector);
					}
				},
			});
	};
	const handleChangeTabReportClass = key => {
		setTabKeyByClass(key);
		if (key === 'sector') {
			setDefaultOptionReport({ ...defaultOptionReport, classBySector: 'hour' });
			getReportClassByTrainingSectorReq({
				req: {
					from: moment()
						.subtract(24, 'hours')
						.toISOString(),
					to: moment().toISOString(),
					groupType: 'hour',
				},
				cb: res => {
					if (res && res.data) {
						generateDataChartPieSector(res.data, setDataChartPieSectorClass);
					}
				},
			});
		} else {
			setDefaultOptionReport({ ...defaultOptionReport, classByType: 'hour' });
			getReportClassByTrainingTypeReq({
				req: {
					from: moment()
						.subtract(24, 'hours')
						.toISOString(),
					to: moment().toISOString(),
					groupType: 'hour',
				},
				cb: res => {
					if (res && res.data) {
						generateDataChartPieTypeClass(res.data, setDataChartPieTypeClass);
					}
				},
			});
		}
	};
	const handleChangeTabReportStudent = key => {
		setTabKeyByStudent(key);
		if (key === 'sector') {
			setDefaultOptionReport({ ...defaultOptionReport, studentBySector: 'hour' });
			getReportTotalStudentByTrainingSectorReq({
				req: {
					from: moment()
						.subtract(24, 'hours')
						.toISOString(),
					to: moment().toISOString(),
					groupType: 'hour',
				},
				cb: res => {
					if (res && res.data) {
						generateDataChartPieSector(res.data, setDataChartPieTotalStudentSector);
					}
				},
			});
		} else {
			setDefaultOptionReport({ ...defaultOptionReport, studentByType: 'hour' });
			getReportTotalStudentByTrainingTypeReq({
				req: {
					from: moment()
						.subtract(24, 'hours')
						.toISOString(),
					to: moment().toISOString(),
					groupType: 'hour',
				},
				cb: res => {
					if (res && res.data) {
						generateDataChartPieTypeClass(res.data, setDataChartPieTotalStudentType);
					}
				},
			});
		}
	};
	const handleSelectYear = value => {
		getReportTotalClassByYearReq({
			req: {
				year: value,
			},
			cb: res => {
				if (res && res.data) generateDataChartTotalClassByYear(res.data, setDataChartTotalClassByYear);
			},
		});
	};
	const contentList = {
		type: (
			<React.Fragment>
				<div className="chart-extra mt-15">
					<Row>
						<Col xs={24} sm={12} md={10}>
							<h3>Thống kê lớp được tạo theo hệ đào tạo</h3>
						</Col>
						<Col xs={24} sm={12} md={14}>
							<ConfigProvider locale={viVN}>
								<RangePicker
									disabledDate={disabledDate}
									onChange={handleChoseDateReportClassByType}
									format="DD-MM-YYYY"
									size="default"
								/>
							</ConfigProvider>
							<span className="btn-chart">
								<Radio.Group
									onChange={handleChangeOptionTrainingType}
									defaultValue={defaultOptionReport.classByType}
									buttonStyle="solid"
								>
									<Radio.Button value="hour">24 giờ</Radio.Button>
									<Radio.Button value="7day">7 ngày</Radio.Button>
									<Radio.Button value="30day">30 ngày</Radio.Button>
								</Radio.Group>
							</span>
						</Col>
					</Row>
				</div>
				<ChartPieTypeClass dataChart={dataChartPieTypeClass} />
			</React.Fragment>
		),
		sector: (
			<React.Fragment>
				<div className="chart-extra mt-15">
					<Row>
						<Col xs={24} sm={12} md={10}>
							<h3>Thống kê lớp được tạo theo ngành đào tạo</h3>
						</Col>
						<Col xs={24} sm={12} md={14}>
							<ConfigProvider locale={viVN}>
								<RangePicker
									onChange={handleChoseDateReportClassBySector}
									disabledDate={disabledDate}
									format="DD-MM-YYYY"
									size="default"
								/>
							</ConfigProvider>

							<span className="btn-chart">
								<Radio.Group
									defaultValue={defaultOptionReport.classBySector}
									onChange={handleChangeOptionTrainingSector}
									buttonStyle="solid"
								>
									<Radio.Button value="hour">24 giờ</Radio.Button>
									<Radio.Button value="7day">7 ngày</Radio.Button>
									<Radio.Button value="30day">30 ngày</Radio.Button>
								</Radio.Group>
							</span>
						</Col>
					</Row>
				</div>
				<ChartPieTypeClass dataChart={dataChartPieSectorClass} />
			</React.Fragment>
		),
	};
	const contentTabStudentList = {
		type: (
			<React.Fragment>
				<div className="chart-extra mt-15">
					<Row>
						<Col xs={24} sm={12} md={10}>
							<h3>Thống kê học viên theo hệ đào tạo</h3>
						</Col>
						<Col xs={24} sm={12} md={14}>
							<ConfigProvider locale={viVN}>
								<RangePicker
									disabledDate={disabledDate}
									format="DD-MM-YYYY"
									onChange={handleChoseDateReportStudentByTrainType}
									size="default"
								/>
							</ConfigProvider>

							<span className="btn-chart">
								<Radio.Group
									defaultValue={defaultOptionReport.studentByType}
									onChange={handleChangeOptionReportStudentByTrainType}
									buttonStyle="solid"
								>
									<Radio.Button value="hour">24 giờ</Radio.Button>
									<Radio.Button value="7day">7 ngày</Radio.Button>
									<Radio.Button value="30day">30 ngày</Radio.Button>
								</Radio.Group>
							</span>
						</Col>
					</Row>
				</div>
				<ChartPieTypeClass dataChart={dataChartPieTotalStudentType} />
			</React.Fragment>
		),
		sector: (
			<React.Fragment>
				<div className="chart-extra mt-15">
					<Row>
						<Col xs={24} sm={12} md={10}>
							<h3>Thống kê học viên theo ngành đào tạo</h3>
						</Col>
						<Col xs={24} sm={12} md={14}>
							<ConfigProvider locale={viVN}>
								<RangePicker
									onChange={handleChoseDateReportStudentByTrainSector}
									disabledDate={disabledDate}
									format="DD-MM-YYYY"
									size="default"
								/>
							</ConfigProvider>
							<span className="btn-chart">
								<Radio.Group
									onChange={handleChangeOptionReportStudentByTrainSector}
									defaultValue={defaultOptionReport.studentBySector}
									buttonStyle="solid"
								>
									<Radio.Button value="hour">24 giờ</Radio.Button>
									<Radio.Button value="7day">7 ngày</Radio.Button>
									<Radio.Button value="30day">30 ngày</Radio.Button>
								</Radio.Group>
							</span>
						</Col>
					</Row>
				</div>
				<ChartPieTypeClass dataChart={dataChartPieTotalStudentSector} />
			</React.Fragment>
		),
	};
	return (
		<div id="class-analy">
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} visible={false} icon="" pageCurrentText="Thống kê" />
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
									loading={loadingGetTotalAllTime}
									value={totalAlltime && totalAlltime.totalClass}
									title="Lớp Học"
									type=""
									icon="user"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotalAllTime}
									value={totalAlltime && totalAlltime.totalClassOpening}
									title="Lớp khai giảng"
									type=""
									icon="user"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotalAllTime}
									value={totalAlltime && totalAlltime.totalClassProcess}
									title="Lớp đang diễn ra "
									type=""
									icon="team"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotalAllTime}
									value={totalAlltime && totalAlltime.totalClassEnd}
									title="Lớp đã hoàn thành"
									type=""
									icon="user"
								/>
							</Col>
						</Row>
					</Col>
					<Typography.Title level={4} className="">
						Thống kê theo 30 ngày gần nhất
					</Typography.Title>
					<Col span={24} className="">
						<Row gutter={16}>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotalByGroupDate}
									value={total30day && total30day.totalClass}
									title="Lớp Học"
									type=""
									icon="user"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotalByGroupDate}
									value={total30day && total30day.totalClassOpening}
									title="Lớp khai giảng"
									type=""
									icon="user"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotalByGroupDate}
									value={total30day && total30day.totalClassProcess}
									title="Lớp đang diễn ra "
									type=""
									icon="team"
								/>
							</Col>
							<Col xs={24} sm={12} md={6} className="mb-15">
								<SummaryBox
									loading={loadingGetTotalByGroupDate}
									value={total30day && total30day.totalClassEnd}
									title="Lớp đã hoàn thành"
									type=""
									icon="user"
								/>
							</Col>
						</Row>
					</Col>
					<Col xs={24} sm={24} md={24} className="mb-10">
						<Row gutter={16}>
							<Col xs={24} sm={12} md={24} className="mb-10">
								<Card
									className="card-action"
									loading={loadingGetReportClassByTrainingType || loadingGetReportClassByTrainingSector}
									tabList={tabList}
									onTabChange={handleChangeTabReportClass}
								>
									{contentList[tabKeyByClass]}
								</Card>
							</Col>
							<Col xs={24} sm={24} md={24} className="mb-10">
								<Card
									className="card-action"
									loading={loadingGetReportStudentByTrainingType || loadingGetReportStudentByTrainingSector}
									tabList={tabList}
									onTabChange={handleChangeTabReportStudent}
								>
									{contentTabStudentList[tabKeyByStudent]}
								</Card>
							</Col>
							<Col xs={24} sm={24} md={24} className="mb-10">
								<Card
									className="card-action"
									title="Biểu đồ"
									loading={loadingGetReportTotalClassByYear}
									extra={
										<SelectYearStyle onChange={handleSelectYear} defaultValue={moment().year()}>
											{renderOptionYear()}
										</SelectYearStyle>
									}
								>
									<div className="chart-extra">
										<Row>
											<Col xs={24} sm={12} md={10}>
												<h3>Thống kê lớp mở theo tháng</h3>
											</Col>
										</Row>
									</div>
									<ChartBarClass dataChart={dataChartTotalClassByYear} />
								</Card>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
}

AnalyClass.propTypes = {
	getTotalClassAllTimeStatus: PropTypes.string.isRequired,
	getTotalClass30dayStatus: PropTypes.string.isRequired,
	getReportClassByTrainingTypeStatus: PropTypes.string.isRequired,
	getReportClassByTrainingSectorStatus: PropTypes.string.isRequired,
	getReportTotalStudentByTrainingTypeStatus: PropTypes.string.isRequired,
	getReportTotalStudentByTrainingSectorStatus: PropTypes.string.isRequired,
	getReportTotalClassByYearStatus: PropTypes.string.isRequired,
	totalAlltime: PropTypes.objectOf(PropTypes.any).isRequired,
	total30day: PropTypes.objectOf(PropTypes.any).isRequired,
	getTotalAllTimeReq: PropTypes.func.isRequired,
	getTotalByGroupDateReq: PropTypes.func.isRequired,
	getReportClassByTrainingTypeReq: PropTypes.func.isRequired,
	getReportClassByTrainingSectorReq: PropTypes.func.isRequired,
	getReportTotalStudentByTrainingTypeReq: PropTypes.func.isRequired,
	getReportTotalStudentByTrainingSectorReq: PropTypes.func.isRequired,
	getReportTotalClassByYearReq: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	getTotalClassAllTimeStatus: state.classPage.getTotalClassAllTimeStatus,
	getTotalClass30dayStatus: state.classPage.getTotalClass30dayStatus,
	getReportClassByTrainingTypeStatus: state.classPage.getReportClassByTrainingTypeStatus,
	getReportClassByTrainingSectorStatus: state.classPage.getReportClassByTrainingSectorStatus,
	getReportTotalStudentByTrainingTypeStatus: state.classPage.getReportTotalStudentByTrainingTypeStatus,
	getReportTotalStudentByTrainingSectorStatus: state.classPage.getReportTotalStudentByTrainingSectorStatus,
	getReportTotalClassByYearStatus: state.classPage.getReportTotalClassByYearStatus,
	totalAlltime: state.classPage.totalAlltime,
	total30day: state.classPage.total30day,
});

const mapDispatchToProps = {
	getTotalAllTimeReq: ClassAction.getTotalsClassAllTimeRequest,
	getTotalByGroupDateReq: ClassAction.getTotalsClassByGroupDateRequest,
	getReportClassByTrainingTypeReq: ClassAction.getReportClassByTrainingTypeRequest,
	getReportClassByTrainingSectorReq: ClassAction.getReportClassByTrainingSectorRequest,
	getReportTotalStudentByTrainingTypeReq: ClassAction.getReportTotalStudentByTrainingTypeRequest,
	getReportTotalStudentByTrainingSectorReq: ClassAction.getReportTotalStudentByTrainingSectorRequest,
	getReportTotalClassByYearReq: ClassAction.getReportTotalClassByYearRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyClass);
