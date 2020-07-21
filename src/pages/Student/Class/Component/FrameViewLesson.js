import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import _ from 'lodash';

import { FrameViewLessonStyle } from '../styled';
// import LoadingCustom from '../../../../components/LoadingCustom';

import { HOST_SERVER } from '../../../../constands/Other';
import PDFview from './PdfView';

function FrameViewLesson(props) {
	const { lesson, loadingCreateProgress, detailProgress, createSubjectProgressReq, infoSubject } = props;

	return (
		<FrameViewLessonStyle>
			{/* <div className="lesson-title">
				<h2> Bài 1 : Giới Thiệu Hệ thống</h2>
			</div>
			{lesson && lesson.url === null ? (
				<div>Chon noi dung</div>
			) : (
				<object data={fileTest} type="application/pdf" width="100%" height="500px">
					<p>Trình duyệt của bạn không thể hiển thị file này!</p>
				</object>
			)} */}
			{lesson && _.isEmpty(lesson) ? (
				<div style={{ height: '650px', display: 'flex', alignItems: 'center' }}>
					<Icon type="file-pdf" style={{ fontSize: 30 }} />
					<h1 style={{ color: 'silver', margin:'5px 0 0 10px' }}>Xin hãy chọn nội dung muốn xem</h1>
				</div>
			) : (
				// <PDFview
				// 	protectContent
				// 	navbarOnTop
				// 	hideRotation
				// 	maxScale={7}
				// 	css="preview-pdf"
				// 	canvasCss="pdf-container"
				// 	loader={<LoadingCustom margin={40} />}
				// 	document={{
				// 		url: `${HOST_SERVER}/${lesson}`,
				// 	}}
				// />
				<PDFview
					title={lesson && lesson.title}
					src={`${HOST_SERVER}/${lesson.url}`}
					detailProgress={detailProgress}
					updateReq={createSubjectProgressReq}
					lessonID={lesson && lesson._id}
					infoSubject={infoSubject}
					type={lesson && lesson.type}
				/>
			)}
		</FrameViewLessonStyle>
	);
}

FrameViewLesson.propTypes = {
	infoSubject: PropTypes.objectOf(PropTypes.any).isRequired,
	lesson: PropTypes.objectOf(PropTypes.any).isRequired,
	detailProgress: PropTypes.objectOf(PropTypes.any).isRequired,
	loadingCreateProgress: PropTypes.bool.isRequired,
	createSubjectProgressReq: PropTypes.func.isRequired,
};

export default FrameViewLesson;
