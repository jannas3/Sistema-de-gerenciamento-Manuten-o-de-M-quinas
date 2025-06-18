import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Maintenance } from '../services/maintenanceService';
import { getMachines, Machine } from '../services/machineService';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Maintenance, 'id'>) => void;
  initialData?: Maintenance | null;
}

const statuses = ['PENDENTE', 'MANUTENCAO', 'CONCLUIDA'];

export default function MaintenanceForm({ open, onClose, onSubmit, initialData }: Props) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('PENDENTE');
  const [machineId, setMachineId] = useState<number | ''>('');

  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const fetchMachines = async () => {
      const data = await getMachines();
      setMachines(data);
    };
    fetchMachines();
  }, []);

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description);
      setDate(initialData.date.slice(0, 10));
      setStatus(initialData.status);
      setMachineId(initialData.machineId);
    } else {
      setDescription('');
      setDate('');
      setStatus('PENDENTE');
      setMachineId('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!description || !date || !status || !machineId) {
      alert('Preencha todos os campos.');
      return;
    }
    onSubmit({ description, date, status, machineId: Number(machineId) });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Editar Manutenção' : 'Cadastrar Manutenção'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} sx={{ mt: 1 }}>
          <TextField
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Data"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth required>
            <InputLabel>Máquina</InputLabel>
            <Select
              value={machineId}
              label="Máquina"
              onChange={(e) => setMachineId(Number(e.target.value))}
            >
              {machines.map((machine) => (
                <MenuItem key={machine.id} value={machine.id}>
                  {machine.nome} - {machine.tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialData ? 'Salvar' : 'Cadastrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
