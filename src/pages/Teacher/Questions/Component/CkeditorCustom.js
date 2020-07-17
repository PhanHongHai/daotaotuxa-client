import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';

function CkeditorCustom(props) {
	const { onChange } = props;
	return (
		<div className="phh-ckeditor">
			<CKEditor
				editor={ClassicEditor}
				onChange={onChange}
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
							'redo'
						]
					},
				}}
			/>
		</div>
	);
}

CkeditorCustom.propTypes = {
	onChange: PropTypes.func.isRequired,
};

export default CkeditorCustom;
