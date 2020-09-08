import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie, MoviePoster, MovieSearchSummary } from '../shared/movie-type';
import { MovieService } from '../movie.service';
import { MessageService, SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ViewType } from '../shared/util-type';
import { Router, ActivatedRoute } from '@angular/router';
import { FavoriteMoviesDialogComponent } from '../favorite-movies-dialog/favorite-movies-dialog.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  public movies: MoviePoster[] = [];
  public selectedMovie: MoviePoster;
  public views = Object.keys(ViewType).map(k => ViewType[k]);
  public selectedView = ViewType.TABLE;
  public movieForm: FormGroup;
  public movieSearchSummay?: MovieSearchSummary;
  public progress = false;

  @ViewChild('favoriteMovies') favoriteMovies: FavoriteMoviesDialogComponent;
  constructor(public movieService: MovieService,
              public messageService: MessageService,
              public router: Router,
              private route: ActivatedRoute,
              public fb: FormBuilder) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(d => {
      const key = d.get('restoreKey');
      if (key) {
        this.movieForm.patchValue({
          title: key,
        });
        this.refreshMovieList();
      }
    });
  }

  public onSelect(): void {
    this.router.navigate(['../details', { imdbID: this.selectedMovie.imdbID, keyWord: this.movieForm.controls.title.value }]);
  }

  public showCreateDialog(): void {
    this.favoriteMovies.show();
  }

  public searchMovies(): void {
    this.messageService.clear();
    if (this.movieForm.valid) {
      this.refreshMovieList();
    } else {
      this.messageService.add({ key: 'stateInfo', severity: 'error', summary: 'Search error', detail: 'Title field is empty' });
    }
  }

  public refreshMovieList(): void {
    let pageNumber = 0;
    let totalNumber = 0;
    this.movies = [];
    this.progress = true;
    this.movieService.getMeta(this.movieForm.controls.title.value).subscribe(m => {
      if (m.Response === 'False') {
        this.messageService.add({ key: 'stateInfo', severity: 'error', summary: 'Search error', detail: 'API failed: '.concat(m.Error) });
        this.progress = false;
      } else {
        pageNumber = Math.floor(m.totalResults / 10) + (m.totalResults % 10 > 0 ? 1 : 0);
        totalNumber = m.totalResults;
        this.movieService.getMovies(this.movieForm.controls.title.value, pageNumber).subscribe(r => {
          this.movies = (r as Array<any>).reduce((acc: MoviePoster[], cur) => (acc.concat(cur.Search)), []);
          this.updateSearchSummary(totalNumber);
          this.messageService.add({ key: 'searchSummary', severity: 'info', summary: 'Search Result', detail: this.buildSearchSummary() });
          this.progress = false;
        });
      }
    },
    err => {
      this.messageService.add({ key: 'stateInfo', severity: 'error', summary: 'Search error', detail: 'Request failed' });
    });
  }

  public updateSearchSummary(totalResults: number): void {
    this.movieSearchSummay = {
      resultNumber: totalResults,
      movieNumber: this.movies.filter(m => m.Type === 'movie').length,
      seriesNumber: this.movies.filter(m => m.Type === 'series').length,
      gameNumber: this.movies.filter(m => m.Type === 'game').length,
    };
  }

  public buildSearchSummary(): string {
    return `We have a total of ${this.movieSearchSummay.resultNumber} results. `
    .concat((this.movieSearchSummay.resultNumber > 100) ? 'Since the total result number exceed 100, we only pick the first 100 results. ' : '')
    .concat(`These results contain `)
    .concat((this.movieSearchSummay.movieNumber > 0) ? `${this.movieSearchSummay.movieNumber} movies` : '')
    .concat((this.movieSearchSummay.seriesNumber > 0) ? `, ${this.movieSearchSummay.gameNumber === 0 ? 'and ' : ''}${this.movieSearchSummay.seriesNumber} series` : '')
    .concat((this.movieSearchSummay.gameNumber > 0) ? `, and ${this.movieSearchSummay.gameNumber} games` : '')
    .concat('.');
  }
}
