import {api} from './api';

export class ApiService {
  get<T>(endpoint: string): Promise<T> {
    return api.get<T>(endpoint).then(res => res.data);
  }

  getById<T>(endpoint: string, id: number): Promise<T> {
    return api.get<T>(`${endpoint}/${id}`).then(res => res.data);
  }

  getByKey<T>(endpoint: string, key: string): Promise<T> {
    return api.get<T>(`${endpoint}/${key}`).then(res => res.data);
  }

  post<T>(endpoint: string, body: unknown): Promise<T> {
    return api.post<T>(endpoint, body).then(res => res.data);
  }

  update<T>(endpoint: string, id: number | string, body: unknown): Promise<T> {
    return api.put<T>(`${endpoint}/${id}`, body).then(res => res.data);
  }

  delete(endpoint: string, id: number): Promise<void> {
    return api.delete(`${endpoint}/${id}`).then(() => {
    });
  }
}
