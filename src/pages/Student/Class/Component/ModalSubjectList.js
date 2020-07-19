import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import ListSubjectItem from './ListSubjectItem';

function ModalSubjectList(props) {
	const { visible, setVisible, loading, sectorID, getReq ,loadingGetProgressByStudent} = props;
	const [keyword, setKeyword] = useState('');

	const handleChangePage = page => {
		getSubjectsOfClassReq({
			req: {
				page: Number(page.current),
				limit: 10,
				keyword,
				classID: ID,
			},
		});
	};

	const handleSearch = value => {
		setKeyword(value);
		getReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
				sectorID,
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
				sectorID,
			},
		});
	};
	const handleChangePage = page => {
		getReq({
			req: {
				page: Number(page.current),
				limit: 10,
				keyword,
				sectorID,
			},
		});
	};
	return (
		<Modal
			className="phh-modal"
			title="Danh sách môn học"
			visible={visible}
      footer={null}
      width='700px'
			onCancel={() => {
        setKeyword('');
				setVisible(false);
			}}
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
			<div>
				<ListSubjectItem
					classID={classID}
					loading={loading}
					subjectList={data}
					progressOfStudent={progressOfStudent}
          onChangePage={handleChangePage}
          loadingGetProgressByStudent={loadingGetProgressByStudent}
				/>
			</div>
		</Modal>
	);
}

ModalSubjectList.propTypes = {
	sectorID: PropTypes.string.isRequired,
	classID: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getReq: PropTypes.func.isRequired,
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingGetProgressByStudent: PropTypes.bool.isRequired,
	progressOfStudent: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalSubjectList;
