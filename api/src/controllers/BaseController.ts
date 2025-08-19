import { Request, Response, NextFunction } from 'express';

export default class BaseController<T> {
  protected service: {
    create(data: any): Promise<T>;
    find(filter?: any): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: any): Promise<T | null>;
    delete(id: string): Promise<T | null>;
  };

  constructor(service: {
    create(data: any): Promise<T>;
    find(filter?: any): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: any): Promise<T | null>;
    delete(id: string): Promise<T | null>;
  }) {
    this.service = service;
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await this.service.create(req.body);
      return res.status(201).json(item);
    } catch (err) {
      next(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await this.service.find(req.query);
      return res.json(items);
    } catch (err) {
      next(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Missing id parameter' });
      }
      const item = await this.service.findById(id);
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(item);
    } catch (err) {
      next(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Missing id parameter' });
      }
      const item = await this.service.update(id, req.body);
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(item);
    } catch (err) {
      next(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Missing id parameter' });
      }
      const item = await this.service.delete(id);
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json({ message: 'Deleted successfully' });
    } catch (err) {
      next(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
