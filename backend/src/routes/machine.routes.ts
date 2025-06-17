import { Router } from 'express';
import { MachineController } from '../controllers/machine.controller';

const machineRouter = Router();
const controller = new MachineController();

machineRouter.get('/', controller.getAll);
machineRouter.get('/:id', controller.getById);
machineRouter.post('/', controller.create);
machineRouter.put('/:id', controller.update);
machineRouter.delete('/:id', controller.delete);

export { machineRouter };
