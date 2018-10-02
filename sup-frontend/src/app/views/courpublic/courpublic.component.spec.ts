import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourpublicComponent } from './courpublic.component';

describe('CourpublicComponent', () => {
  let component: CourpublicComponent;
  let fixture: ComponentFixture<CourpublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourpublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourpublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
