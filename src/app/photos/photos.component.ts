import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { auditTime, distinctUntilChanged } from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as FavoritesActions from '../favorites/store/favorites.actions';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  public photos: any;
  public obj: any;
  public isLoading = false;
  public message = 'Something went wrong!!!';
  public favoriteArray: any[] = [];
  public hideMessage: boolean = false;
  public subPhotos: Subscription;
  public id: any;

  constructor(
    private service: DataStorageService,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.id = params;
      console.log(this.id);

      console.log(this.route.snapshot.data);
    });

    this.onFetchPhotos();

    this.subPhotos = this.store
      .select('photos')
      .pipe(distinctUntilChanged())
      .subscribe((photos) => {
        console.log(photos);
        if (photos && !_.isEmpty(photos))
          this.photos = _.cloneDeep(photos.photos);
      });
  }

  onFetchPhotos() {
    this.isLoading = true;
    this.service.fetchPhotos().subscribe({
      next: async (resData: any) => {
        if (!resData) {
          this.onAlert();
        } else {
          this.isLoading = false;
        }
      },

      error: async (error) => {
        this.onAlert();
      },

      complete: () => {},
    });
  }
  onAlert() {
    alert(this.message);
    this.isLoading = false;
  }

  addFavoritePhoto(photo: any) {
    console.log(photo);
    const dataToStore = { photoUrl: photo, id: Date.now() };
    this.store.dispatch(new FavoritesActions.AddFavoritePhoto(dataToStore));

    // this.service.createFavoritesList(photo);
    // this.hideMessage = true;
  }

  trackFn(photo: any) {
    return photo.id;
  }
}
