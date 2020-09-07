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

  public progress = false;

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
     if (this.movieForm.valid) {
      this.refreshMovieList();
     } else {
       this.messageService.add({ severity: 'error', summary: 'Search error', detail: 'Title field is empty' });
     }
  }

  public refreshMovieList(): void {
    let pageNumber = 0;
    this.movies = [];
    this.progress = true;
    this.movieService.getMeta(this.movieForm.controls.title.value).subscribe(m => {
      console.log(m);
      pageNumber = Math.floor(m.totalResults / 10) + (m.totalResults % 10 > 0 ? 1 : 0);
      console.log(pageNumber);
      this.movieService.getMovies(this.movieForm.controls.title.value, pageNumber).subscribe(r => {
        console.log(r);
        this.movies = (r as Array<any>).reduce((acc: MoviePoster[], cur) => (acc.concat(cur.Search)), []);
        console.log(this.movies);
        this.movieForm.reset();
        this.progress = false;
      });
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
