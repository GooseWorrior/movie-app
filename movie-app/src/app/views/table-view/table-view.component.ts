import { Component, OnInit, Input } from '@angular/core';
import { Movie, MoviePoster } from 'src/app/shared/movie-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {
  @Input() searchKeyWord: string;
  @Input() movies: MoviePoster[];

  public selectedMovie?: MoviePoster;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  public onSelect(): void {
    this.router.navigate(['../details', { imdbID: this.selectedMovie.imdbID, keyWord: this.searchKeyWord }]);
  }
}
