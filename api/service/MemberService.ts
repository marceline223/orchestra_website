import { ApiService } from '../ApiService';
import { Member } from '@models/Member"';
import { api } from '../api';

class MemberService extends ApiService<Member> {
  protected readonly endpoint: string = '/member';

  uploadImage(id: number, file: Express.Multer.File): Promise<Express.Multer.File> {
    return api.post<Express.Multer.File>(
      `${this.endpoint}/${id}/upload-image`,
      file,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res): Express.Multer.File => res.data);
  }
}

export const memberService = new MemberService();
