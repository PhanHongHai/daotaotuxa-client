import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const legend = {
	display: true,
	position: 'bottom',
	fullWidth: true,
};

function ChartBarStudent(props) {
	const { chartData } = props;
	const templateChartData = {
		labels: [
			'Tháng 1',
			'Tháng 2',
			'Tháng 3',
			'Tháng 4',
			'Tháng 5',
			'Tháng 6',
			'Tháng 7',
			'Tháng 8',
			'Tháng 9',
			'Tháng 10',
			'Tháng 11',
			'Tháng 12',
		],
		datasets: [
			{
				label: 'Tổng học viên',
				backgroundColor: '#9cdacd',
				borderColor: '#9cdacd',
				borderWidth: 1,
				hoverBackgroundColor: '#9cdacd',
				hoverBorderColor: '#9cdacd',
				data: chartData,
			},
		],
	};
	return (
		<div className="chart-container">
			<Bar
				data={templateChartData}
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
ChartBarStudent.propTypes = {
	chartData: PropTypes.instanceOf(Array).isRequired,
};

export default ChartBarStudent;
