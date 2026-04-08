import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, FormField, required, minLength, submit } from "@angular/forms/signals";
import { AppIcon } from '../icon/icon';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LanguageService } from '../../services/language.service';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [AppIcon, SectionHeader, Section, RevealDirective, FormField],
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
          <form class="space-y-6" (submit)="sendMessage($event)">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label for="name" class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{{ lang.t().contact.form.name }}</label>
                <input [formField]="contactForm.name" id="name" type="text" [placeholder]="lang.t().contact.form.namePlaceholder" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                @if (contactForm.name().invalid() && contactForm.name().touched()) {
                  @for (error of contactForm.name().errors(); track error.kind) {
                    <span class="text-red-500 text-sm bg-red-100 text-center p-2 rounded">{{ error.message }}</span>
                  }
                }
              </div>
              <div class="flex flex-col gap-2">
                <label for="email" class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{{ lang.t().contact.form.email }}</label>
                <input [formField]="contactForm.email" id="email" type="email" [placeholder]="lang.t().contact.form.emailPlaceholder" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                @if (contactForm.email().invalid() && contactForm.email().touched()) {
                  @for (error of contactForm.email().errors(); track error.kind) {
                    <span class="text-red-500 text-sm bg-red-100 text-center p-2 rounded">{{ error.message }}</span>
                  }
                }
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label for="message" class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{{ lang.t().contact.form.message }}</label>
              <textarea [formField]="contactForm.message" id="message" rows="5" [placeholder]="lang.t().contact.form.messagePlaceholder" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"></textarea>
              @if (contactForm.message().invalid() && contactForm.message().touched()) {
                  @for (error of contactForm.message().errors(); track error.kind) {
                    <span class="text-red-500 text-sm bg-red-100 text-center p-2 rounded">{{ error.message }}</span>
                  }
                }
            </div>
            <div class="flex flex-col gap-4">
              <button type="submit" class="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0">
                {{ lang.t().contact.form.send }}
              </button>
              @if (formSubmitted()) {
                <span class="text-green-500 text-sm bg-green-100 text-center p-2 rounded">{{ lang.t().contact.form.successMessage }}</span>
              }
            </div>
          </form>
        </div>
      </div>
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly lang = inject(LanguageService);

  protected readonly contactModel = signal<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  protected readonly contactForm = form(this.contactModel, (fieldPath) => {
    required(fieldPath.name, { message: this.lang.t().contact.form.validation.nameRequired });
    minLength(fieldPath.name, 2, { message: this.lang.t().contact.form.validation.minLengthName });
    required(fieldPath.email, { message: this.lang.t().contact.form.validation.emailRequired });
    email(fieldPath.email, { message: this.lang.t().contact.form.validation.emailInvalid });
    required(fieldPath.message, { message: this.lang.t().contact.form.validation.messageRequired });
    minLength(fieldPath.message, 10, { message: this.lang.t().contact.form.validation.minLenghtMessage });
  });

  protected readonly formSubmitted = signal(false);

  protected sendMessage(event: SubmitEvent): void {
    event.preventDefault();

    submit(this.contactForm, async () => {
      const data: ContactFormData = this.contactModel();
      console.log('Sending message:', data);
      
      new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        this.contactModel.set({
          name: '',
          email: '',
          message: '',
        });
        this.contactForm().reset();
        this.formSubmitted.set(true);

        setTimeout(() => {
          this.formSubmitted.set(false);
        }, 2000);
      });
    });
  }
}
