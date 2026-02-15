import { ApiService } from '@api/ApiService';
import { News } from '@models/News';

class NewsService extends ApiService<News> {
  protected readonly endpoint: string = '/news';
}

export const newsService = new NewsService();
