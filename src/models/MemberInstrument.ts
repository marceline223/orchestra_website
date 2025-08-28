import {Instrument} from "@models/Instrument";

export type MemberInstrument = {
  instrument: Instrument,
  position: string | null,
  order: number | null,
}
