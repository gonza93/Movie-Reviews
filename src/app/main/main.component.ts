import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showMovies = false;
  movies;
  query : string;

  constructor(public movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovies().subscribe(res =>{
      this.showMovies = true;
      this.movies = res;
    });
  }

  onClickSearch(){
    this.showMovies = false;
    this.movieService.searchMovies(this.query).subscribe(res =>{
      this.showMovies = true;
      this.movies = res;
    });
  }

}
