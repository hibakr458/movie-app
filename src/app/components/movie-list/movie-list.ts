import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-movie-list',
  styleUrl: './movie-list.css',
  templateUrl: './movie-list.html',
})
export class MovieList implements OnInit {
  router = inject(Router);
  movieService = inject(MovieService);
  currentPage = 1;
  totalPages = 1;
  minimumRating = 0;
  sortBy = 'popular';
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.movieService.loadWishlist();
    this.loadPage(1);
  }

  loadPage(page: number): void {
    if (page < 1 || page > this.totalPages || this.isLoading) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.movieService.getMoviePage(page).subscribe({
      next: response => {
        this.movieService.movieList.set(response.results);
        this.currentPage = response.page;
        this.totalPages = Math.min(response.total_pages, 500);
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load movies. Please try again.';
        this.isLoading = false;
      }
    });
  }

  get filteredMovies(): Movie[] {
    const movies = this.movieService.movieList().filter(movie => movie.vote_average >= this.minimumRating);
    if (this.sortBy === 'rating') return [...movies].sort((a, b) => b.vote_average - a.vote_average);
    if (this.sortBy === 'title') return [...movies].sort((a, b) => a.title.localeCompare(b.title));
    if (this.sortBy === 'newest') return [...movies].sort((a, b) => b.release_date.localeCompare(a.release_date));
    return movies;
  }

  navigateTo(movie: Movie): void {
    this.router.navigate(['/', movie.id]);
  }

  previousPage(): void { this.loadPage(this.currentPage - 1); }
  nextPage(): void { this.loadPage(this.currentPage + 1); }

  get pages(): number[] {
    const start = Math.max(1, Math.min(this.currentPage - 2, this.totalPages - 4));
    return Array.from({ length: Math.min(5, this.totalPages) }, (_, index) => start + index);
  }
}
