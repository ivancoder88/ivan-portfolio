import { Component } from '@angular/core';

interface NavigationLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-header',
  imports: [],
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

  public ngOnInit(): void {
    this.setListenerForMobileMenu();
  }

  public setListenerForMobileMenu(): void {
    const hamburgerBtn: HTMLElement | null = document.querySelector('button[command="--toggle"][commandfor="mobile-menu"]');
    const mobileMenu: HTMLElement | null = document.getElementById('mobile-menu');
 
    if (hamburgerBtn && mobileMenu) {
      const spanElement: HTMLElement | null = hamburgerBtn.querySelector('span.absolute');

      // spanElement?.addEventListener("focusout", (event: FocusEvent) => {
      //   console.log('Hamburger button lost focus');
      // });
      // hamburgerBtn.addEventListener("focusout", (event: FocusEvent) => {
      //   console.log('Hamburger button lost focus');
      // });

      // mobileMenu.addEventListener("focusout", (event: FocusEvent) => {
      //   console.log('Mobile menu lost focus');
      // });
    }
  }

  public onHamburgerClick(event: PointerEvent): void {
    const hamburgerBtn: HTMLElement | null = (event.target as HTMLElement).parentElement;
    const mobileMenu: HTMLElement | null = document.getElementById('mobile-menu');

    if (hamburgerBtn?.hasAttribute('aria-expanded')) {
      const isExpanded: boolean = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu?.classList.toggle('hidden');
    } else {
      hamburgerBtn?.setAttribute('aria-expanded', 'true');
      mobileMenu?.classList.remove('hidden');
    }
  }

  public ngOnDestroy(): void {
    console.log('Destroying header component');
  }
}
