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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private movieService: MovieService,
              private favoriteMovieService: FavoriteMoviesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(d => {
      console.log(d.get('imdbID'));
      this.keyWord = d.get('keyWord');
      this.movieService.getMovieDetails(d.get('imdbID')).subscribe(m => {
        this.movieDetails = m;
        console.log(m);
      });
    });
  }

  public addToFavorite(): void {

  }

  public removeFromFavorite(): void {

  }

  public back(): void {
    this.router.navigate(['../movies', { restoreKey: this.keyWord }]);
  }

}
