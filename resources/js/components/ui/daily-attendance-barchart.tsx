import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Attendance Data',
      font: {
        family: 'Montserrat, sans-serif',
      },
    },
  },
};

export const data = {
  labels: ['Late', 'Absentees', 'On leave', 'Present'],
  datasets: [
    {
      label: 'Daily Logs',
      data: [10, 50, 30, 90],
      backgroundColor: [
        '#C89C3D',
        '#FF0056',
        '#808080',
        '#4A7C3C',
      ],
    },
  ],
};

export function DailyAttendanceBarChart() {
  return (
    <div className="mx-auto h-64 w-full sm:h-72 md:h-80">
      <Bar options={options} data={data} />
    </div>
  );
}