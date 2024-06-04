import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatebotComponent } from './templatebot.component';

describe('TemplatebotComponent', () => {
  let component: TemplatebotComponent;
  let fixture: ComponentFixture<TemplatebotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatebotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatebotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
