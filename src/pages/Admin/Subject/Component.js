import React, { useState, useEffect, useRef } from 'react';
import {
	Row,
	Col,
	Input,
	Button,
	Card,
	List,
	Skeleton,
	Tooltip,
	Icon,
	Pagination,
	Modal,
	ConfigProvider,
	Avatar,
} from 'antd';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SubjectStyle } from './styled';
import customMess from '../../../utils/customMessage';
import BreadCrumb from '../../../components/BreadCrumb';
import LoadingCustom from '../../../components/LoadingCustom';
// import TableData from './Component/TableData';
import ModalCreate from './Component/ModalSubjectCreate';
import IconPdf from '../../../assets/images/pdf.png';

const { confirm } = Modal;
const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
];

function SubjectComponent(props) {
	const [visibleCreate, setVisibleCreate] = useState(false);
	const history = useHistory();
	const [pageCurrent, setPageCurrent] = useState({ limit: 10, page: 1 });
	const [keywordSubject, setKeywordSubject] = useState('');
	const refInput = useRef(null);
	const {
		createSubjectReq,
		getSubjectsReq,
		deleteSubjectReq,
		getSubjectsStatus,
		createSubjectStatus,
		deleteSubjectStatus,
		subjects: { data, pagination },
	} = props;

	useEffect(() => {
		getSubjectsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
			},
		});
	}, [getSubjectsReq]);

	const loadingGetSubjects = getSubjectsStatus === 'FETCHING';
	const loadingCreateSubject = createSubjectStatus === 'FETCHING';
	const loadingDeleteSubject = deleteSubjectStatus === 'FETCHING';

	const handleDelete = subjectItem => {
		confirm({
			title: `Bạn có muốn xóa lớp học có mã lớp là ${subjectItem.name} ?`,
			onOk() {
				deleteSubjectReq({
					ID: subjectItem._id,
					pageCurrent,
					keyword: keywordSubject,
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
		setKeywordSubject(value);
		getSubjectsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
			},
		});
	};
	const handleChangePage = page => {
		setPageCurrent({
			page: Number(page.current),
			limit: 10,
		});
		getSubjectsReq({
			req: {
				page: Number(page.current),
				limit: 10,
				keyword: keywordSubject,
			},
		});
	};
	const handleReload = () => {
		setPageCurrent({ limit: 10, page: 1 });
		setKeywordSubject('');
		refInput.current.input.state.value = '';
		getSubjectsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
			},
		});
	};
	return (
		<SubjectStyle>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} pageCurrentText="Quản lý môn học" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Card
					className="phh-card"
					title="Danh sách môn học"
					extra={
						<span className="group-btn">
							<Button type="primary" className="btn" icon="user-add" onClick={() => setVisibleCreate(true)}>
								Thêm môn học
							</Button>
						</span>
					}
				>
					<div className="phh-group-search mb-10">
						<Input.Search
							ref={refInput}
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
							placeholder="Nhập từ khóa.."
							enterButton="Tìm kiếm"
							onSearch={handleSearch}
						/>
					</div>
					<ConfigProvider
						renderEmpty={() => (
							<div style={{ textAlign: 'center' }}>
								<Icon type="frown" style={{ fontSize: 30 }} />
								<h1 style={{ color: 'silver' }}>Không có dữ liệu</h1>
							</div>
						)}
					>
						<List
							itemLayout="horizontal"
							className="phh-list"
							dataSource={data}
							loading={{
								spinning: loadingGetSubjects,
								indicator: <LoadingCustom margin={0} />,
							}}
							renderItem={item => (
								<List.Item
									key={item.ID}
									actions={[
										<div className="phh-group-btn-action">
											<Tooltip title="Cập nhật">
												<Button
													className="btn-edit"
													onClick={() => history.push(`/admin/mon-hoc/${item._id}`)}
													icon="edit"
												/>
											</Tooltip>
										</div>,
										<div className="phh-group-btn-action">
											<Tooltip title="Xóa">
												<Button
													onClick={() => handleDelete(item)}
													loading={loadingDeleteSubject}
													className="btn-delete"
													icon="delete"
												/>
											</Tooltip>
										</div>,
									]}
								>
									<Skeleton title={false} loading={loadingGetSubjects} active>
										<List.Item.Meta
											title={
												<span style={{ color: 'black' }}>
													#{item.tag}&ensp;-&ensp;{item.name}
												</span>
											}
											description={item.introduce}
										/>
										<div className="phh-list-subject">
											<ul>
												<li>
													<Avatar shape="square" size="small" src={IconPdf} />
													&ensp; {item.totalFile && item.totalFile > 0 ? item.totalFile : 0} tệp
												</li>
											</ul>
										</div>
									</Skeleton>
								</List.Item>
							)}
						/>
					</ConfigProvider>
					<div className="fl-right">
						<Pagination
							size="small"
							onChange={handleChangePage}
							defaultCurrent={data.lenght > 0 ? pagination.page : 1}
							total={data.length > 0 ? pagination.total : 1}
							pageSize={data.length > 0 ? pagination.limit : 10}
						/>
					</div>
				</Card>
			</div>
			<ModalCreate
				createReq={createSubjectReq}
				loadingCreate={loadingCreateSubject}
				visible={visibleCreate}
				setVisible={setVisibleCreate}
				pageCurrent={pageCurrent}
				keyword={keywordSubject}
			/>
		</SubjectStyle>
	);
}
SubjectComponent.propTypes = {
	createSubjectReq: PropTypes.func.isRequired,
	getSubjectsReq: PropTypes.func.isRequired,
	deleteSubjectReq: PropTypes.func.isRequired,
	getSubjectsStatus: PropTypes.string.isRequired,
	createSubjectStatus: PropTypes.string.isRequired,
	deleteSubjectStatus: PropTypes.string.isRequired,
	subjects: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SubjectComponent;
