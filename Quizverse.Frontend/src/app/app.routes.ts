import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: "classic",
        loadComponent: () =>
            import("./pages/game-modes/classic/classic").then(
                (m) => m.Classic
            ),
    },
    {
        path: "quote",
        loadComponent: () =>
            import("./pages/game-modes/quote/quote").then(
                (m) => m.Quote
            ),
    },
    {
        path: "privacy-policy",
        loadComponent: () =>
            import("./pages/privacy-policy/privacy-policy").then(
                (m) => m.PrivacyPolicy
            ),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
