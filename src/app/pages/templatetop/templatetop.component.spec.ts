import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatetopComponent } from './templatetop.component';

describe('TemplatetopComponent', () => {
  let component: TemplatetopComponent;
  let fixture: ComponentFixture<TemplatetopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatetopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatetopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
