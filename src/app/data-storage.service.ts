import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, of, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  public favorites: { photo?: string; id?: number }[] = [];

  public photoUrl: string = '';
  constructor(private http: HttpClient) {}

  getFavoritesList() {
    return of(this.favorites);
  }

  createFavoritesList(photoUrl: string) {
    console.log('call the service');
    const photoObj = { photo: photoUrl, id: Date.now() };
    this.favorites.push(photoObj);
    console.log(this.favorites);
  }

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
