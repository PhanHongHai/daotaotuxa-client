import styled from 'styled-components';

import { BASE_COLOR } from '../../../constands/Other';

export const PostItemStyle = styled.div`
	padding: 1em 1em;
	border-bottom: 1px solid #f1eded;
	.info-account {
		display: inline-flex;
		align-items: center;
		.info-default {
			display: inline-flex;
			flex-direction: column;
			margin: 1em 0 0 1em;
			p {
				color: black !important;
				font-size: 15px !important;
			}
		}
	}
	.post-content {
		h2 {
			font-size: 19px !important;
		}
	}
	.post-comment {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-top: 1em;
		h3 {
			margin: 0 !important;
		}
	}
`;

export const DetailPostStyle = styled.div`
	.card-no-head {
		.ant-card-head {
			border-bottom: unset !important;
			.ant-card-head-title {
				padding: 10px 0 0 0 !important;
			}
			.ant-card-extra {
				position: absolute;
				top: -1%;
				right: 3%;
			}
		}
		.ant-card-body {
			padding: 0 24px !important;
		}
	}
	.info-user {
		display: flex;
		ul {
			padding-left: 0.5em !important;
			li {
				list-style: none;
				margin-left: 5px;
			}
		}
	}
	.post-content {
		text-align: justify;
		color: black !important;
	}
	.post-action {
		ul {
			padding: 0 !important;
			li {
				list-style: none;
				display: inline-block;
				&:last-child {
					margin-left: 10px;
				}
				button {
					border-color: black !important;
					color: black;
					height: 35px !important;
					&:focus,
					&:hover {
						border-color: ${BASE_COLOR} !important;
					}
				}
			}
		}
	}
	.collapse-message {
		background-color: transparent !important;
		.ant-comment-inner {
			padding: 0 !important;
		}
	}
	.comment-text {
		color: black !important;
		text-align: justify;
	}
	.ant-comment-content-author-name{
		color:black !important;
	}
	.ant-comment-content-author-time{
		color:rgba(140, 136, 136, 0.85) !important;
	}
`;

export const something = styled.div``;
