import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

@Component({
  selector: 'app-skill-circle',
  template: `
    <div class="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl">
      <div class="relative w-24 h-24 mb-6">
        <svg class="w-full h-full transform -rotate-90" aria-hidden="true">
          <circle
            cx="48" cy="48" [attr.r]="radius"
            stroke="currentColor" stroke-width="8" fill="transparent"
            class="text-slate-200 dark:text-slate-700"
          />
          <circle
            cx="48" cy="48" [attr.r]="radius"
            stroke="currentColor" stroke-width="8" fill="transparent"
            [attr.stroke-dasharray]="circumference"
            [attr.stroke-dashoffset]="dashOffset()"
            stroke-linecap="round"
            class="text-primary transition-all duration-1000 ease-out"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center font-bold text-xl text-primary" aria-hidden="true">
          {{ percentage() }}%
        </div>
      </div>
      <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ name() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillCircle {
  readonly name = input.required<string>();
  readonly percentage = input.required<number>();

  protected readonly radius = RADIUS;
  protected readonly circumference = CIRCUMFERENCE;
  protected readonly dashOffset = computed(() => CIRCUMFERENCE * (1 - this.percentage() / 100));
}
