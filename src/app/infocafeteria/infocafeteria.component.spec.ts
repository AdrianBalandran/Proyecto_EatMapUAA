import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocafeteriaComponent } from './infocafeteria.component';

describe('InfocafeteriaComponent', () => {
  let component: InfocafeteriaComponent;
  let fixture: ComponentFixture<InfocafeteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfocafeteriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfocafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
