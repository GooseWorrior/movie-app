import { Component, OnInit } from '@angular/core';
import { Movie, MoviePoster } from '../shared/movie-type';
import { MovieService } from '../movie.service';
import { MessageService, SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ViewType } from '../shared/util-type';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  public movies: MoviePoster[] = [];
  public selectedMovie: MoviePoster;
  public display = false;
  public views = Object.keys(ViewType).map(k => ViewType[k]);
  public selectedView = ViewType.TABLE;
  public movieForm: FormGroup;

  public sortOptions: SelectItem[];
  public sortField: string;
  public sortKey: SelectItem;
  public sortOrder = 1;

  constructor(public movieService: MovieService,
              public messageService: MessageService,
              public fb: FormBuilder) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required]
    });
    this.sortOptions = [
      {label: 'Sort by title', value: 'Title' },
      {label: 'Sort by year', value: 'Year' },
  ];
  }

  ngOnInit(): void {
    console.log(this.views);
  }

  public onSelect(): void {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
  }

  public showCreateDialog(): void {
    this.display = true;
  }

  public addMovie(): void {
    this.display = false;
  }

  public searchMovies(): void {
     this.refreshMovieList();
     this.movieForm.reset();
  }

  public refreshMovieList(): void {
    this.movies = [];
    this.movieService.getMovie(this.movieForm.controls.title.value).subscribe(m => {
      console.log(m.Search[0]);
      this.movies = m.Search;
    });
  }

  public onSortChange(event: any): void {
    console.log(this.sortKey);
    this.sortField = event.value;
    if (event.value === 'Year') {
      this.sortOrder = -1;
    } else {
      this.sortOrder = 1;
    }
  }
}
