import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';

const legend = {
	display: true,
	position: 'bottom',
	fullWidth: true,
};

function ChartLineAccount(props) {
	const {data} = props;
	const dataChart = {
		labels: data && data.labels,
		datasets: [
			{
				label: 'Học Viên',
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
				data: data && data.totalStudent,
			},
			{
				label: 'Đối Tác',
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
				data: data && data.totalPartner,
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

ChartLineAccount.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ChartLineAccount;
