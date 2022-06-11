import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions, LottieTransferState } from 'ngx-lottie';
import { map, of, Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';

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

  public animationPlaying: boolean = false;
  public animationDogInstance: any;
  animationDogOptions: AnimationOptions = {
    path: 'https://assets1.lottiefiles.com/private_files/lf30_kbu3mkpv.json',
  };

  constructor(
    private service: DataStorageService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.animationPlaying = true;
    this.service
      .getFavoritesList()

      .subscribe((data) => (this.favoritesList = data));
  }

  singlePhotoView(favorite: any) {
    of(favorite).subscribe((data) => (this.singlePhoto = data));
    console.log(this.singlePhoto);

    this.router.navigate(['/photos', favorite.id]);
  }

  setNewFavoritesArray(value: any) {
    console.log(value);

    this.favoritesList = value;
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
}
