import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../../homepage/services/language.service';
import type { Lang } from './shared';
import { HeroTab } from './tabs/hero-tab';
import { ServicesTab } from './tabs/services-tab';
import { SkillsTab } from './tabs/skills-tab';
import { TimelineTab } from './tabs/timeline-tab';
import { TechstackTab } from './tabs/techstack-tab';
import { ContactTab } from './tabs/contact-tab';

type Tab = 'hero' | 'services' | 'skills' | 'timeline' | 'techstack' | 'contact';
type Draft = ReturnType<LanguageService['getCurrentTranslations']>;

@Component({
  selector: 'app-page-customization',
  imports: [HeroTab, ServicesTab, SkillsTab, TimelineTab, TechstackTab, ContactTab],
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
      <div class="flex gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl w-fit flex-wrap" role="tablist">
        @for (tab of tabs; track tab.id) {
          <button
            role="tab"
            [attr.aria-selected]="activeTab() === tab.id"
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
        <div class="flex items-center gap-3 text-slate-400 py-12 justify-center" aria-live="polite">
          <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Loading content...
        </div>
      } @else {
        @if (activeTab() === 'hero') {
          <app-hero-tab [draft]="draft()!" />
        }
        @if (activeTab() === 'services') {
          <app-services-tab
            [draft]="draft()!"
            (add)="addService($event)"
            (remove)="removeItem($event.lang, 'services', $event.index)"
          />
        }
        @if (activeTab() === 'skills') {
          <app-skills-tab
            [draft]="draft()!"
            (add)="addSkill($event)"
            (remove)="removeItem($event.lang, 'skills', $event.index)"
          />
        }
        @if (activeTab() === 'timeline') {
          <app-timeline-tab
            [draft]="draft()!"
            (add)="addTimelineItem($event)"
            (remove)="removeItem($event.lang, 'timeline', $event.index)"
          />
        }
        @if (activeTab() === 'techstack') {
          <app-techstack-tab
            [draft]="draft()!"
            (add)="addTechCategory($event)"
            (remove)="removeItem($event.lang, 'techStack', $event.index)"
          />
        }
        @if (activeTab() === 'contact') {
          <app-contact-tab [draft]="draft()!" />
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

  ngOnInit(): void {
    this.draft.set(this.langService.getCurrentTranslations() as Draft);
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

  protected addService(lang: Lang): void {
    this.draft()![lang].services.items.push({ title: '', description: '', icon: 'web' });
  }

  protected addSkill(lang: Lang): void {
    this.draft()![lang].skills.items.push({ name: '', percentage: 80 });
  }

  protected addTimelineItem(lang: Lang): void {
    const item = {
      year: '', endYear: '', title: '', company: '',
      location: '', type: 'software' as const, description: '', tags: [] as string[],
    };
    this.draft()![lang].timeline.items.push(item);
  }

  protected addTechCategory(lang: Lang): void {
    this.draft()![lang].techStack.categories.push({ name: '', items: [] });
  }

  protected removeItem(
    lang: Lang,
    section: 'services' | 'skills' | 'timeline' | 'techStack',
    index: number,
  ): void {
    if (section === 'services') this.draft()![lang].services.items.splice(index, 1);
    else if (section === 'skills') this.draft()![lang].skills.items.splice(index, 1);
    else if (section === 'timeline') this.draft()![lang].timeline.items.splice(index, 1);
    else if (section === 'techStack') this.draft()![lang].techStack.categories.splice(index, 1);
  }
}
