import { ChangeDetectionStrategy, Component, ElementRef, viewChildren, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  template: `
    <section id="contact" class="w-full py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 reveal" #reveal>
          <h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">Get In Touch</h2>
          <div class="w-24 h-1 bg-slate-900 dark:bg-white mx-auto"></div>
        </div>

        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Contact Info -->
          <div class="reveal" #reveal>
            <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">Let's talk about your project</h3>
            <p class="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-lg">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div class="space-y-6">
              <div class="flex items-center gap-6 group">
                <div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <span class="block text-sm text-slate-500 font-bold uppercase tracking-wider">Email Me</span>
                  <a href="mailto:ivan@example.com" class="text-xl font-bold text-slate-900 dark:text-white hover:underline">ivan@example.com</a>
                </div>
              </div>

              <div class="flex items-center gap-6 group">
                <div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H3.75A2.25 2.25 0 001.5 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <span class="block text-sm text-slate-500 font-bold uppercase tracking-wider">Call Me</span>
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
                  <input type="text" placeholder="Your Name" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all">
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Email</label>
                  <input type="email" placeholder="Your Email" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all">
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Message</label>
                <textarea rows="5" placeholder="Your Message" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all"></textarea>
              </div>
              <button class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0">
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
export class Contact implements AfterViewInit {
  protected readonly revealElements = viewChildren<ElementRef>('reveal');

  public ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    this.revealElements().forEach(el => observer.observe(el.nativeElement));
  }
}
