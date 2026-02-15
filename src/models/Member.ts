import { MemberInstrument } from '@models/MemberInstrument';
import { Model } from '@models/Model';
import { University } from '@models/University';

export class Member extends Model {
  lastName: string = '';
  firstName: string = '';
  surname: string | null = null;
  gender: 'M' | 'F' | null = null;
  birthday: Date | null = null;
  instruments: MemberInstrument[] | null = [];
  university: University | null = null;
  department: string | null = null;
  group: string | null = null;
  year: number | null = null;
  degree: string | null = null;
  phone: string | null = null;
  email: string | null = null;
  linkVK: string | null = null;
  linkTG: string | null = null;
  photoSrc: string | null = null;
  isCandidate: boolean = false;
  isActive: boolean = true;
  joinDate: Date | null = null;
  leaveDate: Date | null = null;
  isGraduated: boolean = false;

  constructor(init?: Partial<Member>) {
    super();
    Object.assign(this, init);

    if (init?.instruments) {
      this.instruments = init.instruments.map(
        (i) => new MemberInstrument(i)
      );
    }
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
