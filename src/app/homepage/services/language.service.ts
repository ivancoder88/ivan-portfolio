import { Injectable, signal, computed } from '@angular/core';
import { min } from 'rxjs';

export type Language = 'en' | 'hr';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language = signal<Language>('en');

  public readonly currentLanguage = this.language.asReadonly();

  private translations = {
    en: {
      name: 'Ivan Iviček',
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
        greeting: 'I am Ivan Iviček',
        role: 'Software Developer',
        bio: 'Civil engineer turned software developer — I bring a structured, analytical mindset to building modern web applications with NestJS, React, and Angular.',
        downloadCv: 'Download CV',
        stats: {
          experience: '6+ Years of experience',
          projects: '2 Software roles',
          clients: '2 Tech stacks',
          awards: 'MSc Civil Engineering'
        }
      },
      services: {
        title: 'What I Do',
        readMore: 'Read More',
        items: [
          {
            title: 'Frontend Development',
            description: 'Building reusable, maintainable UI components with React and Angular. Focus on clean architecture and long-term scalability.',
            icon: 'web'
          },
          {
            title: 'Backend & API Development',
            description: 'Designing and building microservices with NestJS. Experienced with BDD/TDD, event storming, and Scrum-based delivery.',
            icon: 'app'
          },
          {
            title: 'Technical Consulting',
            description: 'Bridging technical and domain knowledge — from software architecture to project planning, with a background in civil engineering project management.',
            icon: 'uiux'
          }
        ]
      },
      resume: {
        title: 'My Resume',
        experience: 'Experience',
        education: 'Education',
        experienceItems: [
          { year: '2024 - Present', title: 'Designer / Planner I', place: 'Vodoopskrba i Odvodnja d.o.o. — Zagreb, Croatia' },
          { year: '2019 - 2020', title: 'Software Developer', place: 'Mediatoolkit d.o.o. — Zagreb, Croatia' },
          { year: '2018 - 2019', title: 'Front End Developer', place: 'Point Jupiter — Zagreb, Croatia' },
          { year: '2022 - 2023', title: 'Construction Worker', place: 'Auto Iviček d.o.o. — Sesvete, Croatia' },
          { year: '2015 - 2018', title: 'Business Manager', place: 'Pansion Mario / Auto Iviček d.o.o. — Pag, Croatia' },
          { year: '2013 - 2015', title: 'Specialist — Legalization & Energy Certification', place: 'Gradea d.o.o. / Geoprojekt d.o.o. — Zagreb, Croatia' },
        ],
        educationItems: [
          { year: '2011 - 2013', title: 'MSc Civil Engineering (Mag. Ing. Aedif)', place: 'Faculty of Civil Engineering — Zagreb, Croatia' },
        ]
      },
      works: {
        title: 'My Works',
        comingSoonTitle: 'Projects Coming Soon',
        comingSoonDescription: "I'm currently working on personal projects to showcase here. In the meantime, feel free to reach out to learn more about my professional work.",
        items: []
      },
      skills: {
        title: 'My Skills',
        items: [
          { name: 'Angular', percentage: 90 },
          { name: 'React', percentage: 80 },
          { name: 'TypeScript', percentage: 85 },
          { name: 'NestJS', percentage: 80 },
          { name: 'Node.js', percentage: 75 },
          { name: 'BDD / TDD', percentage: 75 },
          { name: 'Docker', percentage: 65 },
          { name: 'AutoCAD', percentage: 70 },
        ]
      },
      testimonials: {
        title: 'Testimonials',
        comingSoonTitle: 'Testimonials Coming Soon',
        comingSoonDescription: "I haven't collected testimonials yet — but I'd love to hear from anyone I've worked with. Feel free to get in touch.",
        items: []
      },
      contact: {
        title: 'Get In Touch',
        heading: "Let's talk",
        description: "I'm open to new opportunities, freelance projects, or just a good conversation about software and engineering.",
        emailMe: 'Email Me',
        callMe: 'Call Me',
        email: 'ivicek.ivan@gmail.com',
        phone: '+385 099 585 9138',
        form: {
          name: 'Name',
          namePlaceholder: 'Your Name',
          email: 'Email',
          emailPlaceholder: 'Your Email',
          message: 'Message',
          messagePlaceholder: 'Your Message',
          send: 'Send Message',
          successMessage: 'Message sent successfully!',
          validation: {
            nameRequired: 'Name is required',
            emailRequired: 'Email is required',
            messageRequired: 'Message is required',
            emailInvalid: 'Invalid email address',
            minLengthName: 'Name must be at least 2 characters',
            minLenghtMessage: 'Message must be at least 10 characters'
          }
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
      name: 'Ivan Iviček',
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
        greeting: 'Ja sam Ivan Iviček',
        role: 'Softverski Programer',
        bio: 'Građevinski inženjer koji je prešao u softverski razvoj — analitičan pristup i strukturirano razmišljanje primjenjujem u izgradnji modernih web aplikacija s NestJS-om, Reactom i Angularom.',
        downloadCv: 'Preuzmi životopis',
        stats: {
          experience: '6+ Godina iskustva',
          projects: '2 Softverske uloge',
          clients: '2 Tech stacka',
          awards: 'Mag. Ing. Građevinarstva'
        }
      },
      services: {
        title: 'Što radim',
        readMore: 'Saznaj više',
        items: [
          {
            title: 'Frontend razvoj',
            description: 'Izrada višekratno upotrebljivih i održivih UI komponenti u Reactu i Angularu. Fokus na čistoj arhitekturi i dugoročnoj skalabilnosti.',
            icon: 'web'
          },
          {
            title: 'Backend i API razvoj',
            description: 'Dizajn i izgradnja mikroservisa s NestJS-om. Iskustvo s BDD/TDD pristupom, event stormingom i Scrum metodologijom.',
            icon: 'app'
          },
          {
            title: 'Tehničko savjetovanje',
            description: 'Premošćivanje tehničkog i domenskog znanja — od softverske arhitekture do planiranja projekata, uz pozadinu u upravljanju građevinskim projektima.',
            icon: 'uiux'
          }
        ]
      },
      resume: {
        title: 'Moj životopis',
        experience: 'Iskustvo',
        education: 'Obrazovanje',
        experienceItems: [
          { year: '2024 - Danas', title: 'Projektant I', place: 'Vodoopskrba i Odvodnja d.o.o. — Zagreb, Hrvatska' },
          { year: '2019 - 2020', title: 'Softverski programer', place: 'Mediatoolkit d.o.o. — Zagreb, Hrvatska' },
          { year: '2018 - 2019', title: 'Frontend programer', place: 'Point Jupiter — Zagreb, Hrvatska' },
          { year: '2022 - 2023', title: 'Građevinski radnik', place: 'Auto Iviček d.o.o. — Sesvete, Hrvatska' },
          { year: '2015 - 2018', title: 'Poslovni menadžer', place: 'Pansion Mario / Auto Iviček d.o.o. — Pag, Hrvatska' },
          { year: '2013 - 2015', title: 'Stručni suradnik — Legalizacija i energetsko certificiranje', place: 'Gradea d.o.o. / Geoprojekt d.o.o. — Zagreb, Hrvatska' },
        ],
        educationItems: [
          { year: '2011 - 2013', title: 'Magistar inženjer građevinarstva (Mag. Ing. Aedif)', place: 'Građevinski fakultet — Zagreb, Hrvatska' },
        ]
      },
      works: {
        title: 'Moji radovi',
        comingSoonTitle: 'Projekti uskoro',
        comingSoonDescription: 'Trenutno radim na osobnim projektima koje ću ovdje prikazati. U međuvremenu, slobodno me kontaktirajte za više informacija o mom profesionalnom radu.',
        items: []
      },
      skills: {
        title: 'Moje vještine',
        items: [
          { name: 'Angular', percentage: 90 },
          { name: 'React', percentage: 80 },
          { name: 'TypeScript', percentage: 85 },
          { name: 'NestJS', percentage: 80 },
          { name: 'Node.js', percentage: 75 },
          { name: 'BDD / TDD', percentage: 75 },
          { name: 'Docker', percentage: 65 },
          { name: 'AutoCAD', percentage: 70 },
        ]
      },
      testimonials: {
        title: 'Recenzije',
        comingSoonTitle: 'Recenzije uskoro',
        comingSoonDescription: 'Još nisam prikupio recenzije — ali rado bih čuo od svakoga s kim sam surađivao. Slobodno me kontaktirajte.',
        items: []
      },
      contact: {
        title: 'Kontaktirajte me',
        heading: 'Razgovarajmo',
        description: 'Otvoren sam za nove prilike, freelance projekte ili jednostavno dobar razgovor o softveru i inženjerstvu.',
        emailMe: 'Pošaljite email',
        callMe: 'Nazovite me',
        email: 'ivicek.ivan@gmail.com',
        phone: '+385 099 585 9138',
        form: {
          name: 'Ime',
          namePlaceholder: 'Vaše ime',
          email: 'Email',
          emailPlaceholder: 'Vaš email',
          message: 'Poruka',
          messagePlaceholder: 'Vaša poruka',
          send: 'Pošalji poruku',
          successMessage: 'Poruka uspješno poslana!',
          validation: {
            nameRequired: 'Ime je obavezno',
            emailRequired: 'Email je obavezan',
            messageRequired: 'Poruka je obavezna',
            emailInvalid: 'Neispravna email adresa',
            minLengthName: 'Ime mora imati najmanje 2 znaka',
            minLenghtMessage: 'Poruka mora imati najmanje 10 znakova'
          }
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
