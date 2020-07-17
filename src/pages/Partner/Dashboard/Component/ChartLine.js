import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';

import { color } from '../../../../constands/Other';

const legend = {
	display: true,
	position: 'bottom',
	fullWidth: true,
};

function ChartLineStudent(props) {
	const { chartData } = props;
	const dataChart = {
		labels: chartData && chartData.labels,
		datasets: [
			{
				label: 'Tạo',
				fill: true,
				lineTension: 0.1,
				backgroundColor: color[0],
				borderColor: color[0],
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: color[0],
				pointBackgroundColor: color[0],
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: color[0],
				pointHoverBorderColor: color[0],
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: chartData && chartData.totalAccountStudent,
			},
			{
				label: 'Xác thực',
				fill: true,
				lineTension: 0.1,
				backgroundColor: color[1],
				borderColor: color[1],
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: color[1],
				pointBackgroundColor: color[1],
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: color[1],
				pointHoverBorderColor: color[1],
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: chartData && chartData.totalAccountStudentActived,
			},
			{
				label: 'Duyệt',
				fill: true,
				lineTension: 0.1,
				backgroundColor: color[2],
				borderColor: color[2],
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: color[2],
				pointBackgroundColor: color[2],
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBorderColor: color[2],
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: chartData && chartData.totalAccountApproved,
			},
		],
	};
	return (
		<div style={{ height: '300px' }}>
			<Line
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

ChartLineStudent.propTypes = {
	chartData: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ChartLineStudent;
