import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'hr';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language = signal<Language>('en');

  public readonly currentLanguage = this.language.asReadonly();

  private translations = {
    en: {
      nav: {
        home: 'Home',
        services: 'Services',
        works: 'Works',
        resume: 'Resume',
        skills: 'Skills',
        testimonials: 'Testimonials',
        contact: 'Contact',
        hireMe: 'Hire me'
      },
      hero: {
        greeting: 'I am Ivan Ivicek',
        role: 'Software Developer',
        bio: 'Seamlessly blending the worlds of code and creativity as a Software developer creating captivating digital experiences',
        downloadCv: 'Download CV',
        stats: {
          experience: '5+ Years of experience',
          projects: '90+ Projects Completed',
          clients: '105+ Happy Clients',
          awards: '15+ Honors and awards'
        }
      },
      services: {
        title: 'My Quality Services'
      }
    },
    hr: {
      nav: {
        home: 'Početna',
        services: 'Usluge',
        works: 'Radovi',
        resume: 'Životopis',
        skills: 'Vještine',
        testimonials: 'Recenzije',
        contact: 'Kontakt',
        hireMe: 'Zaposli me'
      },
      hero: {
        greeting: 'Ja sam Ivan Ivicek',
        role: 'Softverski Inženjer',
        bio: 'Besprijekorno spajam svjetove koda i kreativnosti kao softverski programer stvarajući zadivljujuća digitalna iskustva',
        downloadCv: 'Preuzmi životopis',
        stats: {
          experience: '5+ Godina iskustva',
          projects: '90+ Završenih projekata',
          clients: '105+ Sretnih klijenata',
          awards: '15+ Priznanja i nagrada'
        }
      },
      services: {
        title: 'Moje kvalitetne usluge'
      }
    }
  };

  public readonly t = computed(() => this.translations[this.language()]);

  public setLanguage(lang: Language): void {
    this.language.set(lang);
  }

  public toggleLanguage(): void {
    this.language.update(l => l === 'en' ? 'hr' : 'en');
  }
}
