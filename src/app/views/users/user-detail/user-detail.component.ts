import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { GithubService } from 'src/app/services/github.service';
import { RepoTableComponent } from './repo-table/repo-table.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  @ViewChild(RepoTableComponent) tableComponent!: RepoTableComponent;

  showTable: any;
  user: User;
  repositories = [];
  constructor(
    private githubService: GithubService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.user = response['userFromStore'];
      this.getUserRepos();
    });
  }

  getUserRepos() {
    if (this.user.repos_url)
      this.githubService.getRepsitoriesOfUser(this.user.repos_url)?.subscribe(
        (allRepos) => {
          this.tableComponent.setRepo(allRepos);
        },
        (err) => {}
      );
  }
}
