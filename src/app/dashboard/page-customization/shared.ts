// Shared CSS class constants for page-customization tab panels
export const FIELD_LABEL =
  'block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1';
export const FIELD_INPUT =
  'w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all';
export const CARD =
  'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4';
export const SECTION_LABEL =
  'font-bold text-xs tracking-widest uppercase mb-4 block text-primary';
export const DIVIDER =
  'space-y-2 pb-5 border-b border-slate-100 dark:border-slate-700 mb-4';
export const ADD_BTN =
  'flex items-center gap-2 text-sm text-primary font-semibold hover:underline';
export const DEL_BTN =
  'text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0';

export type Lang = 'en' | 'hr';
export const LANG_OPTIONS: { key: Lang; label: string }[] = [
  { key: 'en', label: 'English' },
  { key: 'hr', label: 'Croatian' },
];
