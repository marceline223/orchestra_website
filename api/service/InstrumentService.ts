import { ApiService } from '../ApiService';
import { Instrument } from '@models/Instrument"'
import { Query } from '@api/filters/IQuery';

class InstrumentService extends ApiService {
  private readonly endpoint: string = '/instrument';

  load(query?: Query): Promise<Instrument[]> {
    return this.search<Instrument[]>(this.endpoint, query);
  }
}

export const instrumentService = new InstrumentService();
