import { ChangeDetectionStrategy, Component, ElementRef, viewChildren, AfterViewInit } from '@angular/core';

interface ResumeItem {
  year: string;
  title: string;
  place: string;
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [],
  template: `
    <section id="resume" class="w-full py-24 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 reveal" #reveal>
          <h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">My Resume</h2>
          <div class="w-24 h-1 bg-slate-900 dark:bg-white mx-auto"></div>
        </div>

        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Experience -->
          <div>
            <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-4 reveal" #reveal>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H18.75m-15 0a2.25 2.25 0 00-2.25 2.25H5.25m15 0V11.75c0-.621-.504-1.125-1.125-1.125h-4.375c-.621 0-1.125.504-1.125 1.125v1.4m-1.5 1.5l1.5-1.5m0 0l-1.5-1.5m1.5 1.5H10.5M5.25 10.5h13.5" />
              </svg>
              Experience
            </h3>
            <div class="space-y-8">
              @for (item of experience; track item.title; let i = $index) {
                <div 
                  class="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all reveal" 
                  #reveal
                  [style.transition-delay]="i * 100 + 'ms'"
                >
                  <span class="text-slate-500 font-bold mb-2 block uppercase tracking-wider">{{ item.year }}</span>
                  <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-1">{{ item.title }}</h4>
                  <p class="text-slate-600 dark:text-slate-400 font-medium">{{ item.place }}</p>
                </div>
              }
            </div>
          </div>

          <!-- Education -->
          <div>
            <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-4 reveal" #reveal>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147L12 14.654l7.74-4.507a.75.75 0 01.76 1.288l-8 4.663a.75.75 0 01-.76 0l-8-4.663a.75.75 0 01.76-1.288z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 5.487L12 9.994l7.74-4.507a.75.75 0 01.76 1.288l-8 4.663a.75.75 0 01-.76 0l-8-4.663a.75.75 0 01.76-1.288z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 14.807L12 19.314l7.74-4.507a.75.75 0 01.76 1.288l-8 4.663a.75.75 0 01-.76 0l-8-4.663a.75.75 0 01.76-1.288z" />
              </svg>
              Education
            </h3>
            <div class="space-y-8">
              @for (item of education; track item.title; let i = $index) {
                <div 
                  class="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all reveal" 
                  #reveal
                  [style.transition-delay]="i * 100 + 'ms'"
                >
                  <span class="text-slate-500 font-bold mb-2 block uppercase tracking-wider">{{ item.year }}</span>
                  <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-1">{{ item.title }}</h4>
                  <p class="text-slate-600 dark:text-slate-400 font-medium">{{ item.place }}</p>
                </div>
              }
            </div>
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
export class Resume implements AfterViewInit {
  protected readonly experience: ResumeItem[] = [
    { year: '2022 - Present', title: 'Senior Software Developer', place: 'Tech Solutions Inc.' },
    { year: '2020 - 2022', title: 'Full Stack Developer', place: 'Creative Digital Agency' },
    { year: '2018 - 2020', title: 'Junior Developer', place: 'Startup Hub' },
  ];

  protected readonly education: ResumeItem[] = [
    { year: '2014 - 2018', title: 'Bachelor of Computer Science', place: 'University of Zagreb' },
    { year: '2010 - 2014', title: 'High School Diploma', place: 'Informatics High School' },
  ];

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
