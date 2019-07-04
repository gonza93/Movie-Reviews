import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MovieService } from './services/movie.service';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

let appRoutes = [
  { path: '', component: MainComponent, patchMatch: 'full' },
  { path: 'movieDetail/:id', component: MovieDetailComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
