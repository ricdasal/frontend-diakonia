import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInstitucionesDatosComponent } from './modal-instituciones-datos.component';

describe('ModalInstitucionesDatosComponent', () => {
  let component: ModalInstitucionesDatosComponent;
  let fixture: ComponentFixture<ModalInstitucionesDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInstitucionesDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInstitucionesDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
