import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getMachines, Machine } from '../services/machineService';

export default function CustomizedDataGrid() {
  const [rows, setRows] = useState<Machine[]>([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'tipo', headerName: 'Tipo', width: 150 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'criadoEm', headerName: 'Cadastrado em', width: 180 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMachines();
      const formatted = data.map((item: Machine) => ({
        ...item,
        criadoEm: new Date(item.criadoEm).toLocaleDateString(),
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
      disableRowSelectionOnClick
    />
  );
}
