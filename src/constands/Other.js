export const BASE_COLOR = '#1bb394';

export const HOST_SERVER =
	process.env.NODE_ENV === 'production' ? 'http://103.130.218.161:9000' : 'http://localhost:9000';

export const trainingType = [
	{
		key: 'HDTNH',
		value: 'Hệ đào tạo ngắn hạn',
	},
	{
		key: 'TC',
		value: 'Trung Cấp',
	},
	{
		key: 'CD',
		value: 'Cao Đẳng',
	},
	{
		key: 'DH',
		value: 'Đại Học',
	},
	{
		key: 'LT',
		value: 'Liên thông',
	},
	{
		key: 'CH',
		value: 'Cao học',
	},
];
export const translateRules = [
	{
		key: 'ACCOUNT_MANAGEMENT',
		name: 'Quản lý tài khoản',
	},
	{
		key: 'CLASS_MANAGEMENT',
		name: 'Quản lý ngành lớp học',
	},
	{
		key: 'SECTOR_MANAGEMENT',
		name: 'Quản lý ngành đào tạo',
	},
	{
		key: 'SUBJECT_MANAGEMENT',
		name: 'Quản lý môn học',
	},
	{
		key: 'RULE_MANAGEMENT',
		name: 'Phân quyền tài khoản',
	},
	{
		key: 'PROFILE_MANAGEMENT',
		name: 'Quản lý hồ sơ học viên',
	},
];
export const color = ['#48c0a8','#7cb9ca', '#83d0c0', '#e2e2e2', '#ededed', '#69b8cb', '#9cdacd', '#a3e1d4', '#b5b8cf'];

export const scheduleTitle = [
	{
		key: 'GK',
		value: 'Kiểm tra giữa kỳ',
	},
	{
		key: 'CK',
		value: 'Kiểm tra cuối kỳ',
	},
	{
		key: 'KT',
		value: 'Kiểm tra ',
	},
];

export const localeVI = {
	lang: {
		locale: 'vi',
		placeholder: 'Chọn ngày',
		rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
		today: 'Hôm nay',
		now: 'bây giờ',
		backToToday: 'Quay lại hôm nay',
		ok: 'Ok',
		clear: 'Làm mới',
		month: 'Tháng',
		year: 'Năm',
		timeSelect: 'Chọn thời gian',
		dateSelect: 'Chọn ngày',
		monthSelect: 'Chọn một tháng',
		yearSelect: 'Chọn một năm',
		decadeSelect: 'Chọn một thập kỷ',
		yearFormat: 'YYYY',
		dateFormat: 'DD/MM/YYYY',
		dayFormat: 'DD',
		dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
		monthFormat: 'MM',
		monthBeforeYear: true,
		previousMonth: 'Tháng trước',
		nextMonth: 'Tháng tiếp theo',
		previousYear: 'Năm trước (Control + left)',
		nextYear: 'Năm tiếp theo (Control + right)',
		previousDecade: 'Thập kỷ trước',
		nextDecade: 'Thập kỷ tiếp theo',
		previousCentury: 'Thế kỷ trước',
		nextCentury: 'Thế kỷ tiếp theo',
	},
	timePickerLocale: {
		placeholder: 'Chọn giờ',
	},
	dateFormat: 'DD/MM/YYYY',
	dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
	weekFormat: 'wo/YYYY',
	monthFormat: 'MM/YYYY',
};
