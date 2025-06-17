import { Router } from 'express';
import maintenanceController from '../controllers/maintenance.controller';

export const maintenanceRouter = Router();

maintenanceRouter.get('/', maintenanceController.getAll);
maintenanceRouter.get('/:id', maintenanceController.getById);
maintenanceRouter.post('/', maintenanceController.create);
maintenanceRouter.put('/:id', maintenanceController.update);
maintenanceRouter.delete('/:id', maintenanceController.delete);
