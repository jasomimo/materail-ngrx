import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() user: User;
}
