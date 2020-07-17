import api from './restful';

const { restful } = api;
const API_URL = process.env.NODE_ENV === 'production' ? 'http://103.130.218.161:9000' : 'http://localhost:9000';

export const apiUploadProfile = () => `${API_URL}/api/v1/profiles/upload`;

export const apiUploadDocument = () => `${API_URL}/api/v1/documents/upload`;

export const apiUploadAvatar = () => `${API_URL}/api/v1/upload-avatar`;

// get info account
export const removeFile = async req => {
	try {
		const res = await restful.PATCH('/api/v1/remove-file', req);
		return res;
	} catch (err) {
		return err;
	}
};
