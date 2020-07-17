import React from 'react';
import PropTypes from 'prop-types';

import { Pie } from 'react-chartjs-2';
import { color } from '../../../../constands/Other';

const legend = {
	display: true,
	position: 'left',
	fullWidth: true,
};

function ChartPieUserSex(props) {
  const {data} = props;
	const dataChart = {
		labels: ['Nam', 'Nữ'],
		datasets: [
			{
				data,
				backgroundColor: color,
				hoverBackgroundColor: color,
			},
		],
	};

	return (
		<div className="chart-container mb-10">
			<Pie
				data={dataChart}
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

ChartPieUserSex.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};
export default ChartPieUserSex;
