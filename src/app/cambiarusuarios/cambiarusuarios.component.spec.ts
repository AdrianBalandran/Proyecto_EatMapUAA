import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarusuariosComponent } from './cambiarusuarios.component';

describe('CambiarusuariosComponent', () => {
  let component: CambiarusuariosComponent;
  let fixture: ComponentFixture<CambiarusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiarusuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambiarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
