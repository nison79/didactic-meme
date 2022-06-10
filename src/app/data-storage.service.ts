import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

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
