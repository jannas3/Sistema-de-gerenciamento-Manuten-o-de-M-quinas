import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getMachines } from '../services/machineService';

export default function CustomizedDataGrid() {
  const [rows, setRows] = useState([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'type', headerName: 'Tipo', width: 150 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'createdAt', headerName: 'Cadastrado em', width: 180 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMachines();
      const formatted = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        status: item.status,
        createdAt: new Date(item.createdAt).toLocaleDateString(),
      }));
      setRows(formatted);
    };
    fetchData();
  }, []);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      paginationModel={{ page: 0, pageSize: 10 }}
      pageSizeOptions={[10, 20, 50]}
      checkboxSelection
      autoHeight
      density="compact"
    />
  );
}
