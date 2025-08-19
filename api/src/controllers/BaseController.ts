import { Request, Response, NextFunction } from 'express';

export default class BaseController<T> {
  protected service: any;

  constructor(service: any) {
    this.service = service;
    // Bind dos métodos (opcional, útil para uso direto em rotas)
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await this.service.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await this.service.find(req.query);
      res.json(items);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await this.service.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.json(item);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await this.service.update(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.json(item);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await this.service.delete(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}
