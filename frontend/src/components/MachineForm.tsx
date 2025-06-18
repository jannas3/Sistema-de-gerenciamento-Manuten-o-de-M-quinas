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
import { useState, useEffect } from 'react';
import { Machine } from '../services/machineService';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Machine, 'id' | 'createdAt'>) => void;
  initialData?: Machine | null;
}

const machineTypes = ['PC', 'LAPTOP', 'SERVIDOR', 'IMPRESSORA', 'SCANNER', 'OUTRO'];
const statuses = ['ATIVA', 'PENDENTE', 'INATIVA', 'MANUTENCAO'];

export default function MachineForm({ open, onClose, onSubmit, initialData }: Props) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [status, setStatus] = useState('ATIVA');

  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome);
      setTipo(initialData.tipo);
      setStatus(initialData.status);
    } else {
      setNome('');
      setTipo('');
      setStatus('ATIVA');
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!nome || !tipo || !status) {
      alert('Preencha todos os campos.');
      return;
    }
    onSubmit({ nome, tipo, status });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Editar Máquina' : 'Cadastrar Máquina'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} sx={{ mt: 1 }}>
          <TextField
            label="Nome da Máquina"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel>Tipo</InputLabel>
            <Select
              value={tipo}
              label="Tipo"
              onChange={(e) => setTipo(e.target.value)}
            >
              {machineTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
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
