import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';

@Component({
  imports: [],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.css',
  templateUrl: './movie-detail.html',
})
export class MovieDetail implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  selectedMovie = this.movieService.selectedMovie;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.movieService.getMovieById(Number(params.get('id'))))
    ).subscribe(movie => this.movieService.selectedMovie.set(movie));
  }

  backToMovieList(): void {
    this.router.navigate(['/movielist']);
  }

  addToWish(movie: Movie | null): void {
    if (movie) this.movieService.addToWishlist(movie);
  }
}
