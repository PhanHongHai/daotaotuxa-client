import React, { useState, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Result, Form, Input, Upload, Spin, Icon } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';

const PreviewFile = lazy(() => import('../../../../components/PreviewFile'));

const { Dragger } = Upload;

function ModalViewFile(props) {
	const {
		visible,
		setVisible,
		data: { file, type },
		form: { getFieldDecorator },
	} = props;
	const [isUpdate, setIsUpdate] = useState(false);
	const renderBody = () => {
		if (isUpdate)
			return (
				<Form className="update-lesson form-custom pd-1">
					<Form.Item label="Tiêu đề">
						{getFieldDecorator('title', {
							initialValue: 'Bai 1',
							rules: [
								{
									required: true,
									message: 'Không được để trống tiêu đề',
								},
							],
						})(<Input placeholder="Nhập tiêu đề bài học" />)}
					</Form.Item>
					<Form.Item label="Nội dung">
						<div className="upload-container">
							<div className="upload-frame">
								<Dragger>
									<Spin spinning={false} indicator={<LoadingCustom margin={0} />}>
										<div>
											<p className="ant-upload-drag-icon">
												<Icon type="file-pdf" />
											</p>
											<p className="ant-upload-text">Chọn file</p>
										</div>
									</Spin>
								</Dragger>
							</div>
						</div>
					</Form.Item>
				</Form>
			);
		if (file && type)
			return (
				<div>
					<h3 className='mt-5 mb-5'>Tiêu đề : Bài 1</h3>
					<PreviewFile file={file} type="pdf" />
				</div>
			);
		return <Result status="error" title="Hiển thị nội dung thất bại" subTitle="Xin hãy kiểm tra lại." />;
	};
	return (
		<Modal
			width="600px"
			className="phh-modal modal-preview"
			centered
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={
				<span>
					{isUpdate ? (
						<React.Fragment>
							<Button className="btn">Xác nhận</Button>
							<Button onClick={() => setIsUpdate(false)} className="btn-cancel ml-10">
								Hủy
							</Button>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Button className="btn" onClick={() => setIsUpdate(true)}>
								Cập nhật
							</Button>
							<Button onClick={() => setVisible(false)} className="btn-cancel ml-10">
								Đóng
							</Button>
						</React.Fragment>
					)}
				</span>
			}
			title={isUpdate ? 'Cập nhật nội dung' : 'Xem nội dung'}
		>
			<Suspense fallback={<LoadingCustom margin={0} />}>{renderBody()}</Suspense>
		</Modal>
	);
}

ModalViewFile.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	data: PropTypes.objectOf(PropTypes.object).isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'update-lesson' })(ModalViewFile);
