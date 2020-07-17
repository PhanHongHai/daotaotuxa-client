import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col } from 'antd';



const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 3 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 21 },
	},
};

function FormEditExam(props) {
	const {
		form: { getFieldDecorator },
		loadingUpdate
	} = props;
	const handleSubmitUpdate = e =>{
		e.preventDefault();
	};
	
	return (
		<Form {...formItemLayout} onSubmit={handleSubmitUpdate} className="form-custom">
			<Row gutter={16} className="mt-15">
				<Col xs={24} md={24}>
					<Form.Item label="Tiêu đề" labelAlign="left">
						{getFieldDecorator('title', {
							rules: [
								{
									required: true,
									message: 'Không được để trống tiêu đề',
								},
							],
						})(<Input placeholder="Nhập tiêu đề" />)}
					</Form.Item>
				</Col>
				<Col xs={24} md={24} className="mt-10">
					<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
						<Button icon="plus" loading={loadingUpdate} className="btn-submit" htmlType="submit">
							Cập nhật
						</Button>
						<Button className="btn-cancel ml-5">Xóa</Button>
						<Button className="btn-cancel ml-5">Quay về</Button>
					</span>
				</Col>
			</Row>
		</Form>
	);
}

FormEditExam.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	loadingUpdate:PropTypes.bool.isRequired,
};

export default Form.create({ name: 'exam-edit' })(FormEditExam);
