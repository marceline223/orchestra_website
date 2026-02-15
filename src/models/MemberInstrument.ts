import {Instrument} from "@models/Instrument";
import { Model } from '@models/Model';

export class MemberInstrument extends Model {
  instrument: Instrument | null = null;
  position: string | null = null;
  order: number | null = null;
  inStock: boolean = true;

  constructor(init?: Partial<MemberInstrument>) {
    super();
    Object.assign(this, init);
  }
}
