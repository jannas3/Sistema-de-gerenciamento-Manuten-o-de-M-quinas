import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

class MaintenanceController {
  getAll = async (req: Request, res: Response) => {
    const maintenances = await prisma.maintenance.findMany({
      include: { machine: true },
    });
    res.json(maintenances);
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const maintenance = await prisma.maintenance.findUnique({
      where: { id },
      include: { machine: true },
    });
    res.json(maintenance);
  };

  create = async (req: Request, res: Response) => {
    const { description, date, machineId, status } = req.body;

    const maintenance = await prisma.maintenance.create({
      data: {
        description,
        date: new Date(date),
        machineId,
        status,
      },
    });

    res.json(maintenance);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { description, date, machineId, status } = req.body;

    const maintenance = await prisma.maintenance.update({
      where: { id },
      data: {
        description,
        date: new Date(date),
        machineId,
        status,
      },
    });

    res.json(maintenance);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    await prisma.maintenance.delete({
      where: { id },
    });

    res.json({ message: 'Manutenção deletada com sucesso' });
  };
}

export default new MaintenanceController();
