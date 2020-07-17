import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Radio, Card, DatePicker, ConfigProvider, Modal, Button, Input, Typography, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';
import _ from 'lodash';
import viVN from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';

import customMess from '../../../utils/customMessage';
import ChartLineStudent from './Component/ChartLine';
import ChartPieStudent from './Component/ChartPie';
import ChartBarStudent from './Component/ChartBar';
import TableData from './Component/TableStudent';

import countries from '../../../utils/country.json';

import { SelectYearStyle } from './styled';

const { RangePicker } = DatePicker;
const { confirm } = Modal;
const disabledDate = current => {
	// Can not select days before today and today
	return current && current >= moment().endOf('day');
};

moment.locale('vi');

const generateDataChartLine = (data, groupType, funcSave) => {
	funcSave({
		labels: _.map(data, item => moment(item.date).format(groupType === 'hour' ? 'HH a' : 'DD-MM-YYYY')),
		totalAccountStudent: _.map(data, item => numeral(item.totalAccountStudent).format('0,0.0[0]')),
		totalAccountStudentActived: _.map(data, item => numeral(item.totalAccountStudentActived).format('0,0.0[0]')),
		totalAccountApproved: _.map(data, item => numeral(item.totalAccountApproved).format('0,0.0[0]')),
	});
};

