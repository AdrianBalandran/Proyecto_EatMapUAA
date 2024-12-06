import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistainfoComponent } from './vistainfo.component';

describe('VistainfoComponent', () => {
  let component: VistainfoComponent;
  let fixture: ComponentFixture<VistainfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistainfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistainfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
