import {ApiService} from "@api/ApiService";
import {News} from "@models/News";

class NewsService extends ApiService {
  getAllNews(): Promise<News[]> {
    return this.get<News[]>('/news');
  }

  getNewsById(newsId: number): Promise<News | null> {
    return this.get<News>(`/news${instrumentId}`);
  }
}

export const newsService = new NewsService();
