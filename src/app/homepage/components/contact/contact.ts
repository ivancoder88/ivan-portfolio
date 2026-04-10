import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LanguageService } from '../../services/language.service';
import { ContactInfoItem } from './contact-info-item';
import { ContactForm } from './contact-form';

@Component({
  selector: 'app-contact',
  imports: [SectionHeader, Section, RevealDirective, ContactInfoItem, ContactForm],
  template: `
    <app-section id="contact">
      <app-section-header [title]="lang.t().contact.title" />

      <div class="grid lg:grid-cols-2 gap-16">
        <div appReveal>
          <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">{{ lang.t().contact.heading }}</h3>
          <p class="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-lg">
            {{ lang.t().contact.description }}
          </p>
          <div class="space-y-6">
            <app-contact-info-item
              icon="mail"
              [label]="lang.t().contact.emailMe"
              [href]="'mailto:' + lang.t().contact.email"
              [value]="lang.t().contact.email"
            />
            <app-contact-info-item
              icon="phone"
              [label]="lang.t().contact.callMe"
              [href]="'tel:' + lang.t().contact.phone"
              [value]="lang.t().contact.phone"
            />
          </div>
        </div>

        <div appReveal>
          <app-contact-form />
        </div>
      </div>
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly lang = inject(LanguageService);
}
