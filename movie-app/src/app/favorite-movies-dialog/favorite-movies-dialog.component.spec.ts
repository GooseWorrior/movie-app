import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMoviesDialogComponent } from './favorite-movies-dialog.component';

describe('FavoriteMoviesDialogComponent', () => {
  let component: FavoriteMoviesDialogComponent;
  let fixture: ComponentFixture<FavoriteMoviesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteMoviesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteMoviesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
