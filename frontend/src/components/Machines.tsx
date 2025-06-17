import { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  getMachines,
  createMachine,
  deleteMachine,
  updateMachine,
  Machine,
} from '../services/machineService';
import MachineForm from './MachineForm';

export default function Machines() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [openForm, setOpenForm] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);

  const fetchMachines = async () => {
    try {
      setLoading(true);
      const data = await getMachines();
      setMachines(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const handleAdd = () => {
    setEditingMachine(null);
    setOpenForm(true);
  };

  const handleEdit = (machine: Machine) => {
    setEditingMachine(machine);
    setOpenForm(true);
  };

  const handleSubmit = async (data: Omit<Machine, 'id' | 'createdAt'>) => {
    if (editingMachine) {
      await updateMachine(editingMachine.id!, data);
    } else {
      await createMachine(data);
    }
    fetchMachines();
  };

  const handleDelete = async (id: number) => {
    await deleteMachine(id);
    fetchMachines();
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'type', headerName: 'Tipo', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'createdAt', headerName: 'Criado em', width: 200 },
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
        Gerenciamento de Máquinas
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>
        Adicionar Máquina
      </Button>
      <DataGrid
        loading={loading}
        rows={machines}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
      <MachineForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        initialData={editingMachine}
      />
    </Box>
  );
}
