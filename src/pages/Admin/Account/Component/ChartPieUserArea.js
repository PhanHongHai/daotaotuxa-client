import React from 'react';
import PropTypes from 'prop-types';

import { Pie } from 'react-chartjs-2';
import { color } from '../../../../constands/Other';

const legend = {
	display: true,
	position: 'left',
	fullWidth: true,
};

function ChartPieUserArea(props) {
	const { dataChart } = props;
	const templateChart = {
		labels: dataChart && dataChart.labels,
		datasets: [
			{
				data: dataChart && dataChart.total,
				backgroundColor: color,
				hoverBackgroundColor: color,
			},
		],
	};

	return (
		<div className="chart-container mb-10">
			<Pie
				data={templateChart}
				legend={legend}
				width={400}
				height={300}
				options={{
					maintainAspectRatio: false,
				}}
			/>
		</div>
	);
}

ChartPieUserArea.propTypes = {
	dataChart: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ChartPieUserArea;
