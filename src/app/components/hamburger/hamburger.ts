import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.html',
  styleUrl: './hamburger.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hamburger {
  isActive = signal(false);
  active = output<boolean>();

  toggle(): void {
    this.isActive.update((prev) => !prev);
    this.active.emit(this.isActive());
  }
}
