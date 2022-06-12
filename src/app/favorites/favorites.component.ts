import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AnimationOptions, LottieTransferState } from 'ngx-lottie';
import { auditTime, distinctUntilChanged, map, of, Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as fromSinglePhotoActions from '../favorites/single-photo/store/singlePhoto.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoritesList: any;
  singlePhoto: any;
  uniqueFavoritesList: any;
  id: any;
  favSub: Subscription;
  public favorites;
  public favorite;

  public animationPlaying: boolean = false;
  public animationDogInstance: any;
  animationDogOptions: AnimationOptions = {
    path: 'https://assets1.lottiefiles.com/private_files/lf30_kbu3mkpv.json',
  };

  constructor(
    private service: DataStorageService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.favSub = this.store
      .select('favorites')

      .pipe(distinctUntilChanged())
      .subscribe((favorites) => {
        console.log(favorites);

        this.favorites = _.cloneDeep(favorites.favorites);
        console.log(this.favorites);
      });

    this.animationPlaying = true;
    // this.service
    //   .getFavoritesList()

    //   .subscribe((data) => (this.favoritesList = data));
  }

  singlePhotoView(favorite: any) {
    console.log(favorite);
    this.favorite = favorite;

    this.store.dispatch(new fromSinglePhotoActions.SetSinglePhoto(favorite));
    // of(favorite).subscribe((data) => (this.singlePhoto = data));

    // this.router.navigate(['/photos', favorite.id]);

    this.router.navigate(['/photos', favorite.id]);
  }

  trackFn(photo: any) {
    return photo.id;
  }

  // ? Lottie functions

  animationCreated(ev: any) {
    this.animationDogInstance = ev;
  }

  startPlaying() {
    this.animationPlaying = true;
    this.animationDogInstance.setSpeed(1.2);

    // setTimeout(() => {
    //   this.animationDogInstance.setSpeed(0);
    // }, 1000);
  }

  animationLoopCompleted(ev: any) {
    // this.animationDeliveryManagerInstance.stop();
    // this.animationPlaying = false;

    this.changeDetector.detectChanges();
  }

  animationError(ev: any) {
    //this.animationPlaying = false;
  }

  ngOnDestroy() {
    if (this.favSub) {
      this.favSub.unsubscribe();
    }
  }
}
