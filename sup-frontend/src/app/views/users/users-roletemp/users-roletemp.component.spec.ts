import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRoletempComponent } from './users-roletemp.component';

describe('UsersRoletempComponent', () => {
  let component: UsersRoletempComponent;
  let fixture: ComponentFixture<UsersRoletempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRoletempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRoletempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
