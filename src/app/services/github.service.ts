import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ExampleFlatNode } from '../models/ExampleFlatNode';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private https: HttpClient) { }

  getUsers(){
    const url = 'https://api.github.com/users'
    return this.https.get<any>(url)
  }

  login(name: string, password: string){
      const url = 'https://api.github.com/user';
      return this.https.get(url)
  }
  getRepsitoriesOfUser(url: string){
    return this.https.get<[{}]>(url);
  }

}
