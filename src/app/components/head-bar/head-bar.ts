import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../services/movie-service';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-head-bar',
  styleUrl: './head-bar.css',
  templateUrl: './head-bar.html',
})
export class HeadBar {
  faHeart = faHeart;
  faMoon = faMoon;
  faSun = faSun;
  router = inject(Router);
  movieService = inject(MovieService);
  isDarkMode = localStorage.getItem('movie-app-theme') !== 'light';

  constructor() {
    this.movieService.loadWishlist();
    this.applyTheme();
  }

  navigateToWishList(): void {
    this.router.navigate(['/wishlist']);
  }

  navigateToMovies(): void {
    this.router.navigate(['/movielist']);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('movie-app-theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.toggle('light-theme', !this.isDarkMode);
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }
}
