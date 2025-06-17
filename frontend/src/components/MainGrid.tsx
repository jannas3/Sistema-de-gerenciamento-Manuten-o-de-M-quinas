import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import HighlightedCard from './HighlightedCard';
import MachinesByStatusChart from './MachinesByStatusChart';
import MaintenanceOverTimeChart from './MaintenanceOverTimeChart';
import StatCard, { StatCardProps } from './StatCard';
import CustomizedDataGrid from './CustomizedDataGrid';

import { getMachines } from '../services/machineService';

export default function MainGrid() {
  const [machinesCount, setMachinesCount] = useState(0);
  const [machinesInactive, setMachinesInactive] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMachines();
      setMachinesCount(data.length);

     const inactives = data.filter(
  (machine: { status: string }) => machine.status !== 'Ativa'
).length;

      setMachinesInactive(inactives);
    };
    fetchData();
  }, []);

  const data: StatCardProps[] = [
    {
      title: 'Máquinas Cadastradas',
      value: machinesCount.toString(),
      interval: 'Total',
      trend: 'up',
      data: [],
    },
    {
      title: 'Máquinas Inativas',
      value: machinesInactive.toString(),
      interval: 'Agora',
      trend: 'down',
      data: [],
    },
    {
      title: 'Total de Manutenções',
      value: '0', // 🚀 Atualizar no futuro com manutenções reais
      interval: 'Total',
      trend: 'neutral',
      data: [],
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Visão Geral das Máquinas
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {data.map((card, index) => (
          <Grid key={index} xs={12} sm={6} lg={3}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid xs={12} sm={6} lg={3}>
          <HighlightedCard />
        </Grid>
        <Grid xs={12} md={6}>
          <MaintenanceOverTimeChart />
        </Grid>
        <Grid xs={12} md={6}>
          <MachinesByStatusChart />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Máquinas Cadastradas
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <CustomizedDataGrid />
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
