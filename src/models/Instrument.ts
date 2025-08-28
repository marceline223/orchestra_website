import {Member} from "@models/Member";
import {MemberInstrument} from "@models/MemberInstrument";

export type Instrument = {
  id: number,
  key: string,
  name: string,
  namePlural: string,
  members: MemberInstrument[],
  order: number,
}
