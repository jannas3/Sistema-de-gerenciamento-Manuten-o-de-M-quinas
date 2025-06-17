import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { getMachines } from '../services/machineService';

export default function MachinesByStatusChart() {
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMachines();
      const counts = data.reduce((acc: any, curr: any) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});
      setStatusCounts(counts);
    };
    fetchData();
  }, []);

  const labels = Object.keys(statusCounts);
  const values = Object.values(statusCounts);

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: labels }]}
      series={[{ data: values, label: 'Máquinas' }]}
      width={500}
      height={300}
    />
  );
}
