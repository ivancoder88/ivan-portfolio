import { ChangeDetectionStrategy, Component, ElementRef, viewChildren, afterNextRender } from '@angular/core';
import { AppIcon } from '../icon/icon';
import { SectionHeader } from '../section-header/section-header';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [AppIcon, SectionHeader],
  template: `
    <section id="contact" class="w-full py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <app-section-header title="Get In Touch" />

        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Contact Info -->
          <div class="reveal" #reveal>
            <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">Let's talk about your project</h3>
            <p class="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-lg">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div class="space-y-6">
              <div class="flex items-center gap-6 group">
                <div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <app-icon name="mail" class="w-6 h-6" />
                </div>
                <div>
                  <span class="block text-sm text-primary font-bold uppercase tracking-wider">Email Me</span>
                  <a href="mailto:ivan@example.com" class="text-xl font-bold text-slate-900 dark:text-white hover:underline">ivan@example.com</a>
                </div>
              </div>

              <div class="flex items-center gap-6 group">
                <div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <app-icon name="phone" class="w-6 h-6" />
                </div>
                <div>
                  <span class="block text-sm text-primary font-bold uppercase tracking-wider">Call Me</span>
                  <a href="tel:+123456789" class="text-xl font-bold text-slate-900 dark:text-white hover:underline">+123 456 789</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-slate-50 dark:bg-slate-800/50 p-8 md:p-12 rounded-3xl reveal" #reveal>
            <form class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Name</label>
                  <input type="text" placeholder="Your Name" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Email</label>
                  <input type="email" placeholder="Your Email" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Message</label>
                <textarea rows="5" placeholder="Your Message" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"></textarea>
              </div>
              <button class="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <style>
      .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
      }
      .reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }
    </style>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly revealElements = viewChildren<ElementRef>('reveal');

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      this.revealElements().forEach(el => observer.observe(el.nativeElement));
    });
  }
}
