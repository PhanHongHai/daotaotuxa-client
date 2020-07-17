import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';

function CkeditorUpdateContent(props) {
	const { onChange, content } = props;
	return (
		<div className="phh-ckeditor">
			<CKEditor
				editor={ClassicEditor}
				onChange={onChange}
				data={content}
				config={{
					language: 'vi',
					toolbar: {
						items: [
							'heading',
							'|',
							'bold',
							'italic',
							'|',
							'link',
							'blockQuote',
							'|',
							'bulletedList',
							'numberedList',
							'|',
							'alignment',
							'insertTable',
							'|',
							'undo',
							'redo',
						],
					},
				}}
			/>
		</div>
	);
}

CkeditorUpdateContent.propTypes = {
	onChange: PropTypes.func.isRequired,
	content: PropTypes.string.isRequired,
};

export default CkeditorUpdateContent;
