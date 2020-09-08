import { Injectable } from '@angular/core';
import { Movie } from './shared/movie-type';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMoviesService {

  constructor() {
    if (localStorage.getItem('favoriteMovies') === null) {
      console.log('1');
      localStorage.setItem('favoriteMovies', JSON.stringify([]));
    }
    console.log(JSON.parse(localStorage.getItem('favoriteMovies')));
  }

  public getFavoriteMovies(): Movie[] {
    return JSON.parse(localStorage.getItem('favoriteMovies'));
  }

  public removeMovie(id: string): void {
    localStorage.setItem('favoriteMovies',
    JSON.stringify(JSON.parse(localStorage.getItem('favoriteMovies')).filter(m => (m as Movie).imdbID !== id)));
  }

  public addMovie(movie: Movie): void {
    const movies: Movie[] = JSON.parse(localStorage.getItem('favoriteMovies'));
    movies.push(movie);
    localStorage.setItem('favoriteMovies', JSON.stringify(movies));
  }

  public isFavoriteMovie(id: string): boolean {
    const movies: Movie[] = JSON.parse(localStorage.getItem('favoriteMovies'));
    return movies.findIndex(m => m.imdbID === id) === -1 ? false : true;
  }
}
