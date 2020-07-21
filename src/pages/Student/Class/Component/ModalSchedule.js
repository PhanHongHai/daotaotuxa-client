import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal, Input, DatePicker, Row, Col, Button } from 'antd';

import TableSchedule from './TableSchedule';

function ModalSchedule(props) {
	const { visible, setVisible, getSchedulesReq, loadingGet, scheduleData, classID } = props;
	const refInput = useRef(null);
	const refDatePicker = useRef(null);
	const [keyword, setKeyword] = useState('');
	const [datePick, setDatePick] = useState({ startAt: moment(), endAt: moment().add(1, 'month') });
	const handleSearch = value => {
		setKeyword(setKeyword);
		getSchedulesReq({
			req: {
				page: 1,
				limit: 10,
				classID,
				keyword: value,
				startAt: datePick.startAt,
				endAt: datePick.endAt,
			},
		});
	};
	const onChangeTable = page => {
		getSchedulesReq({
			req: {
				limit: Number(page.limit),
				page: Number(page.current),
				keyword,
				classID,
				startAt: datePick.startAt,
				endAt: datePick.endAt,
			},
		});
	};
	const handleReload = () => {
		setKeyword('');
		setDatePick({ startAt: moment(), endAt: moment().add(1, 'month') });
		refInput.current.input.state.value = '';
		refDatePicker.current.picker.state.value = [];
		getSchedulesReq({
			req: {
				limit: 10,
				page: 1,
				keyword,
				classID,
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
					classID,
					startAt: moment(date[0]).toISOString(),
					endAt: moment(date[1]).toISOString(),
				},
			});
		}
	};
	return (
		<Modal
			title="Danh sách lịch thi trong 30 ngày"
			className="phh-modal"
			width="850px"
			visible={visible}
			footer={null}
			onCancel={() => setVisible(false)}
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
			<TableSchedule scheduleData={scheduleData} loading={loadingGet} onChangeTable={onChangeTable} />
		</Modal>
	);
}

ModalSchedule.propTypes = {
	classID: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	loadingGet: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getSchedulesReq: PropTypes.func.isRequired,
	scheduleData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalSchedule;
