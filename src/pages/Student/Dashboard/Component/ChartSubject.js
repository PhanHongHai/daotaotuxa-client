import React from 'react';
// import PropTypes from 'prop-types';
import { Radar } from 'react-chartjs-2';

const data = {
	labels: ['Anh văn', 'Toán cao cấp', 'Vật lý đại cương', 'Lập trình mạng', 'Lập trình web', 'Hệ thống thông tin'],
	datasets: [
		{
			label: 'Giữa Kỳ',
			backgroundColor: 'rgba(179,181,198,0.2)',
			borderColor: 'rgba(179,181,198,1)',
			pointBackgroundColor: 'rgba(179,181,198,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(179,181,198,1)',
			data: [7,5,8,9,6,8],
		},
		{
			label: 'Cuối Kỳ',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			pointBackgroundColor: 'rgba(255,99,132,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(255,99,132,1)',
			data: [8, 4, 7, 9, 6, 7, 10],
		},
	],
};
const legend = {
	display: true,
	position: 'bottom',
	fullWidth: true,
};

function ChartSubject() {
//  const {data, labels,} =props;
	return (
		<div style={{ height: '400px' }}>
			<Radar
				data={data}
				legend={legend}
				width={400}
				height={400}
				options={{
					maintainAspectRatio: false,
				}}
			/>
		</div>
	);
}

// ChartSubject.propTypes = {
//   data:PropTypes.instanceOf(Array).isRequired,
// };

export default ChartSubject;
