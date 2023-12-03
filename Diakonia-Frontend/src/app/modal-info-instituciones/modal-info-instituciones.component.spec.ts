import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoInstitucionesComponent } from './modal-info-instituciones.component';

describe('ModalInfoInstitucionesComponent', () => {
  let component: ModalInfoInstitucionesComponent;
  let fixture: ComponentFixture<ModalInfoInstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoInstitucionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInfoInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
