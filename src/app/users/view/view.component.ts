import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscribable } from 'rxjs';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { FullUser } from 'src/app/models/FullUser';
import { User } from 'src/app/models/User';
import { GithubService } from 'src/app/services/github.service';
import { selectUsers } from 'src/app/store/users/user.selectors';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  users$ = this.store.select(selectUsers);

  constructor(private store: Store<{ users: DynamicFlatNode[] }>) {}

  ngOnInit(): void {}
}
