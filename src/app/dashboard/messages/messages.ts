import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/auth.service';
import { DatePipe } from '@angular/common';

interface Message { name: string; email: string; message: string; receivedAt: string; }

@Component({
  selector: 'app-messages',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Messages</h2>
        <button (click)="load()" class="text-sm text-primary font-semibold hover:underline">Refresh</button>
      </div>

      @if (loading()) {
        <p class="text-slate-500 dark:text-slate-400">Loading...</p>
      } @else if (messages().length === 0) {
        <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
          <p class="text-slate-400 dark:text-slate-500">No messages yet.</p>
        </div>
      } @else {
        <div class="space-y-4">
          @for (msg of messages(); track msg.receivedAt) {
            <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <div class="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p class="font-semibold text-slate-900 dark:text-white">{{ msg.name }}</p>
                  <a [href]="'mailto:' + msg.email" class="text-sm text-primary hover:underline">{{ msg.email }}</a>
                </div>
                <span class="text-xs text-slate-400 whitespace-nowrap">{{ msg.receivedAt | date:'medium' }}</span>
              </div>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{{ msg.message }}</p>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class Messages implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  protected readonly messages = signal<Message[]>([]);
  protected readonly loading = signal(true);

  ngOnInit() { this.load(); }

  protected load(): void {
    this.loading.set(true);
    this.http.get<Message[]>('/api/messages', {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` }
    }).subscribe({
      next: (data) => { this.messages.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}
