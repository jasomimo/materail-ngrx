import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';

import { UserDetailComponent } from './user-detail.component';
import { AppModule } from 'src/app/app.module';
import { Subscription } from 'rxjs';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      imports: [AppModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    component.user = {
      id: -1,
      avatar_url: '',
      followers: 1,
      login: 'nonameansdasdsad',
      name: 'Wou',
      public_repos: 25,
    };
    component.ngOnDestroy();
    const shouldBeError = component.getUserRepos();
    console.log('err', shouldBeError);
    expect(component.user$.closed).toBe(true);
  });
});
