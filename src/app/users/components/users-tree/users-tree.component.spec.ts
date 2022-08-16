import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTreeComponent } from './users-tree.component';

describe('UsersTreeComponent', () => {
  let component: UsersTreeComponent;
  let fixture: ComponentFixture<UsersTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
