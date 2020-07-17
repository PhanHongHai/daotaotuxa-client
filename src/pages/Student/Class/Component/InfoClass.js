import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tag, Icon, Card, Spin,Divider } from 'antd';
import moment from 'moment';
import _ from 'lodash';

// import TeacherIcon from '../../../../assets/images/teacherIcon.svg';
import { trainingType } from '../../../../constands/Other';
import InfoTeacher from './InfoTeacher';
import LoadingCustom from '../../../../components/LoadingCustom';
import FeatureBox from './FeatureBox';
import { InfoClassStyle } from '../styled';

const renderTypeClass = value => {
	if (value) return trainingType.find(ele => ele.key === value).value;
	return '';
};
const renderStatusClass = value => {
	switch (value) {
		case 'OP':
			return <Tag color="#1bb394">Chờ Khai giảng</Tag>;
		case 'HP':
			return <Tag color="blue">Đang diễn ra</Tag>;
		default:
			return <Tag color="gray">Kết thúc</Tag>;
	}
};

function InfoClass(props) {
	const {
		info: { countStudent, infoTeacher, infoClass },
		loading,
		handleChangeTab,
		tabKey,
		tabList,
	} = props;
	return (
		<div>
			<Row gutter={16}>
				<Col xs={24} md={8} className="mb-10">
					<Card className="phh-card-v2" title="Giảng viên">
						<Spin spinning={loading} indicator={<LoadingCustom margin={10} />}>
							<InfoTeacher info={infoTeacher && infoTeacher.accountID} />
						</Spin>
					</Card>
				</Col>
				<Col xs={24} md={16}>
					<Card className="phh-card-v2 mb-15" title="Thông tin lớp học">
						<Spin spinning={loading} indicator={<LoadingCustom margin={10} />}>
							<InfoClassStyle>
								<ul>
									<Row gutter={16}>
								
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="appstore" theme="filled" />
												</div>
												<p>
													Mã Lớp Học :&ensp; <Tag>{infoClass && infoClass.name}</Tag>
												</p>
											</li>
										</Col>
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="appstore" theme="filled" />
												</div>
												<p>
													Hệ:&ensp; <Tag> {renderTypeClass(infoClass && infoClass.trainingSectorID.type)}</Tag>
												</p>
											</li>
										</Col>
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="appstore" theme="filled" />
												</div>
												<p>
													Ngành Đào Tạo :&ensp; <Tag> {infoClass && infoClass.trainingSectorID.name}</Tag>
												</p>
											</li>
										</Col>
										<Divider />
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="calendar" theme="filled" />
												</div>
												<p>
													Ngày Khai Giảng :&ensp;
													{!_.isEmpty(infoClass)
														? `${moment(infoClass && infoClass.startAt).format('DD-MM-YYYY')}`
														: ''}
												</p>
											</li>
										</Col>
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="calendar" theme="filled" />
												</div>
												<p>
													Ngày Kết Thúc :&ensp;
													{!_.isEmpty(infoClass) ? `${moment(infoClass && infoClass.endAt).format('DD-MM-YYYY')}` : ''}
												</p>
											</li>
										</Col>
										<Col xs={24} md={12} className="mb-15">
											<li>
												<div>
													<Icon type="idcard" theme="filled" />
												</div>
												<p>Tổng học viên :&ensp; {countStudent}</p>
											</li>
										</Col>
										<Col xs={24} md={12} className="">
											<li>
												<div>
													<Icon type="thunderbolt" theme="filled" />
												</div>
												<p>Trạng Thái :&ensp; {renderStatusClass(infoClass && infoClass.status)}</p>
											</li>
										</Col>
									</Row>
								</ul>
							</InfoClassStyle>
							{/* <Descriptions>
								<Descriptions.Item label="Mã Lớp Học">{infoClass && infoClass.name}</Descriptions.Item>
								<Descriptions.Item label="Ngành Đào Tạo">
									{infoClass && infoClass.trainingSectorID.name}
								</Descriptions.Item>
								<Descriptions.Item label="Hệ">
									{renderTypeClass(infoClass && infoClass.trainingSectorID.type)}
								</Descriptions.Item>
								<Descriptions.Item label="Ngày Khai Giảng">
									{!_.isEmpty(infoClass) ? `${moment(infoClass && infoClass.startAt).format('DD-MM-YYYY')}` : ''}
								</Descriptions.Item>

								<Descriptions.Item label="Tổng học viên">{countStudent}</Descriptions.Item>

								<Descriptions.Item label="Trạng Thái">
									{renderStatusClass(infoClass && infoClass.status)}
								</Descriptions.Item>
								<Descriptions.Item label="Ngày Kết Thúc">
									{!_.isEmpty(infoClass) ? `${moment(infoClass && infoClass.endAt).format('DD-MM-YYYY')}` : ''}
								</Descriptions.Item>
							</Descriptions> */}
						</Spin>
					</Card>
					{/* <Card
						className="phh-card-v2 card-body-transparent mt-15 tab-custom"
						tabList={tabList}
						activeTabKey={tabKey}
						onTabChange={key => handleChangeTab(key)}
					/> */}

					<Row gutter={16} className="mt-10">
						<Col xs={24} md={8} className="mb-15">
							<FeatureBox icon="profile" title="Danh Sách Học Viên" onSelect={() => {}} />
						</Col>
						<Col xs={24} md={8} className="mb-15">
							<FeatureBox icon="project" title="Bảng Điểm" onSelect={() => {}} />
						</Col>
						<Col xs={24} md={8} className="mb-15">
							<FeatureBox icon="read" title="Danh Sách Môn Học" onSelect={() => {}} />
						</Col>
						<Col xs={24} md={8} className="mb-15">
							<FeatureBox icon="schedule" title="Lịch Thi" onSelect={() => {}} />
						</Col>
						<Col xs={24} md={8} className="mb-15">
							<FeatureBox icon="carry-out" title="Thi Thử" onSelect={() => {}} />
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
}

InfoClass.propTypes = {
	info: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	handleChangeTab: PropTypes.func.isRequired,
	tabKey: PropTypes.string.isRequired,
	tabList: PropTypes.instanceOf(Array).isRequired,
};

export default InfoClass;
