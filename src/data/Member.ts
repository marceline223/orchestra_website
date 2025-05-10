import {Instrument} from "./Instrument";

export type Member = {
  id: number,
  name: {
    firstName: string,
    lastName: string,
    surName: string | null,
  },
  instrument: Instrument[],
  photoSrc: string,
  position: string[] | null
}
