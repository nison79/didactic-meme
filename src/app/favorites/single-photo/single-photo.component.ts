import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/data-storage.service';
import * as fromApp from '../../store/app.reducer';
import * as fromFavoritesActions from '../store/favorites.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
})
export class SinglePhotoComponent implements OnInit {
  @Input() favorite;
  public favoritesList: any;
  public paramsSubscription: any;
  public id: any;
  public singlePhoto: any;
  public filteredFavoritesList: any;
  public singlePhotoSub: Subscription;
  public photos: any;

  constructor(
    private service: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // console.log(this.favorite);
    this.route.params.subscribe((params) => {
      console.log(params);
      this.id = params;
      console.log(this.id);
    });

    this.singlePhotoSub = this.store.select('favorites').subscribe((photos) => {
      // console.log(photo);
      if (photos) {
        this.photos = _.cloneDeep(photos);
        console.log(this.photos);
        const index = _.findIndex(this.photos, (photo) => {
          return photo.id === this.id;
        });
        console.log(index);
        
        this.singlePhoto = this.photos[index];
        console.log(this.singlePhoto);
      }
    });
    // ? find the photo in list by id
    // this.service
    //   .getFavoritesList()
    //   .subscribe((data) => (this.favoritesList = data));
    // this.singlePhoto = this.favoritesList.find(
    //   (item: any) => item.id === this.id
    // );
    // console.log(this.singlePhoto);
  }
  onRemoveFromFavorites() {
    console.log(this.singlePhoto.id);

    this.store.dispatch(
      new fromFavoritesActions.RemoveFavoritePhoto(this.singlePhoto.id)
    );
  }

  ngOnDestroy() {
    if (this.singlePhotoSub) {
      this.singlePhotoSub.unsubscribe();
    }
  }
}
