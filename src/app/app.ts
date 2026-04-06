import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from './homepage/components/navbar/navbar';
import { Hero } from './homepage/components/hero/hero';
import { Services } from './homepage/components/services/services';
import { Works } from './homepage/components/works/works';
import { Resume } from './homepage/components/resume/resume';
import { Skills } from './homepage/components/skills/skills';
import { Testimonials } from './homepage/components/testimonials/testimonials';
import { Contact } from './homepage/components/contact/contact';
import { Footer } from './homepage/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar, 
    Hero, 
    Services, 
    Works, 
    Resume, 
    Skills, 
    Testimonials, 
    Contact, 
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
