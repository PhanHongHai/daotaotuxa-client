import React from 'react';
import PropTypes from 'prop-types';

import { Pie } from 'react-chartjs-2';
import { color } from '../../../../constands/Other';

const legend = {
	display: true,
	position: 'left',
	fullWidth: true,
};

function ChartPieNonActive(props) {
	const { valueChart } = props;
	const dataChart = {
		labels: ['Học Viên', 'Đối Tác'],
		datasets: [
			{
				data: valueChart,
				backgroundColor: color,
				hoverBackgroundColor: color,
			},
		],
	};

	return (
		<div className=" mt-10" style={{ height: 185 }}>
			<Pie
				data={dataChart}
				legend={legend}
				width={200}
				height={185}
				options={{
					maintainAspectRatio: false,
				}}
			/>
		</div>
	);
}

ChartPieNonActive.propTypes = {
	valueChart: PropTypes.instanceOf(Array).isRequired,
};
export default ChartPieNonActive;
