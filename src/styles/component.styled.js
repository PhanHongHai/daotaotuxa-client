import styled from 'styled-components';

import bg from '../assets/images/texture.png';
import shadow from '../assets/images/shadow.png';

// ##### preview file
export const PreviewFileStyle = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	.preview-pdf {
		width: 100%;
		.box {
			border-radius: unset !important;
		}
		.pdf-container {
			overflow: auto;
			height: 450px;
			max-height: 450px;
			canvas {
				transition: transform 0.25s, visibility 0.25s ease-in;
			}
		}
	}
	@media only screen and (max-width: 425px) {
		.preview-pdf {
			.columns.is-gapless {
				display: flex;
				justify-content: center;
				align-item: center;
				.buttons {
					flex-wrap: unset !important;
					.is-black {
						font-size: 6px !important;
					}
				}
			}
			.pdf-container {
				max-width: 100%;
				height: 450px;
				max-height: 450px;
			}
		}
	}
`;

export const PDFview = styled.div`
	width: 100%;
	.pdf-container {
		width: 100%;
		.pdf-menu-bar {
			width: 100%;
			padding: 15px;
			position: relative;
			box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05),
				0 1px 0 rgba(0, 0, 0, 0.15), 0 1px 1px rgba(0, 0, 0, 0.1);
			background-color: rgba(71, 71, 71, 1);
			background-image: url(${bg}), linear-gradient(rgba(82, 82, 82, 0.99), rgba(69, 69, 69, 0.95));
			.title {
				color: #fff;
			}
			.page {
				display: flex;
				align-items: center;
				justify-content: center;
				.pagination {
					color: #fff;
				}
			}
			.zoom {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
		.canvas-container {
			background-color: #494949;
			padding: 1.5em 0;
			height: 650px;
			overflow: auto;
			user-select: none;
			canvas {
				display: block;
				direction: ltr;
				position: relative;
				overflow: visible;
				border: 9px solid transparent;
				margin: 0 auto -8px auto;
				background-clip: content-box;
				background-color: rgba(255, 255, 255, 1);
				border-image: url(${shadow}) 9 9 repeat;
			}
		}
	}
`;

export const Test = styled.div``;
