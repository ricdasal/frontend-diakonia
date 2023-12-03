import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaInvitadoComponent } from './mapa-invitado.component';

describe('MapaInvitadoComponent', () => {
  let component: MapaInvitadoComponent;
  let fixture: ComponentFixture<MapaInvitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaInvitadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
