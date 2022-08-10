import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    // this.githubService.getData().subscribe(data => {
    //   console.log(data)
    // })
  }

  login(){
    this.githubService.login('test', '321').subscribe(data => {
      console.log(data)
    })
  }

}
