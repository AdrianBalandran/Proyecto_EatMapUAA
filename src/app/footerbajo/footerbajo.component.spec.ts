import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterbajoComponent } from './footerbajo.component';

describe('FooterbajoComponent', () => {
  let component: FooterbajoComponent;
  let fixture: ComponentFixture<FooterbajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterbajoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterbajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
