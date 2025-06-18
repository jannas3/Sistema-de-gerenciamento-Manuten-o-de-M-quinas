import { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import {
  getMaintenances,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
  Maintenance,
} from '../services/maintenanceService';

import { getMachines, Machine } from '../services/machineService';

import MaintenanceForm from './MaintenanceForm';

export default function Maintenances() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [openForm, setOpenForm] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState<Maintenance | null>(null);

  const [machines, setMachines] = useState<Machine[]>([]);

  const fetchMaintenances = async () => {
    setLoading(true);
    const data = await getMaintenances();
    setMaintenances(data);
    setLoading(false);
  };

  const fetchMachines = async () => {
    const data = await getMachines();
    setMachines(data);
  };

  useEffect(() => {
    fetchMaintenances();
    fetchMachines();
  }, []);

  const handleAdd = () => {
    setEditingMaintenance(null);
    setOpenForm(true);
  };

  const handleEdit = (maintenance: Maintenance) => {
    setEditingMaintenance(maintenance);
    setOpenForm(true);
  };

  const handleSubmit = async (data: Omit<Maintenance, 'id'>) => {
    if (editingMaintenance) {
      await updateMaintenance(editingMaintenance.id!, data);
    } else {
      await createMaintenance(data);
    }
    fetchMaintenances();
    setOpenForm(false);
  };

  const handleDelete = async (id: number) => {
    await deleteMaintenance(id);
    fetchMaintenances();
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'description', headerName: 'Descrição', width: 200 },
    {
      field: 'date',
      headerName: 'Data',
      width: 150,
      valueGetter: (params) =>
        params?.row?.date ? new Date(params.row.date).toLocaleDateString() : 'Sem data',
    },
    {
      field: 'machineId',
      headerName: 'Máquina',
      width: 220,
      valueGetter: (params) => {
        const machineId = params?.row?.machineId;
        if (!machineId) return 'Sem máquina vinculada';

        const machine = machines.find((m) => m.id === machineId);
        return machine ? `${machine.nome} (${machine.tipo})` : 'Máquina não encontrada';
      },
    },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Deletar
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Manutenções
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>
        Adicionar Manutenção
      </Button>
      <DataGrid
        loading={loading}
        rows={maintenances}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <MaintenanceForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        initialData={editingMaintenance}
      />
    </Box>
  );
}
