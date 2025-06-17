import express from 'express';
import cors from 'cors';
import { machineRouter } from './routes/machine.routes';

import maintenanceRouter from './routes/maintenance.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/machines', machineRouter);
app.use('/api/maintenances', maintenanceRouter); // 🚀 Adiciona aqui

export default app;
