import { ApiService } from '../ApiService';
import { Member } from '@models/Member"'

class MemberService extends ApiService {
  getMembers(): Promise<Member[]> {
    return this.get<Member[]>('/member');
  }

  getMembersByInstrument(instrumentId: number): Promise<Member[]> {
    return this.get<Member[]>(`/member/by-instrument/${instrumentId}`);
  }
}

export const memberService = new MemberService();
