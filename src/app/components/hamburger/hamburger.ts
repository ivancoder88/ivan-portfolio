import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  imports: [],
  templateUrl: './hamburger.html',
  styleUrl: './hamburger.css',
  standalone: true,
})
export class Hamburger {
  iconToggle = signal(false);
  active = output<boolean>();

  onHamburgerClick() {
    this.iconToggle.set(!this.iconToggle());
    this.active.emit(this.iconToggle());
  }
}
