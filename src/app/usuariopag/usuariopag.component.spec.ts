import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariopagComponent } from './usuariopag.component';

describe('UsuariopagComponent', () => {
  let component: UsuariopagComponent;
  let fixture: ComponentFixture<UsuariopagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariopagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariopagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
