import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { ScrollService } from '../../services/scroll.service';
import { vi } from 'vitest';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;
  let scrollServiceMock: any;

  beforeEach(async () => {
    scrollServiceMock = {
      scrollToSection: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [
        { provide: ScrollService, useValue: scrollServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.text-2xl.font-bold').textContent).toContain('Ivan Ivicek');
  });

  it('should render copyright with current year', () => {
    const compiled = fixture.nativeElement;
    const currentYear = new Date().getFullYear().toString();
    expect(compiled.textContent).toContain(currentYear);
    expect(compiled.textContent).toContain('All rights reserved');
  });

  it('should call scrollToSection when the name is clicked', () => {
    const nameLink = fixture.nativeElement.querySelector('.text-2xl.font-bold');
    nameLink.click();
    expect(scrollServiceMock.scrollToSection).toHaveBeenCalledWith('home');
  });

  it('should have social links', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(3); // Twitter, LinkedIn, GitHub
  });
});
