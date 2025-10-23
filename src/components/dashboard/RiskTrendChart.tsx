import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Import Filler for area charts
} from 'chart.js';
import type { RiskTrendPoint } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register Filler
);

interface RiskTrendChartProps {
  data: RiskTrendPoint[];
}

const RiskTrendChart: React.FC<RiskTrendChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Average Risk Score',
        data: data.map((d) => d.average_risk_score),
        borderColor: 'rgb(239, 68, 68)', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true, // Fill the area under the line
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Organization Risk Trend (Last 30 Days)',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 1, // Risk score is 0-1
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 h-80">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default RiskTrendChart;