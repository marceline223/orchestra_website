import { ApiService } from '../ApiService';
import { Member } from '@models/Member"';
import { Query } from '@api/filters/IQuery';

class MemberService extends ApiService {
  private readonly endpoint: string = '/member';

  load(query?: Query): Promise<Member[]> {
    return this.search<Member[]>(this.endpoint, query);
  }

  saveMember(member: Member): Promise<Member> {
    return this.save<Member>(this.endpoint, member);
  }

  deleteMember(id: number): Promise<Member> {
    return this.delete<Member>(this.endpoint, id);
  }
}

export const memberService = new MemberService();
