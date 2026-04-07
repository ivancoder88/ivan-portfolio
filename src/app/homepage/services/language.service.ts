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
      name: 'Ivan Ivicek',
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
        title: 'My Quality Services',
        readMore: 'Read More',
        items: [
          {
            title: 'Web Development',
            description: 'Building modern, responsive, and high-performance web applications using the latest technologies.',
            icon: 'web'
          },
          {
            title: 'UI/UX Design',
            description: 'Creating intuitive and visually appealing user interfaces that provide seamless digital experiences.',
            icon: 'uiux'
          },
          {
            title: 'App Development',
            description: 'Developing native and cross-platform mobile applications with focus on performance and usability.',
            icon: 'app'
          }
        ]
      },
      resume: {
        title: 'My Resume',
        experience: 'Experience',
        education: 'Education',
        experienceItems: [
          { year: '2022 - Present', title: 'Senior Software Developer', place: 'Tech Solutions Inc.' },
          { year: '2020 - 2022', title: 'Full Stack Developer', place: 'Creative Digital Agency' },
          { year: '2018 - 2020', title: 'Junior Developer', place: 'Startup Hub' },
        ],
        educationItems: [
          { year: '2014 - 2018', title: 'Bachelor of Computer Science', place: 'University of Zagreb' },
          { year: '2010 - 2014', title: 'High School Diploma', place: 'Informatics High School' },
        ]
      },
      works: {
        title: 'My Works',
        items: [
          { title: 'Digital Agency Website', category: 'Web Development' },
          { title: 'E-commerce Mobile App', category: 'App Design' },
          { title: 'Personal Brand Identity', category: 'Branding' },
          { title: 'SaaS Dashboard', category: 'UI/UX Design' },
        ]
      },
      skills: {
        title: 'My Skills',
        items: [
          { name: 'Angular', percentage: 95 },
          { name: 'TypeScript', percentage: 90 },
          { name: 'Tailwind CSS', percentage: 85 },
          { name: 'Node.js', percentage: 80 },
          { name: 'PostgreSQL', percentage: 75 },
          { name: 'Docker', percentage: 70 },
          { name: 'AWS', percentage: 65 },
          { name: 'Figma', percentage: 60 },
        ]
      },
      testimonials: {
        title: 'What Clients Say',
        items: [
          { name: 'John Doe', role: 'CEO at Tech Corp', content: 'Ivan is an exceptional developer who transformed our vision into a stunning digital reality. His attention to detail and technical expertise are unmatched.' },
          { name: 'Jane Smith', role: 'Marketing Manager', content: 'Working with Ivan was a breeze. He delivered our project on time and exceeded our expectations in every way. Highly recommended!' },
          { name: 'Michael Brown', role: 'Entrepreneur', content: 'The best software developer I have ever worked with. Smart, creative, and very professional. The results speak for themselves.' },
        ]
      },
      contact: {
        title: 'Get In Touch',
        heading: "Let's talk about your project",
        description: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
        emailMe: 'Email Me',
        callMe: 'Call Me',
        form: {
          name: 'Name',
          namePlaceholder: 'Your Name',
          email: 'Email',
          emailPlaceholder: 'Your Email',
          message: 'Message',
          messagePlaceholder: 'Your Message',
          send: 'Send Message'
        }
      },
      footer: {
        rights: 'All rights reserved.',
        social: {
          twitter: 'Twitter',
          linkedin: 'LinkedIn',
          github: 'GitHub',
          instagram: 'Instagram',
          facebook: 'Facebook'
        }
      }
    },
    hr: {
      name: 'Ivan Ivicek',
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
        title: 'Moje kvalitetne usluge',
        readMore: 'Saznaj više',
        items: [
          {
            title: 'Web Razvoj',
            description: 'Izrada modernih, responzivnih i visokoučinkovitih web aplikacija koristeći najnovije tehnologije.',
            icon: 'web'
          },
          {
            title: 'UI/UX Dizajn',
            description: 'Stvaranje intuitivnih i vizualno privlačnih korisničkih sučelja koja pružaju besprijekorno digitalno iskustvo.',
            icon: 'uiux'
          },
          {
            title: 'Razvoj Aplikacija',
            description: 'Razvoj nativnih i višeplatformskih mobilnih aplikacija s fokusom na performanse i upotrebljivost.',
            icon: 'app'
          }
        ]
      },
      resume: {
        title: 'Moj životopis',
        experience: 'Iskustvo',
        education: 'Obrazovanje',
        experienceItems: [
          { year: '2022 - Danas', title: 'Senior Softverski Inženjer', place: 'Tech Solutions Inc.' },
          { year: '2020 - 2022', title: 'Full Stack Programer', place: 'Creative Digital Agency' },
          { year: '2018 - 2020', title: 'Junior Programer', place: 'Startup Hub' },
        ],
        educationItems: [
          { year: '2014 - 2018', title: 'Prvostupnik računarstva', place: 'Sveučilište u Zagrebu' },
          { year: '2010 - 2014', title: 'Gimnazijska diploma', place: 'Informatička gimnazija' },
        ]
      },
      works: {
        title: 'Moji radovi',
        items: [
          { title: 'Web stranica digitalne agencije', category: 'Web razvoj' },
          { title: 'E-commerce mobilna aplikacija', category: 'Dizajn aplikacije' },
          { title: 'Identitet osobnog brenda', category: 'Brendiranje' },
          { title: 'SaaS nadzorna ploča', category: 'UI/UX dizajn' },
        ]
      },
      skills: {
        title: 'Moje vještine',
        items: [
          { name: 'Angular', percentage: 95 },
          { name: 'TypeScript', percentage: 90 },
          { name: 'Tailwind CSS', percentage: 85 },
          { name: 'Node.js', percentage: 80 },
          { name: 'PostgreSQL', percentage: 75 },
          { name: 'Docker', percentage: 70 },
          { name: 'AWS', percentage: 65 },
          { name: 'Figma', percentage: 60 },
        ]
      },
      testimonials: {
        title: 'Što klijenti kažu',
        items: [
          { name: 'John Doe', role: 'Direktor u Tech Corp', content: 'Ivan je izuzetan programer koji je našu viziju pretvorio u zadivljujuću digitalnu stvarnost. Njegova pažnja posvećena detaljima i tehnička stručnost su bez premca.' },
          { name: 'Jane Smith', role: 'Voditelj marketinga', content: 'Rad s Ivanom bio je užitak. Isporučio je naš projekt na vrijeme i nadmašio naša očekivanja u svakom pogledu. Toplo preporučujem!' },
          { name: 'Michael Brown', role: 'Poduzetnik', content: 'Najbolji softverski programer s kojim sam ikada radio. Pametan, kreativan i vrlo profesionalan. Rezultati govore sami za sebe.' },
        ]
      },
      contact: {
        title: 'Kontaktirajte me',
        heading: "Razgovarajmo o vašem projektu",
        description: "Uvijek sam otvoren za raspravu o novim projektima, kreativnim idejama ili prilikama da budem dio vaših vizija.",
        emailMe: 'Pošaljite email',
        callMe: 'Nazovite me',
        form: {
          name: 'Ime',
          namePlaceholder: 'Vaše ime',
          email: 'Email',
          emailPlaceholder: 'Vaš email',
          message: 'Poruka',
          messagePlaceholder: 'Vaša poruka',
          send: 'Pošalji poruku'
        }
      },
      footer: {
        rights: 'Sva prava pridržana.',
        social: {
          twitter: 'Twitter',
          linkedin: 'LinkedIn',
          github: 'GitHub',
          instagram: 'Instagram',
          facebook: 'Facebook'
        }
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
