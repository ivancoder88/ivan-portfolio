import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../../homepage/services/language.service';
import type { TimelineItem } from '../../homepage/services/language.service';

type Tab = 'hero' | 'services' | 'skills' | 'timeline' | 'techstack' | 'contact';
type Lang = 'en' | 'hr';
type Draft = ReturnType<LanguageService['getCurrentTranslations']>;

const FIELD_LABEL = 'block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1';
const FIELD_INPUT = 'w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all';
const CARD = 'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4';
const SECTION_LABEL = 'font-bold text-xs tracking-widest uppercase mb-4 block text-primary';
const DIVIDER = 'space-y-2 pb-5 border-b border-slate-100 dark:border-slate-700 mb-4';
const ADD_BTN = 'flex items-center gap-2 text-sm text-primary font-semibold hover:underline';
const DEL_BTN = 'text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex-shrink-0';

@Component({
  selector: 'app-page-customization',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6 max-w-7xl">

      <!-- Header -->
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Page Customization</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Edit homepage content for English and Croatian</p>
        </div>
        <div class="flex items-center gap-3">
          @if (saved()) {
            <span class="text-green-600 text-sm font-medium bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-3 py-1.5 rounded-lg">
              ✓ Saved successfully
            </span>
          }
          @if (saveError()) {
            <span class="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-lg">
              {{ saveError() }}
            </span>
          }
          <button
            (click)="save()"
            [disabled]="saving() || !draft()"
            class="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {{ saving() ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl w-fit flex-wrap">
        @for (tab of tabs; track tab.id) {
          <button
            (click)="activeTab.set(tab.id)"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            [class.bg-white]="activeTab() === tab.id"
            [class.dark:bg-slate-700]="activeTab() === tab.id"
            [class.text-primary]="activeTab() === tab.id"
            [class.shadow-sm]="activeTab() === tab.id"
            [class.text-slate-500]="activeTab() !== tab.id"
          >{{ tab.label }}</button>
        }
      </div>

      @if (!draft()) {
        <div class="flex items-center gap-3 text-slate-400 py-12 justify-center">
          <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Loading content...
        </div>
      } @else {

        <!-- ===== HERO ===== -->
        @if (activeTab() === 'hero') {
          <div class="grid lg:grid-cols-2 gap-6">
            @for (lang of langOptions; track lang.key) {
              <div class="${CARD}">
                <span class="${SECTION_LABEL}">{{ lang.label }}</span>
                <label class="block">
                  <span class="${FIELD_LABEL}">Full Name</span>
                  <input class="${FIELD_INPUT}" [(ngModel)]="draft()![lang.key].name" [name]="'name-'+lang.key" />
                </label>
                <label class="block">
                  <span class="${FIELD_LABEL}">Greeting line</span>
                  <input class="${FIELD_INPUT}" [(ngModel)]="draft()![lang.key].hero.greeting" [name]="'greeting-'+lang.key" />
                </label>
                <label class="block">
                  <span class="${FIELD_LABEL}">Role / Title</span>
                  <input class="${FIELD_INPUT}" [(ngModel)]="draft()![lang.key].hero.role" [name]="'role-'+lang.key" />
                </label>
                <label class="block">
                  <span class="${FIELD_LABEL}">Bio</span>
                  <textarea class="${FIELD_INPUT}" rows="4" [(ngModel)]="draft()![lang.key].hero.bio" [name]="'bio-'+lang.key"></textarea>
                </label>
                <label class="block">
                  <span class="${FIELD_LABEL}">Download CV button label</span>
                  <input class="${FIELD_INPUT}" [(ngModel)]="draft()![lang.key].hero.downloadCv" [name]="'cv-'+lang.key" />
                </label>
                <p class="${FIELD_LABEL} pt-2">Stats</p>
                <div class="grid grid-cols-2 gap-3">
                  <label class="block">
                    <span class="${FIELD_LABEL}">Experience</span>
                    <input class="${FIELD_INPUT}" [(ngModel)]="draft()![lang.key].hero.stats.experience" [name]="'exp-'+lang.key" />
                  </label>
                  <label class="block">
                    <span class="${FIELD_LABEL}">Projects</span>
                    <input class="${FIELD_INPUT}" [(ngModel)]="draft()![lang.key].hero.stats.projects" [name]="'proj-'+lang.key" />
                  </label>
                  <label class="block">
                    <span class="${FIELD_LABEL}">Clients</span>
                    <input class="${FIELD_INPUT}" [(ngModel)]="draft()![lang.key].hero.stats.clients" [name]="'clients-'+lang.key" />
                  </label>
                  <label class="block">
                    <span class="${FIELD_LABEL}">Awards</span>
                    <input class="${FIELD_INPUT}" [(ngModel)]="draft()![lang.key].hero.stats.awards" [name]="'awards-'+lang.key" />
                  </label>
                </div>
              </div>
            }
          </div>
        }

        <!-- ===== SERVICES ===== -->
        @if (activeTab() === 'services') {
          <div class="grid lg:grid-cols-2 gap-6">
            @for (lang of langOptions; track lang.key) {
              <div class="${CARD}">
                <span class="${SECTION_LABEL}">{{ lang.label }}</span>
                @for (svc of draft()![lang.key].services.items; track $index) {
                  <div class="${DIVIDER}">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-slate-400 uppercase">Service {{ $index + 1 }}</span>
                      <button (click)="removeItem(lang.key, 'services', $index)" class="${DEL_BTN}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                    <input class="${FIELD_INPUT}" [(ngModel)]="svc.title" [name]="'svc-t-'+lang.key+$index" placeholder="Title" />
                    <textarea class="${FIELD_INPUT}" rows="3" [(ngModel)]="svc.description" [name]="'svc-d-'+lang.key+$index" placeholder="Description"></textarea>
                  </div>
                }
                <button (click)="addService(lang.key)" class="${ADD_BTN}">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  Add service
                </button>
              </div>
            }
          </div>
        }

        <!-- ===== SKILLS ===== -->
        @if (activeTab() === 'skills') {
          <div class="grid lg:grid-cols-2 gap-6">
            @for (lang of langOptions; track lang.key) {
              <div class="${CARD}">
                <span class="${SECTION_LABEL}">{{ lang.label }}</span>
                <div class="space-y-3">
                  @for (skill of draft()![lang.key].skills.items; track $index) {
                    <div class="flex items-center gap-3">
                      <input class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all flex-1" [(ngModel)]="skill.name" [name]="'sk-n-'+lang.key+$index" placeholder="Skill name" />
                      <div class="flex items-center gap-2 flex-shrink-0">
                        <input class="w-20 text-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" type="number" min="0" max="100" [(ngModel)]="skill.percentage" [name]="'sk-p-'+lang.key+$index" />
                        <span class="text-xs text-slate-400">%</span>
                      </div>
                      <button (click)="removeItem(lang.key, 'skills', $index)" class="${DEL_BTN}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </div>
                  }
                </div>
                <button (click)="addSkill(lang.key)" class="${ADD_BTN} mt-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  Add skill
                </button>
              </div>
            }
          </div>
        }

        <!-- ===== TIMELINE ===== -->
        @if (activeTab() === 'timeline') {
          <div class="grid lg:grid-cols-2 gap-6">
            @for (lang of langOptions; track lang.key) {
              <div class="${CARD}">
                <span class="${SECTION_LABEL}">{{ lang.label }}</span>
                @for (item of draft()![lang.key].timeline.items; track $index) {
                  <div class="${DIVIDER}">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-slate-400 uppercase">Entry {{ $index + 1 }}</span>
                      <button (click)="removeItem(lang.key, 'timeline', $index)" class="${DEL_BTN}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <label class="block">
                        <span class="${FIELD_LABEL}">Start year</span>
                        <input class="${FIELD_INPUT}" [(ngModel)]="item.year" [name]="'tl-y-'+lang.key+$index" />
                      </label>
                      <label class="block">
                        <span class="${FIELD_LABEL}">End year</span>
                        <input class="${FIELD_INPUT}" [(ngModel)]="item.endYear" [name]="'tl-e-'+lang.key+$index" />
                      </label>
                    </div>
                    <label class="block">
                      <span class="${FIELD_LABEL}">Job title</span>
                      <input class="${FIELD_INPUT}" [(ngModel)]="item.title" [name]="'tl-t-'+lang.key+$index" />
                    </label>
                    <label class="block">
                      <span class="${FIELD_LABEL}">Company</span>
                      <input class="${FIELD_INPUT}" [(ngModel)]="item.company" [name]="'tl-c-'+lang.key+$index" />
                    </label>
                    <label class="block">
                      <span class="${FIELD_LABEL}">Location</span>
                      <input class="${FIELD_INPUT}" [(ngModel)]="item.location" [name]="'tl-l-'+lang.key+$index" />
                    </label>
                    <label class="block">
                      <span class="${FIELD_LABEL}">Type</span>
                      <select class="${FIELD_INPUT}" [(ngModel)]="item.type" [name]="'tl-tp-'+lang.key+$index">
                        <option value="software">Software</option>
                        <option value="engineering">Engineering</option>
                        <option value="other">Other</option>
                      </select>
                    </label>
                    <label class="block">
                      <span class="${FIELD_LABEL}">Description</span>
                      <textarea class="${FIELD_INPUT}" rows="3" [(ngModel)]="item.description" [name]="'tl-d-'+lang.key+$index"></textarea>
                    </label>
                    <label class="block">
                      <span class="${FIELD_LABEL}">Tags (comma separated)</span>
                      <input class="${FIELD_INPUT}"
                        [ngModel]="item.tags.join(', ')"
                        (ngModelChange)="item.tags = splitTags($event)"
                        [name]="'tl-tg-'+lang.key+$index" />
                    </label>
                  </div>
                }
                <button (click)="addTimelineItem(lang.key)" class="${ADD_BTN}">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  Add entry
                </button>
              </div>
            }
          </div>
        }

        <!-- ===== TECH STACK ===== -->
        @if (activeTab() === 'techstack') {
          <div class="grid lg:grid-cols-2 gap-6">
            @for (lang of langOptions; track lang.key) {
              <div class="${CARD}">
                <span class="${SECTION_LABEL}">{{ lang.label }}</span>
                @for (cat of draft()![lang.key].techStack.categories; track $index) {
                  <div class="${DIVIDER}">
                    <div class="flex items-center gap-2">
                      <input class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all flex-1 font-semibold" [(ngModel)]="cat.name" [name]="'tc-n-'+lang.key+$index" placeholder="Category name" />
                      <button (click)="removeItem(lang.key, 'techStack', $index)" class="${DEL_BTN}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </div>
                    <label class="block">
                      <span class="${FIELD_LABEL}">Items (comma separated)</span>
                      <input class="${FIELD_INPUT}"
                        [ngModel]="cat.items.join(', ')"
                        (ngModelChange)="cat.items = splitTags($event)"
                        [name]="'tc-i-'+lang.key+$index" />
                    </label>
                  </div>
                }
                <button (click)="addTechCategory(lang.key)" class="${ADD_BTN}">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  Add category
                </button>
              </div>
            }
          </div>
        }

        <!-- ===== CONTACT ===== -->
        @if (activeTab() === 'contact') {
          <div class="grid lg:grid-cols-2 gap-6">
            @for (lang of langOptions; track lang.key) {
              <div class="${CARD}">
                <span class="${SECTION_LABEL}">{{ lang.label }}</span>
                <label class="block">
                  <span class="${FIELD_LABEL}">Section title</span>
                  <input class="${FIELD_INPUT}" [(ngModel)]="draft()![lang.key].contact.title" [name]="'ct-title-'+lang.key" />
                </label>
                <label class="block">
                  <span class="${FIELD_LABEL}">Heading</span>
                  <input class="${FIELD_INPUT}" [(ngModel)]="draft()![lang.key].contact.heading" [name]="'ct-h-'+lang.key" />
                </label>
                <label class="block">
                  <span class="${FIELD_LABEL}">Description</span>
                  <textarea class="${FIELD_INPUT}" rows="3" [(ngModel)]="draft()![lang.key].contact.description" [name]="'ct-d-'+lang.key"></textarea>
                </label>
                <label class="block">
                  <span class="${FIELD_LABEL}">Email address</span>
                  <input class="${FIELD_INPUT}" type="email" [(ngModel)]="draft()![lang.key].contact.email" [name]="'ct-e-'+lang.key" />
                </label>
                <label class="block">
                  <span class="${FIELD_LABEL}">Phone number</span>
                  <input class="${FIELD_INPUT}" [(ngModel)]="draft()![lang.key].contact.phone" [name]="'ct-p-'+lang.key" />
                </label>
              </div>
            }
          </div>
        }

      }
    </div>
  `,
})
export class PageCustomization implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly langService = inject(LanguageService);

  protected readonly activeTab = signal<Tab>('hero');
  protected readonly saving = signal(false);
  protected readonly saved = signal(false);
  protected readonly saveError = signal<string | null>(null);
  protected readonly draft = signal<Draft | null>(null);

  protected readonly tabs: { id: Tab; label: string }[] = [
    { id: 'hero',      label: 'Hero' },
    { id: 'services',  label: 'Services' },
    { id: 'skills',    label: 'Skills' },
    { id: 'timeline',  label: 'Timeline' },
    { id: 'techstack', label: 'Tech Stack' },
    { id: 'contact',   label: 'Contact' },
  ];

  protected readonly langOptions: { key: Lang; label: string }[] = [
    { key: 'en', label: 'English' },
    { key: 'hr', label: 'Croatian' },
  ];

  ngOnInit(): void {
    this.draft.set(this.langService.getCurrentTranslations());
  }

  protected save(): void {
    this.saving.set(true);
    this.saveError.set(null);
    this.http.put('/api/content', this.draft(), {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` }
    }).subscribe({
      next: () => {
        this.langService.setTranslations(this.draft()!);
        this.saving.set(false);
        this.saved.set(true);
        setTimeout(() => this.saved.set(false), 3000);
      },
      error: () => {
        this.saveError.set('Failed to save. Please try again.');
        this.saving.set(false);
      }
    });
  }

  protected splitTags(value: string): string[] {
    return value.split(',').map(t => t.trim()).filter(Boolean);
  }

  protected addService(lang: Lang): void {
    this.draft()![lang].services.items.push({ title: '', description: '', icon: 'web' });
  }

  protected addSkill(lang: Lang): void {
    this.draft()![lang].skills.items.push({ name: '', percentage: 80 });
  }

  protected addTimelineItem(lang: Lang): void {
    const item: TimelineItem = { year: '', endYear: '', title: '', company: '', location: '', type: 'software', description: '', tags: [] };
    this.draft()![lang].timeline.items.push(item);
  }

  protected addTechCategory(lang: Lang): void {
    this.draft()![lang].techStack.categories.push({ name: '', items: [] });
  }

  protected removeItem(lang: Lang, section: 'services' | 'skills' | 'timeline' | 'techStack', index: number): void {
    if (section === 'services') this.draft()![lang].services.items.splice(index, 1);
    else if (section === 'skills') this.draft()![lang].skills.items.splice(index, 1);
    else if (section === 'timeline') this.draft()![lang].timeline.items.splice(index, 1);
    else if (section === 'techStack') this.draft()![lang].techStack.categories.splice(index, 1);
  }
}
