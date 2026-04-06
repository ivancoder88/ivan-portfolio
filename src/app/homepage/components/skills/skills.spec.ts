import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Skills } from './skills';

describe('Skills', () => {
  let component: Skills;
  let fixture: ComponentFixture<Skills>;

  beforeEach(async () => {
    // Mock IntersectionObserver
    (window as any).IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    await TestBed.configureTestingModule({
      imports: [Skills]
    }).compileComponents();

    fixture = TestBed.createComponent(Skills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all skills', () => {
    const skillCards = fixture.nativeElement.querySelectorAll('.flex.flex-col.items-center');
    expect(skillCards.length).toBe(8);
  });

  it('should display skill name and percentage', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('95%');
  });
});
