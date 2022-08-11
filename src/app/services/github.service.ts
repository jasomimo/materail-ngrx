import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { ExampleFlatNode } from '../models/ExampleFlatNode';
import { FullUser } from '../models/FullUser';
import { Repo } from '../models/Repo';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private https: HttpClient) { }

  getUsers(){
    const url = 'https://api.github.com/users'
    return this.https.get<any>(url)
  }

  login(name: string, token: string){
    const headerDict = {
      name : token
    }

    const requestOptions = {
      headers: new HttpHeaders (headerDict),
    };

      const url = 'https://api.github.com/user';
      return this.https.get(url, requestOptions)
  }
  getRepsitoriesOfUser(url: string){
    return this.https.get<[Repo]>(url);
  }
  getFullUser(login: string){
    const url = 'https://api.github.com/users/' + login;
    return this.https.get<User>(url);
  }

}
