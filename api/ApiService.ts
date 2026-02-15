import { AxiosResponse } from 'axios';
import { api } from './api';
import { Query } from '@api/filters/IQuery';
import { Model } from '@models/Model';

export abstract class ApiService<T extends Model> {
  protected abstract endpoint: string;

  getAll(params?: Query): Promise<T[]> {
    return api
      .get<T[]>(this.endpoint, { params })
      .then((res: AxiosResponse<T>) => res.data);
  }

  load(query?: Query): Promise<T[]> {
    return api
      .post<T[]>(`${this.endpoint}/load`, query)
      .then((res: AxiosResponse<T>) => res.data);
  }

  getById(id: number): Promise<T> {
    return api
      .get<T>(`${this.endpoint}/${id}`)
      .then((res: AxiosResponse<T>) => res.data);
  }

  create(body: Partial<T>): Promise<T> {
    return api
      .post<T>(this.endpoint, body)
      .then((res: AxiosResponse<T>) => res.data);
  }

  update(id: number, body: Partial<T>): Promise<T> {
    return api
      .put<T>(`${this.endpoint}/${id}`, body)
      .then((res: AxiosResponse<T>) => res.data);
  }

  save(entity: T): Promise<T> {
    return entity.hasID()
      ? this.update(entity.id, entity)
      : this.create(entity);
  }

  delete(id: number): Promise<void> {
    return api.delete(`${this.endpoint}/${id}`).then(() => {});
  }
}
