import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatwhatComponent } from './chatwhat.component';

describe('ChatwhatComponent', () => {
  let component: ChatwhatComponent;
  let fixture: ComponentFixture<ChatwhatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatwhatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatwhatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
