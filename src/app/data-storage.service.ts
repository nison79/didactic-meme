import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, map, Observable, of, retry, Subject, tap } from 'rxjs';
import * as PhotosActions from './photos/store/photos.actions';
import * as fromApp from './store/app.reducer';

export class PhotosResponse {
  message: [];
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  public favorites: { photo?: string; id?: number }[] = [];
  private subject = new Subject<any>();
  public photoUrl: string = '';
  public singlePhoto: { photo?: string; id?: number } = {};

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  // getSinglePhoto(id: number) {
  //   return of(id);
  // }

  // getFavoritesList() {
  //   return of(this.favorites);
  // }

  // createFavoritesList(photoUrl: string) {
  //   console.log('call the service');
  //   const photoObj = { photo: photoUrl, id: Date.now() };
  //   this.favorites.push(photoObj);
  //   console.log(this.favorites);
  // }

  // ? Fetch photo from the api

  fetchPhotos() {
    return this.http
      .get<PhotosResponse>('https://dog.ceo/api/breed/mix/images')
      .pipe(retry(1))

      .pipe(
        tap((resData) => {
          console.log(resData);

          if (resData && resData.status) {
            console.log(resData, 'from service FUNDS');

            const dataToStore = resData.message;
            // console.log(dataToStore, "fdsfgdfgdfgbhdfgb");

            this.store.dispatch(new PhotosActions.SetPhotos(dataToStore));
          }
        })
      );
  }
}
