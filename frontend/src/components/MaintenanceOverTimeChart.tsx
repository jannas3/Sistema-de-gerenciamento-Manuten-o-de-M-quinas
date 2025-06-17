import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function MaintenanceOverTimeChart() {
  const days = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = [2, 3, 4, 6, 5, 3]; // Dados simulados

  return (
    <LineChart
      xAxis={[{ scaleType: 'point', data: days }]}
      series={[{ data, label: 'Manutenções' }]}
      width={500}
      height={300}
    />
  );
}
