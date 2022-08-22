import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Repo } from '../models/Repo';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private https: HttpClient) {}

  getUsers(fromUserId: number, authToken?: string) {
    let requestOptions = null;
    if (authToken) {
      requestOptions = {
        headers: new HttpHeaders({
          Authorization: 'token ' + authToken,
        }),
      };
    }

    const url = 'https://api.github.com/users';
    return this.https.get<User[]>(url, {
      params: {
        since: fromUserId,
      },
      headers: requestOptions?.headers,
    });
  }

  login(token: string) {
    let requestOptions = {
      headers: new HttpHeaders({
        Authorization: 'token ' + token,
      }),
    };
    const url = 'https://api.github.com/user';
    return this.https.get<User>(url, requestOptions);
  }
  getRepsitoriesOfUser(url: string) {
    return this.https.get<Repo[]>(url);
  }
  getFullUser(login: string) {
    const url = 'https://api.github.com/users/' + login;
    return this.https.get<User>(url);
  }
}
