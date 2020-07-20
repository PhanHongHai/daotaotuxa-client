import React from 'react';
import PropTypes from 'prop-types';

import { Doughnut } from 'react-chartjs-2';
// import { color } from '../../../../constands/Other';

const legend = {
	display: true,
	position: 'left',
	fullWidth: true,
};

function ChartDoughnutAccount(props) {
	const { data } = props;
	const dataChart = {
		labels: ['Đã Tạo', 'Chưa Kích hoạt'],
		datasets: [
			{
				data,
				backgroundColor: ['#a3e1d4', '#b5b8cf'],
				hoverBackgroundColor: ['#a3e1d4', '#b5b8cf'],
			},
		],
	};

	return (
		<div className="chart-container mb-10">
			<Doughnut
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

ChartDoughnutAccount.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};
export default ChartDoughnutAccount;
