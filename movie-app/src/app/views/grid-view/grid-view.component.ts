import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MoviePoster } from 'src/app/shared/movie-type';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit, OnChanges {

  @Input() movies: MoviePoster[] = [];
  @Input() searchKeyWord: string;

  public filteredMovies: MoviePoster[];

  public sortOptions: SelectItem[];
  public sortField: string;
  public sortKey: SelectItem;
  public sortOrder = 1;

  public typeOptions: SelectItem[];
  public type = 'movie';

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Sort by title', value: 'Title' },
      { label: 'Sort by year', value: 'Year' },
    ];
    this.typeOptions = [
      { label: 'Only movies', value: 'movie' },
      { label: 'Only series', value: 'series' },
      { label: 'Only games', value: 'game' },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.movies) {
      this.filteredMovies = this.movies.filter(m => m.Type === this.type);
    }
  }

  public onSortChange(event: any): void {
    this.sortField = event.value;
    if (event.value === 'Year') {
      this.sortOrder = -1;
    } else {
      this.sortOrder = 1;
    }
  }

  public onFilterChange(event: any): void {
      this.filteredMovies = this.movies.filter(m => m.Type === event.value);
  }

  public onItemSelect(movie: MoviePoster): void {
    this.router.navigate(['../details', { imdbID: movie.imdbID, keyWord: this.searchKeyWord }]);
  }
}
