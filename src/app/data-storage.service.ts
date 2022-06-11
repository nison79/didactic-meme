import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, retry, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  public favorites: { photo?: string; id?: number }[] = [];
  private subject = new Subject<any>();
  public photoUrl: string = '';
  public singlePhoto: { photo?: string; id?: number } = {};

  constructor(private http: HttpClient) {}

  getSinglePhoto(id: number) {
    return of(id);
  }

  getFavoritesList() {
    return of(this.favorites);
  }

  createFavoritesList(photoUrl: string) {
    console.log('call the service');
    const photoObj = { photo: photoUrl, id: Date.now() };
    this.favorites.push(photoObj);
    console.log(this.favorites);
  }


 // ? Fetch photo from the api
 
  fetchPhotos() {
    return this.http
      .get('https://dog.ceo/api/breed/mix/images')
      .pipe(retry(1))
      .pipe(delay(500))
      .pipe(
        tap((resData) => {
          if (resData) {
            console.log(resData);
          }
        })
      );
  }
}
