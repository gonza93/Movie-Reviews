import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable()
export class MovieService{
  constructor(private http: HttpClient){}

  apiKey = "IRpPXQwdeEC7lYajfk30Re3wsGNSWe1v";

  API = {
    get : 'https://api.mlab.com/api/1/databases/movie-reviews/collections/movieSnippets?l=20&apiKey=' + this.apiKey,
    getDetails: 'https://api.mlab.com/api/1/databases/movie-reviews/collections/movieDetails?q={"id":@id}&fo=true&apiKey=' + this.apiKey,
    getCast : 'https://api.mlab.com/api/1/databases/movie-reviews/collections/movieCast?q={"id":@id}&fo=true&apiKey=' + this.apiKey,
    search: 'https://api.mlab.com/api/1/databases/movie-reviews/collections/movieSnippets?q={"title":{"$regex":"@query",%20"$options"%20:%20"i"}}&apiKey=' + this.apiKey,
    postReview : 'http://localhost:3800/movie/review'
  }

  API_REVIEW = {
    get : 'http://localhost:3500/reviews/',
    like : 'http://localhost:3500/review/like/',
    post : 'http://localhost:3500/review',
    saveDraft : 'http://localhost:3500/reviewx',
    getDraft : 'http://localhost:3500/reviewx'
  }

  public getMovies() : any {
    return this.http.get(this.API.get);
  }

  public getMovieDetails(id) : any {
    var endpoint = this.API.getDetails.replace("@id", id);
    return this.http.get(endpoint);
  }

  public getMovieCast(id) : any {
    var endpoint = this.API.getCast.replace("@id", id);
    return this.http.get(endpoint);
  }

  public getMovieReviews(ids){
   return this.http.get(this.API_REVIEW.get + ids);
  }

  public searchMovies(query) : any {
    var endpoint = this.API.search.replace("@query", query);
    return this.http.get(endpoint);
  }

  public likeReview(id) : any {
    return this.http.get(this.API_REVIEW.like + id);
  }

  public postReview(review) : any {
    console.log(this.API_REVIEW.post);
    return this.http.post(this.API_REVIEW.post, review);
  }

  public addReview(body) : any {
    console.log(this.API.postReview);
    return this.http.post(this.API.postReview, body);
  }

  public saveReviewDraft(body){
    return this.http.post(this.API_REVIEW.saveDraft, body);
  }

  public getReviewDraft() : any{
    return this.http.get(this.API_REVIEW.getDraft);
  }

}
