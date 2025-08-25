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

  protected sendSuccess(res: Response, data: any, status = 200) {
    return res.status(status).json(data);
  }

  protected sendError(res: Response, message = 'Internal server error', status = 500) {
    return res.status(status).json({ message });
  }

  protected sendNotFound(res: Response, message = 'Not found') {
    return res.status(404).json({ message });
  }

  protected sendBadRequest(res: Response, message = 'Bad request') {
    return res.status(400).json({ message });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await this.service.create(req.body);
      return this.sendSuccess(res, item, 201);
    } catch (err) {
      next(err);
      return this.sendError(res);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await this.service.find(req.query);
      return this.sendSuccess(res, items);
    } catch (err) {
      next(err);
      return this.sendError(res);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendBadRequest(res, 'Missing id parameter');
      }
      const item = await this.service.findById(id);
      if (!item) {
        return this.sendNotFound(res);
      }
      return this.sendSuccess(res, item);
    } catch (err) {
      next(err);
      return this.sendError(res);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendBadRequest(res, 'Missing id parameter');
      }
      const item = await this.service.update(id, req.body);
      if (!item) {
        return this.sendNotFound(res);
      }
      return this.sendSuccess(res, item);
    } catch (err) {
      next(err);
      return this.sendError(res);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendBadRequest(res, 'Missing id parameter');
      }
      const item = await this.service.delete(id);
      if (!item) {
        return this.sendNotFound(res);
      }
      return this.sendSuccess(res, { message: 'Deleted successfully' });
    } catch (err) {
      next(err);
      return this.sendError(res);
    }
  }
}