const generateDataChartArea = (data, funcSave) => {
	funcSave({
		labels: _.map(data, item => countries.find(ele => ele.key === item.area).name),
		total: _.map(data, item => item.totalStudent),
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

function DashboardPartner(props) {
	const {
		getStudentStatus,
		searchStudentStatus,
		deleteStudentStatus,
		getReportStudentGroupDateStatus,
		getReportStudentGroupYearStatus,
		getReportStudentGroupAreaStatus,
		students: { data, pagination },
		getStudentReq,
		deleteStudentReq,
		searchStudentReq,
		getReportStudentGroupByDateReq,
		getReportStudentGroupByAreaReq,
		getReportStudentGroupByYearReq,
	} = props;

	const [chartLineData, setChartLineData] = useState({
		labels: [],
		totalAccountStudent: [],
		totalAccountStudentActived: [],
		totalAccountApproved: [],
	});
	const [dataChartTotalStudentByYear, setDataChartTotalStudentByYear] = useState([]);
	const [dataChartPieStudent, setDataChartPieStudent] = useState({ labels: [], total: [] });
	const [typeGroup, setTypeGroup] = useState('hour');


	useEffect(() => {
		getStudentReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
			},
		});
		getReportStudentGroupByDateReq({
			req: {
				from: moment()
					.subtract(24, 'hours')
					.toISOString(),
				to: moment().toISOString(),
				groupType: 'hour',
			},
			cb: res => {
				if (res && res.data) generateDataChartLine(res.data, 'hour', setChartLineData);
			},
		});
		getReportStudentGroupByAreaReq({
			req: {
				from: moment()
					.subtract(24, 'hours')
					.toISOString(),
				to: moment().toISOString(),
				groupType: 'hour',
			},
			cb: res => {
				if (res && res.data) generateDataChartArea(res.data, setDataChartPieStudent);
			},
		});
		getReportStudentGroupByYearReq({
			req: {
				year: moment().year(),
			},
			cb: res => {
				if (res && res.data) generateDataChartTotalClassByYear(res.data, setDataChartTotalStudentByYear);
			},
		});
	}, [getStudentReq]);
	const history = useHistory();
	const [keyword, setKeyword] = useState('');
	const [pageCurrent, setPageCurrent] = useState({
		limit: 10,
		page: 1,
	});
	const refSearch = useRef(null);
	const loadingGetStudent = getStudentStatus === 'FETCHING';
	const loadingSearchStudent = searchStudentStatus === 'FETCHING';
	const loadingDeleteStudent = deleteStudentStatus === 'FETCHING';
	const loadingReportStudentGroupDate = getReportStudentGroupDateStatus === 'FETCHING';
	const loadingReportStudentGroupYear = getReportStudentGroupYearStatus === 'FETCHING';
	const loadingReportStudentGroupArea = getReportStudentGroupAreaStatus === 'FETCHING';

	const handleDelete = rowData => {
		confirm({
			title: `Bạn có muốn xóa học viên ${rowData.name} ?`,
			onOk() {
				deleteStudentReq({
					ID: rowData._id,
					pageCurrent,
					keyword,
					cb: res => {
						if (res.isDeleted) customMess('notification', 'success', res.msg);
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};
	const handleSearch = value => {
		setKeyword(value);
		searchStudentReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
			},
		});
	};
	const handleReload = () => {
		setKeyword('');
		setPageCurrent({ limit: 10, page: 1 });
		refSearch.current.input.state.value = '';
		getStudentReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
			},
		});
	};
	const handleSelectYear = value => {
		getReportStudentGroupByYearReq({
			req: {
				year: value,
			},
			cb: res => {
				if (res && res.data) generateDataChartTotalClassByYear(res.data, setDataChartTotalStudentByYear);
			},
		});
	};
	const handleChangeDate = date => {
		if (date.length > 1) {
			setTypeGroup('date');
			getReportStudentGroupByDateReq({
				req: {
					from: moment(date[0]).toISOString(),
					to: moment(date[1]).toISOString(),
					groupType: 'date',
				},
				cb: res => {
					if (res && res.data) generateDataChartLine(res.data,'date', setChartLineData);
				},
			});
			getReportStudentGroupByAreaReq({
				req: {
					from: moment(date[0]).toISOString(),
					to: moment(date[1]).toISOString(),
					groupType: 'date',
				},
				cb: res => {
					if (res && res.data) generateDataChartArea(res.data, setDataChartPieStudent);
				},
			});
		}
	};
	const handleChoseOptionReport = e => {
		const { value } = e.target;
		setTypeGroup(value);
		switch (value) {
			case 'hour':
				getReportStudentGroupByDateReq({
					req: {
						from: moment()
							.subtract(24, 'hours')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'hour',
					},
					cb: res => {
						if (res && res.data) generateDataChartLine(res.data, 'hour', setChartLineData);
					},
				});
				getReportStudentGroupByAreaReq({
					req: {
						from: moment()
							.subtract(24, 'hours')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'hour',
					},
					cb: res => {
						if (res && res.data) generateDataChartArea(res.data, setDataChartPieStudent);
					},
				});
				break;
			case '7day':
				getReportStudentGroupByDateReq({
					req: {
						from: moment()
							.subtract(6, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) generateDataChartLine(res.data, 'date', setChartLineData);
					},
				});
				getReportStudentGroupByAreaReq({
					req: {
						from: moment()
							.subtract(6, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) generateDataChartArea(res.data, setDataChartPieStudent);
					},
				});
				break;
			default:
				getReportStudentGroupByDateReq({
					req: {
						from: moment()
							.subtract(30, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) generateDataChartLine(res.data, 'date', setChartLineData);
					},
				});
				getReportStudentGroupByAreaReq({
					req: {
						from: moment()
							.subtract(30, 'days')
							.toISOString(),
						to: moment().toISOString(),
						groupType: 'date',
					},
					cb: res => {
						if (res && res.data) generateDataChartArea(res.data, setDataChartPieStudent);
					},
				});
				break;
		}
	};

	return (
		<div className="container mt-15 mb-15">
			<div className="">
				<Row gutter={16} justify="center">
					<Col xs={24} md={24} className="mb-5">
						<Typography.Title level={4}>Dashboard</Typography.Title>
					</Col>
					<Col xs={24} sm={24} md={24} className="mb-15">
						<Card
							title="Thống kê lượng tài khoản học viên"
							loading={loadingReportStudentGroupArea || loadingReportStudentGroupDate}
							className="card-action"
						>
							<Row gutter={16}>
								<Col xs={24} sm={16}>
									<div className="chart-extra">
										<ConfigProvider locale={viVN}>
											<RangePicker
												onChange={handleChangeDate}
												disabledDate={disabledDate}
												format="DD-MM-YYYY"
												size="default"
											/>
										</ConfigProvider>
										<span className="btn-chart">
											<Radio.Group onChange={handleChoseOptionReport} defaultValue={typeGroup} buttonStyle="solid">
												<Radio.Button value="hour">24 giờ</Radio.Button>
												<Radio.Button value="7day">7 ngày</Radio.Button>
												<Radio.Button value="30day">30 ngày</Radio.Button>
											</Radio.Group>
										</span>
									</div>
									<ChartLineStudent chartData={chartLineData} />
								</Col>
								<Col xs={24} sm={8}>
									<h3 style={{ textAlign: 'center' }}>Học viên theo khu vực</h3>
									<ChartPieStudent chartData={dataChartPieStudent} />
								</Col>
							</Row>
						</Card>
					</Col>
					<Col xs={24} sm={24} md={24} className="mb-15">
						<Card
							className="card-action"
							title="Biểu đồ"
							loading={loadingReportStudentGroupYear}
							extra={
								<SelectYearStyle onChange={handleSelectYear} defaultValue={moment().year()}>
									{renderOptionYear()}
								</SelectYearStyle>
							}
						>
							<div className="chart-extra">
								<Row>
									<Col xs={24} sm={12} md={10}>
										<h3>Thống kê tài khoản theo tháng</h3>
									</Col>
								</Row>
							</div>
							<ChartBarStudent chartData={dataChartTotalStudentByYear} />
						</Card>
					</Col>
					<Col xs={24} sm={24} md={24} className="mb-15">
						<Card
							title="Danh sách học viên"
							className="phh-card"
							extra={
								<span className="group-btn">
									<Button icon="user-add" onClick={() => history.push('/partner/dashboard/them')}>
										Thêm học viên
									</Button>
								</span>
							}
						>
							<div className="phh-group-search mb-10">
								<Input.Search
									ref={refSearch}
									addonBefore={
										<Button
											className="btn-reload"
											style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
											icon="sync"
											loading={loadingGetStudent}
											onClick={handleReload}
										>
											Làm mới
										</Button>
									}
									loading={loadingSearchStudent}
									placeholder="Nhập từ khóa.."
									enterButton
									onSearch={handleSearch}
								/>
							</div>
							<TableData
								data={data}
								pagination={pagination}
								loadingGet={loadingGetStudent}
								loadingSearch={loadingSearchStudent}
								loadingDelete={loadingDeleteStudent}
								openDelete={handleDelete}
								savePageCurrent={setPageCurrent}
								getReq={getStudentReq}
								keyword={keyword}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
}
DashboardPartner.propTypes = {
	getStudentStatus: PropTypes.string.isRequired,
	searchStudentStatus: PropTypes.string.isRequired,
	deleteStudentStatus: PropTypes.string.isRequired,
	getReportStudentGroupDateStatus: PropTypes.string.isRequired,
	getReportStudentGroupYearStatus: PropTypes.string.isRequired,
	getReportStudentGroupAreaStatus: PropTypes.string.isRequired,
	getStudentReq: PropTypes.func.isRequired,
	deleteStudentReq: PropTypes.func.isRequired,
	searchStudentReq: PropTypes.func.isRequired,
	getReportStudentGroupByDateReq: PropTypes.func.isRequired,
	getReportStudentGroupByAreaReq: PropTypes.func.isRequired,
	getReportStudentGroupByYearReq: PropTypes.func.isRequired,
	students: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default DashboardPartner;
