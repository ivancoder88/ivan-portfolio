import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Works } from './works';

describe('Works', () => {
  let component: Works;
  let fixture: ComponentFixture<Works>;

  beforeEach(async () => {
    // Mock IntersectionObserver
    (window as any).IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    await TestBed.configureTestingModule({
      imports: [Works]
    }).compileComponents();

    fixture = TestBed.createComponent(Works);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render project cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.group.relative');
    expect(cards.length).toBe(4);
  });

  it('should display project title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Digital Agency Website');
  });
});
