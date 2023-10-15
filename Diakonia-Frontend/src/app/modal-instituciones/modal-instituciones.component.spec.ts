import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInstitucionesComponent } from './modal-instituciones.component';

describe('ModalInstitucionesComponent', () => {
  let component: ModalInstitucionesComponent;
  let fixture: ComponentFixture<ModalInstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInstitucionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
