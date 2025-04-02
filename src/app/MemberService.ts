import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Member} from './entity/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = 'http://localhost:8080/rest/';

  constructor(private http: HttpClient) {
  }

  getAllMembers() {
    return this.http.get(this.baseUrl + 'members');
  }

  registerMember(member: Member) {
    return this.http.post(this.baseUrl + 'members', member);
  }
}
