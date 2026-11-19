import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';

@Component({
  imports: [CommonModule],
  selector: 'app-wish-list',
  styleUrl: './wish-list.css',
  templateUrl: './wish-list.html',
})
export class WishList implements OnInit {
  movieService = inject(MovieService);
  private router = inject(Router);

  ngOnInit(): void {
    this.movieService.loadWishlist();
  }

  goToMovieList(): void {
    this.router.navigate(['/movielist']);
  }

  navigateTo(movie: Movie): void {
    this.movieService.selectedMovie.set(movie);
    this.router.navigate(['/', movie.id]);
  }

  removeFromWishList(movie: Movie): void {
    this.movieService.removeFromWishlist(movie.id);
  }

  clearWishList(): void {
    this.movieService.clearWishlist();
  }
}
