import api from './api';

export interface Maintenance {
  id?: number;
  description: string;
  date: string;
  status: string;
  machineId: number;
}

export const getMaintenances = async () => {
  const response = await api.get<Maintenance[]>('/maintenances');
  return response.data;
};

export const createMaintenance = async (data: Omit<Maintenance, 'id'>) => {
  const response = await api.post('/maintenances', data);
  return response.data;
};

export const updateMaintenance = async (id: number, data: Omit<Maintenance, 'id'>) => {
  const response = await api.put(`/maintenances/${id}`, data);
  return response.data;
};

export const deleteMaintenance = async (id: number) => {
  const response = await api.delete(`/maintenances/${id}`);
  return response.data;
};
