import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class MachineController {
  getAll = async (req: Request, res: Response) => {
    const machines = await prisma.machine.findMany();
    res.json(machines);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const machine = await prisma.machine.findUnique({
      where: { id: Number(id) },
    });

    if (!machine) {
      res.status(404).json({ message: 'Máquina não encontrada' });
      return;
    }

    res.json(machine);
  };

  create = async (req: Request, res: Response) => {
    const { name, type, status } = req.body;

    if (!name || !type) {
      res.status(400).json({ message: 'Nome e tipo são obrigatórios' });
      return;
    }

    const machine = await prisma.machine.create({
      data: { name, type, status },
    });

    res.status(201).json(machine);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, type, status } = req.body;

    try {
      const machine = await prisma.machine.update({
        where: { id: Number(id) },
        data: { name, type, status },
      });

      res.json(machine);
    } catch (error) {
      res.status(404).json({ message: 'Máquina não encontrada' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await prisma.machine.delete({
        where: { id: Number(id) },
      });

      res.json({ message: 'Máquina deletada com sucesso' });
    } catch (error) {
      res.status(404).json({ message: 'Máquina não encontrada' });
    }
  };
}
