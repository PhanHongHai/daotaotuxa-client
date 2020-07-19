import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import TableStudent from './TableStudentData';

function ModalStudentList(props) {
	const { visible, setvisible, data, loading, getReq,classID } = props;
	const [keyword, setKeyword] = React.useState('');
	const handleSearch = value => {
		setKeyword(value);
		getReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
				classID,
			},
		});
	};
	const handleReload = () => {
		refInput.current.input.state.value = '';
		setKeyword('');
		getReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				classID,
			},
		});
	};

	const handleChangePage = page => {
		getReq({
			req: {
				page: Number(page.current),
				limit: 10,
				keyword,
				classID,
			},
		});
	};
	return (
		<Modal
			className="phh-modal"
			title="Danh sách học viên"
			visible={visible}
			width='700px'
			onCancel={() => {
				setKeyword('');
				setvisible(false);
			}}
			footer={null}
		>
			<div className="phh-group-search mb-10 mt-10 flex" style={{ alignItems: 'center' }}>
				<Input.Search
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
					ref={refSearch}
					placeholder="Nhập từ khóa.."
					enterButton
					onSearch={handleSearch}
				/>
			</div>
			<TableStudent studentList={data} onChangePage={handleChangePage} loading={loading} />
		</Modal>
	);
}

ModalStudentList.propTypes = {
	classID: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	getReq: PropTypes.func.isRequired,
};

export default ModalStudentList;
