import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Rick and Morty - Play Now!',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'classic',
    title: 'Classic Mode | Rick and Morty Game',
    data: { description: 'Test your knowledge in Classic Mode!' },
    loadComponent: () =>
      import('./pages/game-modes/classic/classic').then(m => m.Classic)
  },
  {
    path: 'quote',
    title: 'Quote Mode | Rick and Morty Game',
    data: { description: 'Guess who said it — the ultimate quote challenge!' },
    loadComponent: () =>
      import('./pages/game-modes/quote/quote').then(m => m.Quote)
  },
  {
    path: 'emoji',
    title: 'Emoji Mode | Rick and Morty Game',
    data: { description: 'Can you guess the character from emojis?' },
    loadComponent: () =>
      import('./pages/game-modes/emoji/emoji').then(m => m.Emoji)
  },
  {
    path: 'splash',
    title: 'Splash Mode | Rick and Morty Game',
    data: { description: 'Uncover the mystery image piece by piece!' },
    loadComponent: () =>
      import('./pages/game-modes/splash/splash').then(m => m.Splash)
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | Rick and Morty Game',
    data: { description: 'Read our privacy policy and terms of use.' },
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then(m => m.PrivacyPolicy)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
