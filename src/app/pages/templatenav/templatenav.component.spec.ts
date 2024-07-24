import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatenavComponent } from './templatenav.component';

describe('TemplatenavComponent', () => {
  let component: TemplatenavComponent;
  let fixture: ComponentFixture<TemplatenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
