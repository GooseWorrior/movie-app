import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Movie } from './shared/movie-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public baseMovieUrl = 'https://www.omdbapi.com/';
  public apiKey = '2c15ed90';
  public alternativeApiKey = '8bca3676';
  constructor(public http: HttpClient,
              ) { }

  public getMeta(title: string): Observable<any> {
    return this.http.get<any>(this.baseMovieUrl, { params: { apikey: this.apiKey, s: title}});
  }
  public getMovies(title: string, pageNumber: number): Observable<any> {
    const queryList: Array<Observable<any>> = [];
    if (pageNumber > 10) {
      pageNumber = 10;
    }
    for (let i = 1; i <= pageNumber; ++i) {
      queryList.push(this.http.get<any>(this.baseMovieUrl, { params: { apikey: this.apiKey, s: title, page: i.toString() }}));
    }
    return forkJoin(queryList);
  }
  public getMovieDetails(id: string): Observable<any> {
    return this.http.get<any>(this.baseMovieUrl, { params: { apikey: this.apiKey, i: id }});
  }

  public addMovie(): Observable<Movie> {
    return this.http.post<Movie>(this.baseMovieUrl,  { params: { apikey: '2c15ed90'}});
  }
}
