import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppIcon } from '../icon/icon';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [AppIcon, SectionHeader, Section, RevealDirective],
  template: `
    <app-section id="contact">
      <app-section-header [title]="lang.t().contact.title" />

      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Contact Info -->
        <div appReveal>
          <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">{{ lang.t().contact.heading }}</h3>
          <p class="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-lg">
            {{ lang.t().contact.description }}
          </p>
          
          <div class="space-y-6">
            <div class="flex items-center gap-6 group">
              <div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <app-icon name="mail" class="w-6 h-6" />
              </div>
              <div>
                <span class="block text-sm text-primary font-bold uppercase tracking-wider">{{ lang.t().contact.emailMe }}</span>
                <a href="mailto:ivan@example.com" class="text-xl font-bold text-slate-900 dark:text-white hover:underline">ivan@example.com</a>
              </div>
            </div>

            <div class="flex items-center gap-6 group">
              <div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <app-icon name="phone" class="w-6 h-6" />
              </div>
              <div>
                <span class="block text-sm text-primary font-bold uppercase tracking-wider">{{ lang.t().contact.callMe }}</span>
                <a href="tel:+123456789" class="text-xl font-bold text-slate-900 dark:text-white hover:underline">+123 456 789</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div appReveal class="bg-slate-50 dark:bg-slate-800/50 p-8 md:p-12 rounded-3xl">
          <form class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{{ lang.t().contact.form.name }}</label>
                <input type="text" [placeholder]="lang.t().contact.form.namePlaceholder" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all">
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{{ lang.t().contact.form.email }}</label>
                <input type="email" [placeholder]="lang.t().contact.form.emailPlaceholder" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all">
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{{ lang.t().contact.form.message }}</label>
              <textarea rows="5" [placeholder]="lang.t().contact.form.messagePlaceholder" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"></textarea>
            </div>
            <button class="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0">
              {{ lang.t().contact.form.send }}
            </button>
          </form>
        </div>
      </div>
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly lang = inject(LanguageService);
}
