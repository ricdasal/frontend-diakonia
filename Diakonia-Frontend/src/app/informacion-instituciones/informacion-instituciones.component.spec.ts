import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionInstitucionesComponent } from './informacion-instituciones.component';

describe('InformacionInstitucionesComponent', () => {
  let component: InformacionInstitucionesComponent;
  let fixture: ComponentFixture<InformacionInstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionInstitucionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
