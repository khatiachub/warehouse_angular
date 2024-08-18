import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersmanagmentComponent } from './usersmanagment.component';

describe('UsersmanagmentComponent', () => {
  let component: UsersmanagmentComponent;
  let fixture: ComponentFixture<UsersmanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersmanagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
