import React from 'react';
import PropTypes from 'prop-types';

import { Pie } from 'react-chartjs-2';
import { color } from '../../../../constands/Other';

const legend = {
	display: true,
	position: 'bottom',
	fullWidth: true,
};

function ChartPieStudent(props) {
	const {chartData} = props;

	const dataChart = {
		labels: chartData && chartData.labels,
		datasets: [
			{
				data: chartData && chartData.total,
				backgroundColor: color,
				hoverBackgroundColor: color,
			},
		],
	};

	return (
		<div className='chart-container mb-10'>
			<Pie
				data={dataChart}
				legend={legend}
				width={250}
				height={150}
				options={{
					maintainAspectRatio: false,
				}}
			/>
		</div>
	);
}

ChartPieStudent.propTypes = {
	chartData: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ChartPieStudent;
