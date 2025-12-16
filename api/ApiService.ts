import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { api } from './api';
import { Query } from '@api/filters/IQuery';
import { Model } from '@models/Model';

export class ApiService {
  get<T>(endpoint: string, params?: Query): Promise<T> {
    return api
      .get<T>(endpoint, {
        headers: { 'Content-Type': 'application/json' },
        params,
      })
      .then((res: AxiosResponse<T>) => res.data);
  }

  search<T>(endpoint: string, body: unknown): Promise<T> {
    return api.post<T>(`${endpoint}/load`, body).then((res: AxiosResponse<T>) => res.data);
  }

  post<T>(endpoint: string, body: unknown, config?: AxiosRequestConfig): Promise<T> {
    return api
      .post<T>(endpoint, body, {
        headers: { 'Content-Type': 'application/json' },
        ...config,
      })
      .then((res: AxiosResponse<T>) => res.data);
  }

  put<T>(endpoint: string, body: unknown, config?: AxiosRequestConfig): Promise<T> {
    return api
      .put<T>(endpoint, body, {
        headers: { 'Content-Type': 'application/json' },
        ...config,
      })
      .then((res: AxiosResponse<T>) => res.data);
  }

  update<T extends Model>(endpoint: string, entity: T, config?: AxiosRequestConfig): Promise<T> {
    return this.put<T>(`${endpoint}/${entity.id}`, entity, config);
  }

  save<T extends Model>(endpoint: string, body: T): Promise<T> {
    return body.hasID() ? this.update(endpoint, body) : this.post(endpoint, body);
  }

  delete(endpoint: string, id: number): Promise<void> {
    return api.delete(`${endpoint}/${id}`).then(() => {});
  }
}
