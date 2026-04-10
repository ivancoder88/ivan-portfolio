import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Services } from './components/services/services';
import { Timeline } from './components/timeline/timeline';
import { Resume } from './components/resume/resume';
import { Skills } from './components/skills/skills';
import { TechStack } from './components/tech-stack/tech-stack';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-homepage',
  imports: [
    Navbar,
    Hero,
    Services,
    Timeline,
    Resume,
    Skills,
    TechStack,
    Contact,
    Footer
  ],
  template: `
    <div class="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <app-navbar />
      
      <main>
        <app-hero />
        <app-services />
        <app-timeline />
        <app-resume />
        <app-skills />
        <app-tech-stack />
        <app-contact />
      </main>

      <app-footer />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Homepage {}
