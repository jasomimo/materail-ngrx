import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
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
