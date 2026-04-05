import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { By } from '@angular/platform-browser';
import { Hamburger } from '../hamburger/hamburger';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, Hamburger],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have navigationLinks defined', () => {
    // Accessing protected property for test purposes
    const navigationLinks = (component as any).navigationLinks;
    expect(navigationLinks).toBeDefined();
    expect(navigationLinks.length).toBeGreaterThan(0);
    expect(navigationLinks[0]).toEqual({ label: 'Home', href: '#home' });
  });

  it('should set isHamburgerClicked when onHamburgerClick is called', () => {
    // Accessing protected property for test purposes
    expect((component as any).isHamburgerClicked()).toBe(false);

    component.onHamburgerClick();
    fixture.detectChanges();
    expect((component as any).isHamburgerClicked()).toBe(true);

    component.onHamburgerClick();
    fixture.detectChanges();
    expect((component as any).isHamburgerClicked()).toBe(false);
  });

  it('should toggle mobile menu visibility when hamburger emits active event', () => {
    const hamburgerDebugElement = fixture.debugElement.query(By.directive(Hamburger));
    const hamburgerComponent = hamburgerDebugElement.componentInstance as Hamburger;

    // Initially closed (using visibility and opacity classes)
    const mobileMenuContainer = fixture.nativeElement.querySelector('.grid');
    expect(mobileMenuContainer.classList.contains('invisible')).toBe(true);
    expect(mobileMenuContainer.classList.contains('opacity-0')).toBe(true);

    // Toggle open
    hamburgerComponent.active.emit(true);
    fixture.detectChanges();

    expect((component as any).isHamburgerClicked()).toBe(true);
    expect(mobileMenuContainer.classList.contains('invisible')).toBe(false);
    expect(mobileMenuContainer.classList.contains('opacity-100')).toBe(true);

    // Toggle closed
    hamburgerComponent.active.emit(false);
    fixture.detectChanges();

    expect((component as any).isHamburgerClicked()).toBe(false);
    expect(mobileMenuContainer.classList.contains('invisible')).toBe(true);
    expect(mobileMenuContainer.classList.contains('opacity-0')).toBe(true);
  });

  it('should render all navigation links in the desktop menu', () => {
    const desktopLinks = fixture.nativeElement.querySelectorAll('ul.hidden.md\\:flex li');
    const navigationLinks = (component as any).navigationLinks;
    expect(desktopLinks.length).toBe(navigationLinks.length);
  });

  it('should render all navigation links in the mobile menu', () => {
    const mobileLinks = fixture.nativeElement.querySelectorAll('#mobile-menu li');
    const navigationLinks = (component as any).navigationLinks;
    expect(mobileLinks.length).toBe(navigationLinks.length);
  });
});
