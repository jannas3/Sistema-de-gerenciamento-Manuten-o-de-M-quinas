import api from './api';

export interface Machine {
  id?: number;
  name: string;
  type: string;
  status: string;
  createdAt?: string;
}

// Listar todas as máquinas
export const getMachines = async () => {
  const response = await api.get<Machine[]>('/machines');
  return response.data;
};

// Criar uma máquina
export const createMachine = async (data: Omit<Machine, 'id' | 'createdAt'>) => {
  const response = await api.post('/machines', data);
  return response.data;
};

// Buscar por ID
export const getMachineById = async (id: number) => {
  const response = await api.get<Machine>(`/machines/${id}`);
  return response.data;
};

// Atualizar
export const updateMachine = async (id: number, data: Omit<Machine, 'id' | 'createdAt'>) => {
  const response = await api.put(`/machines/${id}`, data);
  return response.data;
};

// Deletar
export const deleteMachine = async (id: number) => {
  const response = await api.delete(`/machines/${id}`);
  return response.data;
};
