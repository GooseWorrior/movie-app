import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from './shared/movie-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public baseMovieUrl = 'http://www.omdbapi.com/';
  constructor(public http: HttpClient,
              ) { }
  public getMovie(title: string): Observable<any> {
    return this.http.get<any>(this.baseMovieUrl, { params: { apikey: '2c15ed90', s: title }});
  }

  public addMovie(): Observable<Movie> {
    return this.http.post<Movie>(this.baseMovieUrl,  { params: { apikey: '2c15ed90'}});
  }
}
