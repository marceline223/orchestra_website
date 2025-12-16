import { ApiService } from '@api/ApiService';
import { News } from '@models/News';
import { Query } from '@api/filters/IQuery';

class NewsService extends ApiService {
  private readonly endpoint: string = '/news';

  load(query?: Query): Promise<News[]> {
    return this.search<News[]>(this.endpoint, query);
  }
}

export const newsService = new NewsService();
