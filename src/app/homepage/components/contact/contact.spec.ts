import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    // Mock IntersectionObserver
    (window as any).IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    await TestBed.configureTestingModule({
      imports: [Contact]
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render contact info', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Email Me');
    expect(compiled.textContent).toContain('Call Me');
  });

  it('should render the contact form fields', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(inputs.length).toBe(2); // Name, Email
    expect(textarea).toBeTruthy(); // Message
  });

  it('should have a submit button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Send Message');
  });
});
