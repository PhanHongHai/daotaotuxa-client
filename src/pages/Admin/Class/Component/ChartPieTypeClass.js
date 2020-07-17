import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Typography } from 'antd';
import { Pie } from 'react-chartjs-2';
import { color } from '../../../../constands/Other';

const legend = {
	display: true,
	position: 'left',
	fullWidth: true,
};

const { Title } = Typography;

function ChartPieTypeClass(props) {
	const { dataChart } = props;
	const templateData = {
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
			{dataChart && dataChart.total.length > 0 ? (
				<Pie
					data={templateData}
					legend={legend}
					width={400}
					height={300}
					options={{
						maintainAspectRatio: false,
					}}
				/>
			) : (
				<div
					style={{
						textAlign: 'center',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Icon type="frown" style={{ fontSize: 35 }} />
					<Title style={{ color: 'silver' }} level={4}>
						Không có dữ liệu
					</Title>
				</div>
			)}
		</div>
	);
}

ChartPieTypeClass.propTypes = {
	dataChart: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ChartPieTypeClass;
