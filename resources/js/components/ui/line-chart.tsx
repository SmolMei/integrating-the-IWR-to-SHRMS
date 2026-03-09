import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['Q1', 'Q2', 'Q3', 'Q4'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Performance Score',
      font: {
        family: 'Montserrat, sans-serif',
      },
      data: labels.map(() => faker.number.int({ min: 0, max: 5 })),
      borderColor: '#91C383',
      backgroundColor: '#4A7C3C',
    },
  ],
};

export function LineChart() {
  return (
    <div className="mx-auto h-48 w-full sm:h-56 md:h-64">
      <Line options={options} data={data} />
    </div>
  );
}
