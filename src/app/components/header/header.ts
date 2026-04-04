import { Component, signal } from '@angular/core';
import { Hamburger } from '../hamburger/hamburger';

interface NavigationLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-header',
  imports: [Hamburger],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly navigationLinks: NavigationLink[] = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Works', href: '#works' },
    { label: 'Resume', href: '#resume' },
    { label: 'Skills', href: '#skills' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  protected isHamburgerClicked = signal(false);

  public onHamburgerClick(): void {
    this.isHamburgerClicked.set(!this.isHamburgerClicked());
  }
}
