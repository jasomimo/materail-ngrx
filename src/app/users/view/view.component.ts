import { Component, OnInit } from '@angular/core';
import { Observable, Subscribable } from 'rxjs';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  users$: Observable<any>;
  constructor(private githubService: GithubService) {
    this.users$ = this.githubService.getUsers()
   }

  ngOnInit(): void {
  }

}
