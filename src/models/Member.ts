import {MemberInstrument} from "@models/MemberInstrument";

export type Member = {
  id: number,
  lastName: string,
  firstName: string,
  surname: string | null,
  birthday: Date,
  instruments: MemberInstrument[],
  university: number | null,
  department: string | null,
  group: string | null,
  year: number | null,
  degree: number | null,
  phone: string | null,
  email: string | null,
  linkVK: string | null,
  linkTH: string | null,
  photoSrc: string | null,
  isNew: boolean,
  isActive: boolean,
}
