import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, FormField, required, minLength, submit } from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../../services/language.service';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  imports: [FormField],
  template: `
    <div class="bg-slate-50 dark:bg-slate-800/50 p-8 md:p-12 rounded-3xl">
      <form class="space-y-6" (submit)="sendMessage($event)">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-2">
            <label for="contact-name" class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {{ lang.t().contact.form.name }}
            </label>
            <input
              [formField]="contactForm.name"
              id="contact-name"
              type="text"
              [placeholder]="lang.t().contact.form.namePlaceholder"
              class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            @if (contactForm.name().invalid() && contactForm.name().touched()) {
              @for (error of contactForm.name().errors(); track error.kind) {
                <span class="text-red-500 text-sm bg-red-100 text-center p-2 rounded">{{ error.message }}</span>
              }
            }
          </div>
          <div class="flex flex-col gap-2">
            <label for="contact-email" class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {{ lang.t().contact.form.email }}
            </label>
            <input
              [formField]="contactForm.email"
              id="contact-email"
              type="email"
              [placeholder]="lang.t().contact.form.emailPlaceholder"
              class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            @if (contactForm.email().invalid() && contactForm.email().touched()) {
              @for (error of contactForm.email().errors(); track error.kind) {
                <span class="text-red-500 text-sm bg-red-100 text-center p-2 rounded">{{ error.message }}</span>
              }
            }
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label for="contact-message" class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {{ lang.t().contact.form.message }}
          </label>
          <textarea
            [formField]="contactForm.message"
            id="contact-message"
            rows="5"
            [placeholder]="lang.t().contact.form.messagePlaceholder"
            class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          ></textarea>
          @if (contactForm.message().invalid() && contactForm.message().touched()) {
            @for (error of contactForm.message().errors(); track error.kind) {
              <span class="text-red-500 text-sm bg-red-100 text-center p-2 rounded">{{ error.message }}</span>
            }
          }
        </div>

        <div class="flex flex-col gap-4">
          <button
            type="submit"
            [disabled]="sending()"
            class="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {{ sending() ? lang.t().contact.form.sending : lang.t().contact.form.send }}
          </button>
          @if (formSubmitted()) {
            <span class="text-green-500 text-sm bg-green-100 text-center p-2 rounded">
              {{ lang.t().contact.form.successMessage }}
            </span>
          }
          @if (submitError()) {
            <span class="text-red-500 text-sm bg-red-100 text-center p-2 rounded">{{ submitError() }}</span>
          }
        </div>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  protected readonly lang = inject(LanguageService);
  private readonly http = inject(HttpClient);

  private readonly contactModel = signal<ContactFormData>({ name: '', email: '', message: '' });

  protected readonly contactForm = form(this.contactModel, (fieldPath) => {
    required(fieldPath.name, { message: this.lang.t().contact.form.validation.nameRequired });
    minLength(fieldPath.name, 2, { message: this.lang.t().contact.form.validation.minLengthName });
    required(fieldPath.email, { message: this.lang.t().contact.form.validation.emailRequired });
    email(fieldPath.email, { message: this.lang.t().contact.form.validation.emailInvalid });
    required(fieldPath.message, { message: this.lang.t().contact.form.validation.messageRequired });
    minLength(fieldPath.message, 10, { message: this.lang.t().contact.form.validation.minLenghtMessage });
  });

  protected readonly formSubmitted = signal(false);
  protected readonly sending = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected sendMessage(event: SubmitEvent): void {
    event.preventDefault();
    submit(this.contactForm, async () => {
      this.sending.set(true);
      this.submitError.set(null);
      this.http.post('/api/contact', this.contactModel()).subscribe({
        next: () => {
          this.contactModel.set({ name: '', email: '', message: '' });
          this.contactForm().reset();
          this.formSubmitted.set(true);
          this.sending.set(false);
          setTimeout(() => this.formSubmitted.set(false), 3000);
        },
        error: () => {
          this.submitError.set(this.lang.t().contact.form.errorMessage ?? 'Something went wrong. Please try again.');
          this.sending.set(false);
        },
      });
    });
  }
}
