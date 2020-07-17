import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import DataPointTable from '../../../../components/DataPointTable';

function ModalPoint(props) {
	const { visible, setVisible } = props;
  const data=[
    {
      tagSubject:'#CN1',
      name:'Công Nghệ',
      point:7.5,
    },
    {
      tagSubject:'#YT2',
      name:'Y Tế',
      point:7.5,
    },
    {
      tagSubject:'#MT3',
      name:'Môi Trường',
      point:7.5,
    },
  ];

	return (
		<Modal className='phh-modal' title="Bảng điểm" visible={visible} footer={null} onCancel={() => setVisible(false)}>
			<DataPointTable data={data} />
		</Modal>
	);
}

ModalPoint.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
};

export default ModalPoint;
