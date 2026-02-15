import { ApiService } from '@api/ApiService';
import { University } from '@models/University';

class UniversityService extends ApiService<University> {
  protected readonly endpoint: string = '/university';
}

export const universityService = new UniversityService();
