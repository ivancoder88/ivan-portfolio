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
        works: 'Timeline',
        resume: 'Resume',
        skills: 'Skills',
        testimonials: 'Tech Stack',
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
      timeline: {
        title: 'Experience Timeline',
        present: 'Present',
        items: [
          {
            year: '2024',
            endYear: 'Present',
            title: 'Designer / Planner I',
            company: 'Vodoopskrba i Odvodnja d.o.o.',
            location: 'Zagreb, Croatia',
            type: 'engineering',
            description: 'Working on water supply system development and monitoring. Managing smaller-scale projects through planning and design phases, preparing tender documentation, and participating in hydraulic model development.',
            tags: ['AutoCAD', 'Project Management', 'Hydraulic Modelling', 'Tender Documentation']
          },
          {
            year: '2022',
            endYear: '2023',
            title: 'Construction Worker',
            company: 'Auto Iviček d.o.o.',
            location: 'Sesvete, Croatia',
            type: 'other',
            description: 'Auxiliary worker on various construction projects.',
            tags: ['Construction']
          },
          {
            year: '2019',
            endYear: '2020',
            title: 'Software Developer',
            company: 'Mediatoolkit d.o.o.',
            location: 'Zagreb, Croatia',
            type: 'software',
            description: 'Built microservices using the NestJS framework. Applied BDD/TDD practices to maintain high code quality, used event storming for domain understanding, and worked in a Scrum team.',
            tags: ['NestJS', 'TypeScript', 'BDD/TDD', 'Event Storming', 'Scrum', 'Microservices']
          },
          {
            year: '2018',
            endYear: '2019',
            title: 'Front End Developer',
            company: 'Point Jupiter',
            location: 'Zagreb, Croatia',
            type: 'software',
            description: 'Created reusable React components, solved architectural challenges, integrated new features, and maintained the existing codebase. Collaborated closely with backend developers, UI/UX designers, and third-party clients.',
            tags: ['React', 'JavaScript', 'UI/UX Collaboration', 'Architecture']
          },
          {
            year: '2015',
            endYear: '2018',
            title: 'Business Manager',
            company: 'Pansion Mario / Auto Iviček d.o.o.',
            location: 'Pag, Croatia',
            type: 'other',
            description: 'Managed guest reservations and transport, oversaw restaurant supplies, and coordinated kitchen and cleaning staff.',
            tags: ['Management', 'Operations', 'Coordination']
          },
          {
            year: '2013',
            endYear: '2015',
            title: 'Specialist — Legalization & Energy Certification',
            company: 'Gradea d.o.o. / Geoprojekt d.o.o.',
            location: 'Zagreb, Croatia',
            type: 'engineering',
            description: 'Performed building measurements, produced architectural drawings in AutoCAD, and prepared technical documentation and reports.',
            tags: ['AutoCAD', 'Technical Documentation', 'Energy Certification']
          },
        ]
      },
      techStack: {
        title: 'Tech Stack',
        categories: [
          {
            name: 'Frontend',
            items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML / CSS']
          },
          {
            name: 'Backend',
            items: ['NestJS', 'Node.js', 'REST APIs', 'Microservices']
          },
          {
            name: 'Practices',
            items: ['BDD / TDD', 'Event Storming', 'Scrum / Agile', 'Code Review']
          },
          {
            name: 'Tools & Infra',
            items: ['Docker', 'Git', 'AutoCAD', 'Linux']
          }
        ]
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
        works: 'Vremenski slijed',
        resume: 'Životopis',
        skills: 'Vještine',
        testimonials: 'Tech Stack',
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
      timeline: {
        title: 'Vremenski slijed iskustva',
        present: 'Danas',
        items: [
          {
            year: '2024',
            endYear: 'Danas',
            title: 'Projektant I',
            company: 'Vodoopskrba i Odvodnja d.o.o.',
            location: 'Zagreb, Hrvatska',
            type: 'engineering',
            description: 'Rad na praćenju stanja i razvoju vodoopskrbnog sustava. Upravljanje projektima manje složenosti u fazi planiranja i projektiranja, izrada natječajne dokumentacije te sudjelovanje u razvoju hidrauličkog modela.',
            tags: ['AutoCAD', 'Upravljanje projektima', 'Hidrauličko modeliranje', 'Natječajna dokumentacija']
          },
          {
            year: '2022',
            endYear: '2023',
            title: 'Građevinski radnik',
            company: 'Auto Iviček d.o.o.',
            location: 'Sesvete, Hrvatska',
            type: 'other',
            description: 'Pomoćni radnik na raznim građevinskim radovima.',
            tags: ['Građevinarstvo']
          },
          {
            year: '2019',
            endYear: '2020',
            title: 'Softverski programer',
            company: 'Mediatoolkit d.o.o.',
            location: 'Zagreb, Hrvatska',
            type: 'software',
            description: 'Izgradnja mikroservisa koristeći NestJS framework. Primjena BDD/TDD pristupa za visoku kvalitetu koda, korištenje event storming tehnike za razumijevanje domene te rad u Scrum timu.',
            tags: ['NestJS', 'TypeScript', 'BDD/TDD', 'Event Storming', 'Scrum', 'Mikroservisi']
          },
          {
            year: '2018',
            endYear: '2019',
            title: 'Frontend programer',
            company: 'Point Jupiter',
            location: 'Zagreb, Hrvatska',
            type: 'software',
            description: 'Izrada višekratno upotrebljivih React komponenti, rješavanje arhitekturalnih izazova, integracija novih značajki i održavanje baze koda. Uska suradnja s backend programerima, UI/UX dizajnerima i klijentima.',
            tags: ['React', 'JavaScript', 'UI/UX suradnja', 'Arhitektura']
          },
          {
            year: '2015',
            endYear: '2018',
            title: 'Poslovni menadžer',
            company: 'Pansion Mario / Auto Iviček d.o.o.',
            location: 'Pag, Hrvatska',
            type: 'other',
            description: 'Upravljanje rezervacijama i transportom gostiju, nabava potrepština restorana te koordinacija osoblja.',
            tags: ['Menadžment', 'Operacije', 'Koordinacija']
          },
          {
            year: '2013',
            endYear: '2015',
            title: 'Stručni suradnik — Legalizacija i energetsko certificiranje',
            company: 'Gradea d.o.o. / Geoprojekt d.o.o.',
            location: 'Zagreb, Hrvatska',
            type: 'engineering',
            description: 'Izvođenje građevinskih mjerenja, izrada arhitektonskih crteža u AutoCAD-u te priprema tehničke dokumentacije i elaborata.',
            tags: ['AutoCAD', 'Tehnička dokumentacija', 'Energetsko certificiranje']
          },
        ]
      },
      techStack: {
        title: 'Tech Stack',
        categories: [
          {
            name: 'Frontend',
            items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML / CSS']
          },
          {
            name: 'Backend',
            items: ['NestJS', 'Node.js', 'REST API-ji', 'Mikroservisi']
          },
          {
            name: 'Prakse',
            items: ['BDD / TDD', 'Event Storming', 'Scrum / Agile', 'Code Review']
          },
          {
            name: 'Alati i infrastruktura',
            items: ['Docker', 'Git', 'AutoCAD', 'Linux']
          }
        ]
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
