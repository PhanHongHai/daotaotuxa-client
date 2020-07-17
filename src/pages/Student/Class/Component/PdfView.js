import React, { useRef, useState, useEffect, useCallback } from 'react';
import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';
import _ from 'lodash';

import LoadingCustom from '../../../../components/LoadingCustom';
import { PDFview } from '../../../../styles/component.styled';
import customMess from '../../../../utils/customMessage';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function PdfView(props) {
	const { src, title, detailProgress, updateReq, lessonID, infoSubject, type } = props;
	const [pdf, setPDF] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [scale, setScale] = useState(1);
	const [numPages, setNumPages] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const canvasRef = useRef();

	const renderPage = useCallback(async ({ pdfDoc, pageNum, scaleIn }) => {
		const page = await pdfDoc.getPage(pageNum);

		const ctx = canvasRef.current.getContext('2d');

		const viewport = page.getViewport({ scale: scaleIn });

		canvasRef.current.width = viewport.width;
		canvasRef.current.height = viewport.height;

		page.render({
			canvasContext: ctx,
			viewport,
		});
	}, []);

	const prevPage = () => {
		if (currentPage > 1) {
			renderPage({ pdfDoc: pdf, pageNum: currentPage - 1, scaleIn: scale });
			setCurrentPage(currentPage - 1);
		}
	};

	const nextPage = () => {
		if (currentPage < numPages) {
			renderPage({ pdfDoc: pdf, pageNum: currentPage + 1, scaleIn: scale });
			setCurrentPage(currentPage + 1);
			if (currentPage === numPages) {
				if (type && type === 'lesson') {
					if (detailProgress && !_.isEmpty(detailProgress)) {
						const lessonExist = detailProgress.documents.find(ele => ele._id === lessonID);
						if (!lessonExist) {
							const arrDocumentID = detailProgress.documents.forEach(ele => ele._id);
							arrDocumentID.push(lessonID);
							updateReq({
								req: {
									subjectID: detailProgress && detailProgress.subjectID,
									documents: arrDocumentID,
									progress:
										infoSubject && infoSubject.countLesson
											? Math.round((arrDocumentID.length / infoSubject.countLesson) * 100)
											: 0,
								},
								cb: res => {
									if (res && res.isProcess) customMess('message', 'success', res.msg);
								},
							});
						}
					} else {
						updateReq({
							req: {
								subjectID: infoSubject.subject && infoSubject.subject._id,
								documents: [lessonID],
								progress: infoSubject && infoSubject.countLesson ? Math.round((1 / infoSubject.countLesson) * 100) : 0,
							},
							cb: res => {
								if (res && res.isProcess) customMess('message', 'success', res.msg);
							},
						});
					}
				}
			}
		}
	};

	const zoomOut = () => {
		renderPage({ pdfDoc: pdf, pageNum: currentPage, scaleIn: scale - 0.1 });
		setScale(scale - 0.1);
	};

	const zoomIn = () => {
		renderPage({ pdfDoc: pdf, pageNum: currentPage, scaleIn: scale + 0.1 });
		setScale(scale + 0.1);
	};

	useEffect(() => {
		const fetchPdf = async () => {
			const loadingTask = pdfjs.getDocument(src);

			const pdfDoc = await loadingTask.promise;

			setPDF(pdfDoc);
			// eslint-disable-next-line no-underscore-dangle
			setNumPages(pdfDoc._pdfInfo.numPages);

			renderPage({ pdfDoc, pageNum: 1, scaleIn: 1 });

			setLoaded(true);
		};
		const checkAndUpdateProgress = async () => {
			const loadingTask = pdfjs.getDocument(src);
			const pdfDoc = await loadingTask.promise;
			// eslint-disable-next-line no-underscore-dangle
			if (pdfDoc._pdfInfo.numPages === 1) {
				if (type && type === 'lesson') {
					if (detailProgress && !_.isEmpty(detailProgress)) {
						const lessonExist = detailProgress.documents.find(ele => ele._id === lessonID);
						if (!lessonExist) {
							const arrDocumentID = detailProgress.documents.forEach(ele => ele._id);
							arrDocumentID.push(lessonID);
							updateReq({
								req: {
									subjectID: detailProgress && detailProgress.subjectID,
									documents: arrDocumentID,
									progress:
										infoSubject && infoSubject.countLesson
											? Math.round((arrDocumentID.length / infoSubject.countLesson) * 100)
											: 0,
								},
								cb: res => {
									if (res && res.isProcess) customMess('message', 'success', res.msg);
								},
							});
						}
					} else {
						updateReq({
							req: {
								subjectID: infoSubject.subject && infoSubject.subject._id,
								documents: [lessonID],
								progress: infoSubject && infoSubject.countLesson ? Math.round((1 / infoSubject.countLesson) * 100) : 0,
							},
							cb: res => {
								if (res && res.isProcess) customMess('message', 'success', res.msg);
							},
						});
					}
				}
			}
		};
		fetchPdf();
		checkAndUpdateProgress();
	}, [renderPage, src, detailProgress, updateReq, lessonID, type]);

	return (
		<PDFview>
			<div className="pdf-container">
				{loaded ? (
					<div className="pdf-menu-bar">
						<Row gutter={16}>
							<Col xs={24} md={6}>
								<h3 className="title">{title} </h3>
							</Col>
							<Col xs={12} md={12}>
								<div className="page">
									<Button
										className="btn-cancel"
										disabled={currentPage && currentPage === 1}
										icon="step-backward"
										onClick={prevPage}
									/>
									<div className="pagination ml-10 mr-10">
										Trang {currentPage} / {numPages}
									</div>
									<Button
										className="btn-cancel"
										icon="step-forward"
										disabled={currentPage && currentPage === numPages}
										onClick={nextPage}
									/>
								</div>
							</Col>
							<Col xs={12} md={6}>
								<div className="zoom">
									<Button
										className="btn-cancel mr-5"
										icon="zoom-out"
										disabled={scale && scale < 0.8}
										onClick={zoomOut}
									/>
									<Button className="btn-cancel  ml-5 " icon="zoom-in" disabled={scale && scale > 4} onClick={zoomIn} />
								</div>
							</Col>
						</Row>
					</div>
				) : (
					<LoadingCustom margin={50} />
				)}
				<div className="canvas-container">
					<div>
						<canvas ref={canvasRef} />
					</div>
				</div>
			</div>
		</PDFview>
	);
}

PdfView.propTypes = {
	lessonID: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	infoSubject: PropTypes.objectOf(PropTypes.any).isRequired,
	detailProgress: PropTypes.objectOf(PropTypes.any).isRequired,
	updateReq: PropTypes.func.isRequired,
};

export default PdfView;
