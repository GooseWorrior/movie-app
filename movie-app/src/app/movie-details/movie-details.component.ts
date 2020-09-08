import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { FavoriteMoviesService } from '../favorite-movies.service';
import { Movie } from '../shared/movie-type';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  public movieDetails?: Movie;
  public keyWord = '';
  public isFavorite = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private movieService: MovieService,
              private favoriteMovieService: FavoriteMoviesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(d => {
      this.keyWord = d.get('keyWord');
      this.movieService.getMovieDetails(d.get('imdbID')).subscribe(m => {
        this.movieDetails = m;
        this.isFavorite = this.favoriteMovieService.isFavoriteMovie(m.imdbID);
      });
    });
  }

  public addToFavorite(): void {
    this.favoriteMovieService.addMovie(this.movieDetails);
    this.isFavorite = true;
  }

  public removeFromFavorite(): void {
    this.favoriteMovieService.removeMovie(this.movieDetails.imdbID);
    this.isFavorite = false;
  }

  public back(): void {
    this.router.navigate(['../movies', { restoreKey: this.keyWord }]);
  }

}
