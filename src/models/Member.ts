import { MemberInstrument } from '@models/MemberInstrument';
import { Model } from '@models/Model';

export class Member extends Model {
  id: number | null = null;
  lastName: string = '';
  firstName: string = '';
  surname: string | null = null;
  birthday: Date | null = null;
  instruments: MemberInstrument[] | null = [];
  university: number | null = null;
  department: string | null = null;
  group: string | null = null;
  year: number | null = null;
  degree: number | null = null;
  phone: string | null = null;
  email: string | null = null;
  linkVK: string | null = null;
  linkTG: string | null = null;
  photoSrc: string | null = null;
  isNew: boolean = false;
  isActive: boolean = true;

  constructor(init?: Partial<Member>) {
    super();
    Object.assign(this, init);
  }

  getFullName = (): string => {
    return (
      this.lastName +
      ' ' +
      this.firstName +
      (this.surname ? ' ' + this.surname : '')
    );
  };

  getFirstAndLastName = (): string => {
    return this.firstName + ' ' + this.lastName;
  };
}
