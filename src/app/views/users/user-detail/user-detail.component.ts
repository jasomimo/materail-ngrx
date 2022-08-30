import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { GithubService } from 'src/app/services/github.service';
import { RepoTableComponent } from './repo-table/repo-table.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  @ViewChild(RepoTableComponent) tableComponent!: RepoTableComponent;

  showTable: any;
  user: User;
  user$: Subscription;
  repositories = [];

  constructor(
    private githubService: GithubService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user$ = this.activatedRoute.data.subscribe((response) => {
      this.user = response['userFromStore'];
      this.getUserRepos();
    });
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  getUserRepos() {
    if (this.user.repos_url && this.user)
      this.githubService.getRepsitoriesOfUser(this.user.repos_url)?.subscribe(
        (allRepos) => {
          this.tableComponent.setRepo(allRepos);
        },
        (err) => {}
      );
  }
}
