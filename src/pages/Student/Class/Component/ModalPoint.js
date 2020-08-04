import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

import TablePoint from './TablePoint';

function ModalPoint(props) {
	const { visible, setVisible, data, loading, getPointsReq } = props;

	const onChangeTable = page => {
		getPointsReq({
			req: {
				limit: Number(page.limit),
				page: Number(page.current),
			},
		});
	};
	const handleReload = () => {
		getPointsReq({
			req: {
				limit: 10,
				page: 1,
			},
		});
	};
	return (
		<Modal
			title="Điểm thi"
			className="phh-modal"
			onCancel={() => setVisible(false)}
			footer={null}
			width="750px"
			visible={visible}
		>
			<div className="phh-group-search mb-10" style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					className=" mr-5"
					style={{ height: '35px', color: 'white' }}
					icon="sync"
					loading={loading}
					onClick={handleReload}
				>
					Làm mới
				</Button>
				<Button className="" style={{ height: '35px', color: 'white' }} icon="file-excel">
					Xuất excel
				</Button>
			</div>
			<TablePoint onChangePage={onChangeTable} loading={loading} points={data} />
		</Modal>
	);
}

ModalPoint.propTypes = {
	visible: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getPointsReq: PropTypes.func.isRequired,
	data: PropTypes.instanceOf(Array).isRequired,
};

export default ModalPoint;
