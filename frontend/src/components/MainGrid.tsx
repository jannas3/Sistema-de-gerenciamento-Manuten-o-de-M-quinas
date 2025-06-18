import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
  const [machinesActive, setMachinesActive] = useState(0);
  const [machinesInactive, setMachinesInactive] = useState(0);
  const [machinesPending, setMachinesPending] = useState(0);
  const [machinesMaintenance, setMachinesMaintenance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMachines();
      setMachinesCount(data.length);

      setMachinesActive(
        data.filter((machine: { status: string }) => machine.status === 'ATIVA').length
      );

      setMachinesInactive(
        data.filter((machine: { status: string }) => machine.status === 'INATIVA').length
      );

      setMachinesPending(
        data.filter((machine: { status: string }) => machine.status === 'PENDENTE').length
      );

      setMachinesMaintenance(
        data.filter((machine: { status: string }) => machine.status === 'MANUTENCAO').length
      );
    };

    fetchData();
  }, []);

  const cards: StatCardProps[] = [
    {
      title: 'Máquinas Cadastradas',
      value: machinesCount.toString(),
      interval: 'Total',
      trend: 'up',
      data: [],
    },
    {
      title: 'Ativas',
      value: machinesActive.toString(),
      interval: 'Agora',
      trend: 'up',
      data: [],
    },
    {
      title: 'Inativas',
      value: machinesInactive.toString(),
      interval: 'Agora',
      trend: 'down',
      data: [],
    },
    {
      title: 'Pendentes',
      value: machinesPending.toString(),
      interval: 'Agora',
      trend: 'neutral',
      data: [],
    },
    {
      title: 'Em Manutenção',
      value: machinesMaintenance.toString(),
      interval: 'Agora',
      trend: 'neutral',
      data: [],
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, mx: 'auto' }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Visão Geral das Máquinas
      </Typography>

      {/* ✅ Cards */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {cards.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} md={3} lg={2.4}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={3} lg={2.4}>
          <HighlightedCard />
        </Grid>
      </Grid>

      {/* ✅ Gráficos */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <MaintenanceOverTimeChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <MachinesByStatusChart />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Máquinas Cadastradas
      </Typography>

      {/* ✅ DataGrid */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomizedDataGrid />
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
