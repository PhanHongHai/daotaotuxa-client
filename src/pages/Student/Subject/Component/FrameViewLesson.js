import React from 'react';
import PropTypes from 'prop-types';
// import PDFview from 'pdf-viewer-reactjs';

import { FrameViewLessonStyle } from '../styled';
// import LoadingCustom from '../../../../components/LoadingCustom';
import fileTest from '../../../../assets/pdf-test.pdf';

function FrameViewLesson(props) {
	const { lesson } = props;

	return (
		<FrameViewLessonStyle>
			<div className="lesson-title">
				<h2> Bài 1 : Giới Thiệu Hệ thống</h2>
			</div>
			{lesson && lesson.url === null ? (
				<div>Chon noi dung</div>
			) : (
				<object data={fileTest} type="application/pdf" width="100%" height="500px">
					<p>Trình duyệt của bạn không thể hiển thị file này!</p>
				</object>
			)}
		</FrameViewLessonStyle>
	);
}

FrameViewLesson.propTypes = {
	lesson: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default FrameViewLesson;
