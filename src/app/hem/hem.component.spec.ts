import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HemComponent } from './hem.component';

describe('HemComponent', () => {
  let component: HemComponent;
  let fixture: ComponentFixture<HemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
