import React from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	List,
	Avatar,
	Button,
	Skeleton,
	Col,
	ConfigProvider,
	Icon,
	Pagination,
	Progress,
	Tooltip,
	Row,
} from 'antd';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

import { ListSubjectStyle } from '../styled';
import LoadingCustom from '../../../../components/LoadingCustom';

import BookIcon from '../../../../assets/images/textbook.png';

const handleCheckData = subjectData => {
	let listRemoveID = [];
	const result = subjectData;
	if (subjectData.length > 0) {
		listRemoveID = subjectData.map(ele => {
			if (_.isNull(ele.subjectID)) return ele._id;
			return 0;
		});
	}
	if (listRemoveID.length > 0) {
		listRemoveID.map(item => {
			return _.remove(subjectData, ele => ele._id === item);
		});
	}
	return result;
};

function ListSubjectItem(props) {
	const { data, loading, classID, pagination, handleChangePage, progressOfStudent } = props;
	const history = useHistory();
	return (
		<Card className="card-transparent" bordered={false}>
			<Row>
				<Col span={24}>
					<Row gutter={16}>
						<ConfigProvider
							renderEmpty={() => (
								<Card className="phh-card-v2 pd-3 ">
									<div style={{ textAlign: 'center' }}>
										<Icon type="frown" style={{ fontSize: 30 }} />
										<h1 style={{ color: 'silver' }}>Không có dữ liệu môn học</h1>
									</div>
								</Card>
							)}
						>
							<ListSubjectStyle
								className=""
								loading={{
									spinning: loading,
									indicator: <LoadingCustom margin={0} />,
								}}
								itemLayout="horizontal"
								dataSource={handleCheckData(data)}
								renderItem={item => {
									if (progressOfStudent && progressOfStudent.length > 0) {
										const existItem = progressOfStudent.find(ele => ele.subjectID === item.subjectID._id);
										if (existItem)
											return (
												<Col xs={24} md={12} className="mb-15">
													<List.Item
														key="item._id"
														className="subject-item"
														actions={[
															<Button
																className="btn"
																key="item._id"
																onClick={() =>
																	history.push(`/learn/${classID}/${item.subjectID && item.subjectID._id}`)
																}
															>
																Học ngay
															</Button>,
														]}
													>
														<Skeleton avatar title={false} loading={loading} active>
															<List.Item.Meta
																avatar={<Avatar src={BookIcon} size={50} />}
																title={
																	<h3>
																		#{item.subjectID && item.subjectID.tag} - &ensp;
																		{item.subjectID && item.subjectID.name}
																	</h3>
																}
																description={
																	<Tooltip title={`Tiến độ ${existItem.progress}`}>
																		<Progress
																			format={percent => `${percent}%`}
																			percent={existItem.progress}
																			status="active"
																		/>
																	</Tooltip>
																}
															/>
														</Skeleton>
													</List.Item>
												</Col>
											);
									}
									return (
										<Col xs={24} md={12} className="mb-15">
											<List.Item
												key="item._id"
												className="subject-item"
												actions={[
													<Button
														className="btn"
														key="item._id"
														onClick={() => history.push(`/learn/${classID}/${item.subjectID && item.subjectID._id}`)}
													>
														Học ngay
													</Button>,
												]}
											>
												<Skeleton avatar title={false} loading={loading} active>
													<List.Item.Meta
														avatar={<Avatar src={BookIcon} size={50} />}
														title={
															<h3>
																#{item.subjectID && item.subjectID.tag} - &ensp;{item.subjectID && item.subjectID.name}
															</h3>
														}
														description={
															<Tooltip title="Tiến độ học"> <Progress percent={0} status="active" /></Tooltip>
														}
													/>
												</Skeleton>
											</List.Item>
										</Col>
									);
								}}
							/>
						</ConfigProvider>
					</Row>
				</Col>
				<Col span={24}>
					{data && data.length > 0 ? (
						<div className="fl-right mt-10">
							<Pagination
								size="small"
								onChange={handleChangePage}
								defaultCurrent={data.lenght > 0 ? pagination.page : 1}
								total={data.length > 0 ? pagination.total : 1}
								pageSize={data.length > 0 ? pagination.limit : 10}
							/>
						</div>
					) : (
						''
					)}
				</Col>
			</Row>
		</Card>
	);
}

ListSubjectItem.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
	progressOfStudent: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	classID: PropTypes.string.isRequired,
	handleChangePage: PropTypes.func.isRequired,
};

export default ListSubjectItem;
