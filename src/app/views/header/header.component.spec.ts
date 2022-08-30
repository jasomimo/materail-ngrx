import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let storeMock: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [provideMockStore({ initialState: {} })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    storeMock = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when click on logout icon than distpach should be called', () => {
    const dispatchSpy = spyOn(storeMock, 'dispatch').and.callThrough(); // spy on the store
    const logoutIcon = fixture.debugElement.query(
      By.css('.logoutIcon')
    ).nativeElement;
    logoutIcon.click();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });
});
