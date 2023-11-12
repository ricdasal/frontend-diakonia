import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminUsersComponent } from './modal-admin-users.component';

describe('ModalAdminUsersComponent', () => {
  let component: ModalAdminUsersComponent;
  let fixture: ComponentFixture<ModalAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
