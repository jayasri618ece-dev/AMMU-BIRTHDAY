export type ScreenId =
  | 'intro'
  | 'home'
  | 'envelope'
  | 'letter'
  | 'gift'
  | 'story'
  | 'promises'
  | 'cake'
  | 'secret-heart'
  | 'ending';

export type NavTabId = 'home' | 'surprises' | 'story' | 'birthday' | 'letter';

export interface Milestone {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
  tag: string;
}

export interface PromiseCard {
  id: number;
  title: string;
  subtitle: string;
  extendedText: string;
  icon: string;
  accent: string;
}
