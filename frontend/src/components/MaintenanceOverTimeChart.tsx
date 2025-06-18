import * as React from 'react';
import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { getMaintenances } from '../services/maintenanceService';

export default function MaintenanceOverTimeChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [data, setData] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    const fetchData = async () => {
      const maintenances = await getMaintenances();

      const counts = Array(12).fill(0);

      maintenances.forEach((m: { date: string }) => {
        const month = new Date(m.date).getMonth(); // 0 = Jan, 11 = Dec
        counts[month]++;
      });

      setData(counts);
    };

    fetchData();
  }, []);

  return (
    <LineChart
      xAxis={[{ scaleType: 'point', data: months }]}
      series={[{ data, label: 'Manutenções' }]}
      width={600}
      height={300}
    />
  );
}
