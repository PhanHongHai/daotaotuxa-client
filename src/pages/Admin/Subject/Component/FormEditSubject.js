import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col } from 'antd';
import _ from 'lodash';

import customMess from '../../../../utils/customMessage';

function FormEditSubject(props) {
	const {
		info,
		updateReq,
		deleteReq,
		loadingUpdate,
		loadingDelete,
		form: { getFieldDecorator, validateFields },
	} = props;

	const [formData, setFormData] = React.useState({});

	const onchangeInput = e => {
		const { value, name } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		validateFields(err => {
			if (!err) {
				updateReq({
					req: {
						...formData,
					},
					ID: info && info._id,
					cb: res => {
						if (res && res.isUpdated) {
							customMess('notification', 'success', res.msg);
						}
					},
				});
			}
		});
	};
	return (
		<Form
			className="form-custom"
			onSubmit={handleSubmit}
			labelCol={{
				xs: { span: 24 },
				sm: { span: 5 },
				md: { span: 5 },
			}}
			wrapperCol={{
				xs: { span: 24 },
				sm: { span: 19 },
				md: { span: 19 },
			}}
		>
			<Row>
				<Col xs={24} md={12}>
					<Row>
						<Col span={24}>
							<Form.Item label="Mã môn học">
								{getFieldDecorator('tag', {
									initialValue: info && info.tag,
									rules: [
										{
											required: true,
											message: 'Không được để trống mã môn học',
										},
									],
								})(<Input name="tag" onChange={onchangeInput} placeholder="Nhập mã môn học" />)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item label="Tên môn học">
								{getFieldDecorator('name', {
									initialValue: info && info.name,
									rules: [
										{
											required: true,
											message: 'Không được để trống tên môn học',
										},
									],
								})(<Input name="name" onChange={onchangeInput} placeholder="Nhập tên môn học" />)}
							</Form.Item>
						</Col>
					</Row>
				</Col>
				<Col xs={24} md={12}>
					<Form.Item label="Mô tả">
						{getFieldDecorator('introduce', {
							initialValue: info && info.introduce,
						})(
							<Input.TextArea name="introduce" onChange={onchangeInput} rows={5} placeholder="Nhập mô tả về môn học" />,
						)}
					</Form.Item>
				</Col>
			</Row>
			<div className="flex" style={{float:'right'}}>
				<Button
					disabled={_.isEmpty(formData)}
					loading={loadingUpdate}
					icon="plus"
					className="btn-submit"
					htmlType="submit"
					style={{ float: 'right' }}
				>
					Cập nhật
				</Button>
				<Button className="btn-cancel ml-5" loading={loadingDelete} onClick={() => deleteReq()}>
					Xóa
				</Button>
			</div>
		</Form>
	);
}

FormEditSubject.propTypes = {
	form: PropTypes.objectOf(PropTypes.object).isRequired,
	info: PropTypes.objectOf(PropTypes.object).isRequired,
	updateReq: PropTypes.func.isRequired,
	deleteReq: PropTypes.func.isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
	loadingDelete: PropTypes.bool.isRequired,
};

export default Form.create({ name: 'create-subject' })(FormEditSubject);
