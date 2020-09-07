import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule, Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar/primeng-progressbar';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule,
    HttpClientModule,
    MessageModule,
    MessagesModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    InputTextModule,
    RadioButtonModule,
    FormsModule,
    DataViewModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
