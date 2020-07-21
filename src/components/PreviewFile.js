import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import PDFview from 'pdf-viewer-reactjs';

import PDFview from './PdfView';
import { PreviewFileStyle } from '../styles/component.styled';

function PreviewFile(props) {
	const [clientWidth, setClientWidth] = useState(window.document.body.clientWidth);
	useEffect(() => {
		window.addEventListener('contextmenu', e => e.preventDefault(), false);
		const handleSize = () => setClientWidth(window.document.body.clientWidth);
		window.addEventListener('resize', handleSize);
		return () => window.removeEventListener('resize', handleSize);
	}, []);

	const { file, type } = props;

	// const renderFileByType = (url, fileType) => {
	// 	switch (fileType) {
	// 		case 'jpg':
	// 		case 'png':
	// 		case 'jpeg':
	// 			return <Zoom img={file} zoomScale={3} transitionTime={0.5} width={425} height={400} />;
	// 		default:
	// 			return clientWidth <= 425 ? (
	// 				<PDFview
	// 					protectContent
	// 					navbarOnTop
	// 					hideRotation
	// 					maxScale={7}
	// 					css="preview-pdf"
	// 					canvasCss="pdf-container"
	// 					loader={<LoadingCustom margin={40} />}
	// 					document={{
	// 						url,
	// 					}}
	// 				/>
	// 			) : (
	// 				<object data={url} type="application/pdf" width="100%" height="500px">
	// 					<p>Trình duyệt của bạn không thể hiển thị file này!</p>
	// 				</object>
	// 			);
	// 			// <iframe src={url} title="ho so" width="100%" height="500px"></iframe>
	// 	}
	// };
	return (
		<PreviewFileStyle>
			<PDFview src={file} title="" />
		</PreviewFileStyle>
	);
}

PreviewFile.propTypes = {
	file: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default PreviewFile;
