import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../shared/movie-type';
import { Router } from '@angular/router';
import { FavoriteMoviesService } from '../favorite-movies.service';

@Component({
  selector: 'app-favorite-movies-dialog',
  templateUrl: './favorite-movies-dialog.component.html',
  styleUrls: ['./favorite-movies-dialog.component.css']
})
export class FavoriteMoviesDialogComponent implements OnInit {

  public display = false;
  public favoriteMovies: Movie[] = [];
  public selectedFavoriteMovie?: Movie;

  @Input() keyWord = '';

  constructor(public router: Router,
              public favoriteMovieService: FavoriteMoviesService) { }

  ngOnInit(): void {
    this.favoriteMovies = this.favoriteMovieService.getFavoriteMovies();
  }

  public show(): void {
    this.display = true;
  }

  public hide(): void {
    this.display = false;
  }

  public onSelect(): void {
    this.router.navigate(['./details', { imdbID: this.selectedFavoriteMovie.imdbID, keyWord: this.keyWord }]);
  }
}
