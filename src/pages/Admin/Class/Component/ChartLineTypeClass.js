import React from 'react';
// import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';

const legend = {
	display: true,
	position: 'bottom',
	fullWidth: true,
};

function ChartLineTypeClass() {
	const dataChart = {
		labels: ['22-3-2020', '23-3-2020', '24-3-2020', '25-3-2020', '26-3-2020', '27-3-2020', '28-3-2020'],
		datasets: [
			{
				label: 'Trung Cấp',
				fill: true,
				lineTension: 0.1,
				backgroundColor: '#83d0c082',
				borderColor: '#48c0a8',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: '#83d0c082',
				pointBackgroundColor: '#48c0a8',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#48c0a8',
				pointHoverBorderColor: '#83d0c082',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [15, 9, 0, 8, 6, 5, 4],
			},
			{
				label: 'Ngắn Hạn',
				fill: true,
				lineTension: 0.1,
				backgroundColor: '#ededed85',
				borderColor: '#d8d8d8',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: '#d8d8d8',
				pointBackgroundColor: '#d8d8d8',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#d8d8d8',
				pointHoverBorderColor: '#ededed85',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [6, 9, 8, 8, 6, 5, 0],
			},
			{
				label: 'Cao Đẳng',
				fill: true,
				lineTension: 0.1,
				backgroundColor: '#ededed85',
				borderColor: '#d8d8d8',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: '#d8d8d8',
				pointBackgroundColor: '#d8d8d8',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#d8d8d8',
				pointHoverBorderColor: '#ededed85',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [6, 9, 8, 8, 6, 5, 0],
			},
			{
				label: 'Đại Học',
				fill: true,
				lineTension: 0.1,
				backgroundColor: '#ededed85',
				borderColor: '#d8d8d8',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: '#d8d8d8',
				pointBackgroundColor: '#d8d8d8',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#d8d8d8',
				pointHoverBorderColor: '#ededed85',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [6, 9, 8, 8, 6, 5, 0],
			},
			{
				label: 'Liên thông',
				fill: true,
				lineTension: 0.1,
				backgroundColor: '#ededed85',
				borderColor: '#d8d8d8',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: '#d8d8d8',
				pointBackgroundColor: '#d8d8d8',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#d8d8d8',
				pointHoverBorderColor: '#ededed85',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [6, 9, 8, 8, 6, 5, 0],
			},
			{
				label: 'Cao Học',
				fill: true,
				lineTension: 0.1,
				backgroundColor: '#ededed85',
				borderColor: '#d8d8d8',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: '#d8d8d8',
				pointBackgroundColor: '#d8d8d8',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#d8d8d8',
				pointHoverBorderColor: '#ededed85',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [6, 9, 8, 8, 6, 5, 0],
			},
		],
	};
	return (
			<div className='chart-container' >
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

// ChartLineTypeClass.propTypes = {
// 	data: PropTypes.instanceOf(Array).isRequired,
// };
export default ChartLineTypeClass;
