import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaInstitucionesComponent } from './mapa-instituciones.component';

describe('MapaInstitucionesComponent', () => {
  let component: MapaInstitucionesComponent;
  let fixture: ComponentFixture<MapaInstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaInstitucionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
