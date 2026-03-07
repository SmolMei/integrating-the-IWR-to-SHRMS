import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '62%',
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Risk Score',
      font: {
        family: 'Montserrat, sans-serif',
      },
    },
  },
};

export const data = {
  labels: ['Low Risk', 'High Risk'],
  datasets: [
    {
      label: 'Performance Data',
      data: [70, 30],
      backgroundColor: [
        '#4A7C3C',
        '#EE4B2B',
      ],
      borderColor: [
        '#345A2A',
        '#EE4B2B',
      ],
      borderWidth: 1,
    },
  ],
};

/**
 * A doughnut chart component.
 *
 * @returns {JSX.Element} A JSX element representing the doughnut chart.
 */
export function DoughnutChart() {
  return (
    <div className="relative mx-auto h-56 w-full max-w-xs sm:h-64 sm:max-w-sm md:h-72 md:max-w-md lg:h-80 lg:max-w-lg">
      <Doughnut options={options} data={data} />
    </div>
  );
}
