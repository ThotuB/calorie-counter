import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

interface MacroProps {
	carbs: number;
	fat: number;
	protein: number;
}

const MacroDoughnut = ({ carbs, fat, protein }: MacroProps) => {
	const data = {
		labels: ['Carbs', 'Fat', 'Protein'],
		datasets: [
			{
				data: [carbs, fat, protein],
				backgroundColor: ['#A8F0A8', '#F0F0A8', '#F7A1A1'],
				hoverBackgroundColor: ['#66FF7F', '#FFFF66', '#FF6666'],
			},
		],
	};
	const options = {
		plugins: {
			legend: {
				display: false,
			},
			labels: {
				render: 'value',
				fontSize: 16,
				fontStyle: 'bold',
				fontColor: '#fff',
			}
		},
		cutout: '50%',
		borderColor: '#B8AFE6',
		hoverBorderColor: '#B8AFE6',
		borderJoinStyle: 'round',
		hoverOffset: 10,
		borderWidth: 10,
	};

	ChartJS.register(ArcElement);

	return <Doughnut className="w-36" data={data} options={options} />;
}
export default MacroDoughnut;