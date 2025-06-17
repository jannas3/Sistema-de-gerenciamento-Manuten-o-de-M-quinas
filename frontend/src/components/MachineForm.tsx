import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Machine } from '../services/machineService';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Machine, 'id' | 'createdAt'>) => void;
  initialData?: Machine | null;
}

export default function MachineForm({ open, onClose, onSubmit, initialData }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('Ativa');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
      setStatus(initialData.status);
    } else {
      setName('');
      setType('');
      setStatus('Ativa');
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({ name, type, status });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Editar Máquina' : 'Cadastrar Máquina'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 1 }}>
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Tipo"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            required
          />
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
