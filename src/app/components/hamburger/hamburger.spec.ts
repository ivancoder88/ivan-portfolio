import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hamburger } from './hamburger';

describe('Hamburger', () => {
  let component: Hamburger;
  let fixture: ComponentFixture<Hamburger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hamburger],
    }).compileComponents();

    fixture = TestBed.createComponent(Hamburger);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isActive signal set to false by default', () => {
    expect(component.isActive()).toBe(false);
  });

  it('should toggle isActive and emit the new value on toggle()', () => {
    const activeSpy = vi.spyOn(component.active, 'emit');

    component.toggle();
    expect(component.isActive()).toBe(true);
    expect(activeSpy).toHaveBeenCalledWith(true);

    component.toggle();
    expect(component.isActive()).toBe(false);
    expect(activeSpy).toHaveBeenCalledWith(false);
  });

  it('should update aria-expanded attribute on button click', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-expanded')).toBe('false');

    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');

    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('should update screen reader text based on isActive state', () => {
    const srOnly = fixture.nativeElement.querySelector('.sr-only');
    expect(srOnly.textContent).toContain('Open main menu');

    component.toggle();
    fixture.detectChanges();
    expect(srOnly.textContent).toContain('Close main menu');

    component.toggle();
    fixture.detectChanges();
    expect(srOnly.textContent).toContain('Open main menu');
  });
});
