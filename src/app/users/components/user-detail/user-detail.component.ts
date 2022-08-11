import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User';
import { GithubService } from 'src/app/services/github.service';
import { setFullUser } from 'src/app/store/users/user.actions';
import { selectOneUser } from 'src/app/store/users/user.selectors';
import { RepoTableComponent } from './repo-table/repo-table.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @ViewChild(RepoTableComponent) tableComponent!: RepoTableComponent;


  user: User = {login: ''};
  repositories = [];
  constructor(private store: Store, private githubService: GithubService,
              private router: Router) { }

  ngOnInit(): void {
    this.store.select(selectOneUser).subscribe((user) => {
      this.user = user;
      if(this.user.login === ''){
        this.router.navigate(['/users']);
      }
      this.openTable();
    })
  }

  setUserInStore(){
      const user: User = {login: '', id: -1}
        this.store.dispatch(setFullUser({user: user}))
   }

   openTable(){
    if(this.user.repos_url)
    this.githubService.getRepsitoriesOfUser(this.user.repos_url)?.subscribe(allRepos => {
        this.tableComponent.setRepo(allRepos);
    })
   }

}
