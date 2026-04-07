import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Services } from './components/services/services';
import { Works } from './components/works/works';
import { Resume } from './components/resume/resume';
import { Skills } from './components/skills/skills';
import { Testimonials } from './components/testimonials/testimonials';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    Navbar, 
    Hero, 
    Services, 
    Works, 
    Resume, 
    Skills, 
    Testimonials, 
    Contact, 
    Footer
  ],
  template: `
    <div class="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <app-navbar />
      
      <main>
        <app-hero />
        <app-services />
        <app-works />
        <app-resume />
        <app-skills />
        <app-testimonials />
        <app-contact />
      </main>

      <app-footer />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Homepage {}
