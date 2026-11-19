import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment";
import { map, Observable } from "rxjs";
import { Movie } from "../interfaces/movie";
import { MovieResponse } from "../interfaces/movie-response";

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    private  readonly http=inject (HttpClient);
    private readonly url=environment.url_api;
    private readonly key=environment.api_key;
    private readonly movieUrl=environment.url_movie_api;


    public movieList = signal<Movie[]>([]);
    public selectedMovie = signal<Movie | null>(null);
    public wishList = signal<Movie[]>([]);

    getMovieList(): Observable<Movie[]> {
        return this.http.get<MovieResponse>(`${this.url}?api_key=${this.key}`).pipe(
            map(response=> response.results)
        )

            
    }

    getMoviePage(page: number): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${this.url}?api_key=${this.key}&page=${page}`);
    }

    getMovieById(id: number): Observable<Movie> {
        return this.http.get<Movie>(`${this.movieUrl}/${id}?api_key=${this.key}`).pipe(
            map(response => response)
        );
    }

    addToWishlist(movie: Movie): void {
        if (!movie || this.wishList().some(item => item.id === movie.id)) return;
        this.wishList.update(wishList => [...wishList, movie]);
        this.saveWishlist();
    }

    removeFromWishlist(movieId: number): void {
        this.wishList.update(wishList => wishList.filter(movie => movie.id !== movieId));
        this.saveWishlist();
    }

    clearWishlist(): void {
        this.wishList.set([]);
        this.saveWishlist();
    }

    loadWishlist(): void {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            try {
                this.wishList.set(JSON.parse(savedWishlist) as Movie[]);
            } catch {
                this.wishList.set([]);
                localStorage.removeItem('wishlist');
            }
        }
    }

    private saveWishlist(): void {
        localStorage.setItem('wishlist', JSON.stringify(this.wishList()));
    }
}