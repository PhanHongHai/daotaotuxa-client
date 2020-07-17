/* eslint-disable no-param-reassign */
const { override, fixBabelImports, addLessLoader,  } = require('customize-cra');

const enableRequireEnsure = () => config => {

	config.output.globalObject = 'this';
	
	config.module.rules[0].parser.requireEnsure = true;
	return config;
};

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			'@primary-color': '#3266C6',
			'@input-height-base': '40px',
			'@input-height-lg': '50px',
			'@btn-height-base': '40px',
			'@btn-height-lg': '50px',
			'@radio-size': '20px',
			'@tree-title-height': '30px',
			'@tree-child-padding': '20px',
			'@font-family': 'poppins',
			'@menu-dark-bg': '@primary-color',
			'@menu-dark-item-active-bg': '@primary-color',
			'@menu-item-active-bg': 'none',
			'@text-color': '#A8A8A8',
		},
	}),
	enableRequireEnsure(),
);
