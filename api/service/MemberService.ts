import { ApiService } from '../ApiService';
import { Member } from '@models/Member"';

class MemberService extends ApiService<Member> {
  protected readonly endpoint: string = '/member';
}

export const memberService = new MemberService();
