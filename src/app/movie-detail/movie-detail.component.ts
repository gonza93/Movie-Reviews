import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie;
  crew;
  cast;
  reviews;
  reviewIds;
  newReview = { usuario: "", texto: ""};
  showAnim = "";
  insertedReview = true;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private location: PlatformLocation) {
                location.onPopState(() => {
                  if(this.newReview.usuario != "")
                    this.movieService.saveReviewDraft(this.newReview).subscribe(res =>{
                      console.log(res);
                    });
                });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.movieService.getMovieDetails(id).subscribe(res => {
      this.movie = res;

      this.reviewIds = res.reviews;
      this.movieService.getMovieReviews(this.reviewIds.join(',')).subscribe(res => {
        this.reviews = res;
      });
    });

    this.movieService.getMovieCast(id).subscribe(res => {
      this.cast = res.cast;
      this.crew = res.crew;
    });

    this.movieService.getReviewDraft().subscribe(res =>{
      if(res.success)
        this.newReview = res.draft;
    });
  }

  onClickLike(id){
    this.movieService.likeReview(this.reviewIds[id]).subscribe(res => {
      this.reviews[id].likes = res.likes;
    });
  }

  onClickPostReview(review){
    this.insertedReview = false;

    this.movieService.postReview(this.newReview).subscribe(res => {
      console.log(res);

      this.reviews.push(res.review);
      this.reviewIds.push(res.id);

      var body = {id: this.movie.id, review: res.id}
      this.movieService.addReview(body).subscribe(res =>{
        console.log(res);
      });
    });
  }
}
