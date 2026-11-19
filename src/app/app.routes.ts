import { Routes } from '@angular/router';
import { MovieList } from './components/movie-list/movie-list';
import { WishList } from './components/wish-list/wish-list';
import { MovieDetail } from './components/movie-detail/movie-detail';

export const routes: Routes = [
    { path: '', redirectTo: 'movielist', pathMatch: 'full' },
    { path: 'movielist', component: MovieList },
    { path: 'wishlist', component: WishList },
    { path: ':id', component: MovieDetail },
    { path: '**', redirectTo: 'movielist' },
];
