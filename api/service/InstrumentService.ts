import { ApiService } from '../ApiService';
import { Instrument } from '@models/Instrument"';

class InstrumentService extends ApiService<Instrument> {
  protected readonly endpoint: string = '/instrument';
}

export const instrumentService = new InstrumentService();
