import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repo } from '../models/Repo';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private https: HttpClient) {}

  baseUrl = 'https://api.github.com/';

  getUsers(fromUserId: number) {
    const url = this.baseUrl + 'users';
    return this.https.get<User[]>(url, {
      params: {
        since: fromUserId,
      },
    });
  }

  login(token: string) {
    let requestOptions = {
      headers: new HttpHeaders({
        Authorization: 'token ' + token,
      }),
    };
    const url = this.baseUrl + 'user';
    return this.https.get<User>(url, requestOptions);
  }
  getRepsitoriesOfUser(url: string) {
    return this.https.get<Repo[]>(url);
  }
  getFullUser(login: string) {
    const url = this.baseUrl + 'users/' + login;
    return this.https.get<User>(url);
  }
}
