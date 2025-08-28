import { ApiService } from '../ApiService';
import { Instrument } from '@models/Instrument"'

class InstrumentService extends ApiService {
  getInstruments(): Promise<Instrument[]> {
    return this.get<Instrument[]>('/instrument');
  }
}

export const instrumentService = new InstrumentService();
