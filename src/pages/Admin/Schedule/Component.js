import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button, Input, Modal, DatePicker, Select } from 'antd';
// import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';

import BreadCrumb from '../../../components/BreadCrumb';
// import HeaderCalender from '../../../components/HeaderCalender';
import TableSchedule from './Component/TableSchedule';
import ModalViewClass from './Component/ModalViewClass';
import ModalViewExam from './Component/ModalViewExam';
import customMess from '../../../utils/customMessage';

import { ScheduleStyle } from './styled';

moment.locale('vi');

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
];
const { confirm } = Modal;

function ScheduleComponent(props) {
	const {
		getSchedulesStatus,
		removeScheduleStatus,
		authForScheduleStatus,
		getDetailExamForScheduleStatus,
		schedules,
		detailExam,
		getSchedulesReq,
		removeScheduleReq,
		authPasswordReq,
		getDetailExamForSchedulesReq,
	} = props;

	useEffect(() => {
		getSchedulesReq({
			req: {
				page: 1,
				limit: 10,
				keyword: '',
				startAt: moment().toISOString(),
				endAt: moment()
					.add(1, 'month')
					.toISOString(),
			},
		});
	}, []);

	const history = useHistory();
	const refInput = useRef(null);
	const refDatePicker = useRef(null);
	const [pageCurrent, setPageCurrent] = useState({ limit: 10, page: 1 });
	const [keyword, setKeyword] = useState('');
	const [datePick, setDatePick] = useState({ startAt: moment(), endAt: moment().add(1, 'month') });
	const [visibleModalClass, setVisibleModalClass] = useState(false);
	const [visibleModalExam, setVisibleModalExam] = useState(false);
	const [classData, setClassData] = useState([]);

	const loadingGet = getSchedulesStatus === 'FETCHING';
	const loadingRemove = removeScheduleStatus === 'FETCHING';
	const loadingAuth = authForScheduleStatus === 'FETCHING';
	const loadingGetDetailExam = getDetailExamForScheduleStatus === 'FETCHING';

	const handleRemove = dataExam => {
		confirm({
			title: `Bạn có muốn lịch thi '${dataExam.title}' ?`,
			onOk() {
				removeScheduleReq({
					scheduleID: dataExam._id,
					pageCurrent,
					keyword,
					datePick,
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
		setKeyword(setKeyword);
		getSchedulesReq({
			req: {
				page: 1,
				limit: 10,
				keyword: value,
				startAt: datePick.startAt,
				endAt: datePick.endAt,
			},
		});
	};
	const onChangeTable = page => {
		setPageCurrent({
			limit: Number(page.limit),
			page: Number(page.current),
		});
		getSchedulesReq({
			req: {
				limit: Number(page.limit),
				page: Number(page.current),
				keyword,
				startAt: datePick.startAt,
				endAt: datePick.endAt,
			},
		});
	};
	const handleReload = () => {
		setKeyword('');
		setDatePick({ startAt: moment(), endAt: moment().add(1, 'month') });
		setPageCurrent({ limit: 10, page: 1 });
		refInput.current.input.state.value = '';
		refDatePicker.current.picker.state.value = [];
		getSchedulesReq({
			req: {
				limit: 10,
				page: 1,
				keyword,
				startAt: moment(),
				endAt: moment().add(1, 'month'),
			},
		});
	};
	const handleChangeDatePick = date => {
		if (date.length > 0) {
			setDatePick({
				startAt: moment(date[0]).toISOString(),
				endAt: moment(date[1]).toISOString(),
			});
			getSchedulesReq({
				req: {
					limit: 10,
					page: 1,
					keyword,
					startAt: moment(date[0]).toISOString(),
					endAt: moment(date[1]).toISOString(),
				},
			});
		}
	};
	const handleViewClass = data => {
		setClassData(data);
		setVisibleModalClass(true);
	};
	const handleViewExam = examID => {
		getDetailExamForSchedulesReq({ ID: examID });
		setVisibleModalExam(true);
	};
	return (
		<ScheduleStyle>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} pageCurrentText="Quản lý lịch thi" icon="calendar" visible={false} />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row gutter={16}>
					<Col xs={24} md={24}>
						<Card
							className="phh-card mh-400"
							title="Danh sách lịch thi trong 30 ngày gần nhất"
							extra={
								<span className="group-btn">
									<Button type="primary" icon="plus" onClick={() => history.push('/admin/lich-thi/them-moi')}>
										Tạo lịch thi
									</Button>
								</span>
							}
						>
							<div className=" mb-10">
								<Row gutter={16}>
									<Col xs={24} md={24}>
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<h3>Lọc theo ngày tháng :&ensp;</h3>
											<DatePicker.RangePicker
												className="phh-date-pick"
												ref={refDatePicker}
												format="DD-MM-YYYY"
												placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
												onChange={handleChangeDatePick}
											/>
										</div>
									</Col>
								</Row>
							</div>
							<div className="phh-group-search mb-10">
								<Input.Search
									ref={refInput}
									addonBefore={
										<Button
											className="btn-reload"
											style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
											icon="sync"
											loading={loadingGet}
											onClick={handleReload}
										>
											Làm mới
										</Button>
									}
									placeholder="Nhập từ khóa.."
									enterButton
									onSearch={handleSearch}
								/>
							</div>
							<TableSchedule
								onChangeTable={onChangeTable}
								sheduleData={schedules}
								loadingGet={loadingGet}
								loadingRemove={loadingRemove}
								loadingGetDetailExam={loadingGetDetailExam}
								handleRemove={handleRemove}
								handleViewClass={handleViewClass}
								handleViewExam={handleViewExam}
							/>
						</Card>
					</Col>
					{/* <Col xs={24} md={8}>
						<Card className="phh-card" title="Lịch">
						<ConfigProvider locale={viVN}>
							<Calendar
								className="calendar-custom"
								fullscreen={false}
								locale={viVN}
								headerRender={({ value, type, onChange, onTypeChange }) => (
									<HeaderCalender value={value} type={type} onChange={onChange} onTypeChange={onTypeChange} />
								)}
							/>
							</ConfigProvider>
						</Card>
					</Col> */}
				</Row>
			</div>
			<ModalViewClass visible={visibleModalClass} setVisible={setVisibleModalClass} data={classData} />
			<ModalViewExam
				visible={visibleModalExam}
				setVisible={setVisibleModalExam}
				data={detailExam}
				authAccountReq={authPasswordReq}
				loadingAuth={loadingAuth}
			/>
		</ScheduleStyle>
	);
}

ScheduleComponent.propTypes = {
	getSchedulesStatus: PropTypes.string.isRequired,
	removeScheduleStatus: PropTypes.string.isRequired,
	authForScheduleStatus: PropTypes.string.isRequired,
	getDetailExamForScheduleStatus: PropTypes.string.isRequired,
	schedules: PropTypes.objectOf(PropTypes.any).isRequired,
	detailExam: PropTypes.objectOf(PropTypes.any).isRequired,
	getSchedulesReq: PropTypes.func.isRequired,
	removeScheduleReq: PropTypes.func.isRequired,
	authPasswordReq: PropTypes.func.isRequired,
	getDetailExamForSchedulesReq: PropTypes.func.isRequired,
};

export default ScheduleComponent;
