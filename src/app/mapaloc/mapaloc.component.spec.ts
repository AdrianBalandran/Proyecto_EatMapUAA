import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapalocComponent } from './mapaloc.component';

describe('MapalocComponent', () => {
  let component: MapalocComponent;
  let fixture: ComponentFixture<MapalocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapalocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapalocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
