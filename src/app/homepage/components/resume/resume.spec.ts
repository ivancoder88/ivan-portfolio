import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Resume } from './resume';

describe('Resume', () => {
  let component: Resume;
  let fixture: ComponentFixture<Resume>;

  beforeEach(async () => {
    // Mock IntersectionObserver
    (window as any).IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    await TestBed.configureTestingModule({
      imports: [Resume]
    }).compileComponents();

    fixture = TestBed.createComponent(Resume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render experience items', () => {
    const items = fixture.nativeElement.querySelectorAll('h3')[0].parentElement.querySelectorAll('.bg-white');
    expect(items.length).toBe(3);
  });

  it('should render education items', () => {
    const items = fixture.nativeElement.querySelectorAll('h3')[1].parentElement.querySelectorAll('.bg-white');
    expect(items.length).toBe(2);
  });

  it('should display experience title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Senior Software Developer');
  });
});
