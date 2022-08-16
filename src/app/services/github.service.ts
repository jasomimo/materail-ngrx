import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { FullUser } from '../models/FullUser';
import { Repo } from '../models/Repo';
import { DynamicFlatNode } from '../models/DynamicFlatNode';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private https: HttpClient) {}

  getUsers() {
    const url = 'https://api.github.com/users';
    return this.https.get<FullUser[]>(url);
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
