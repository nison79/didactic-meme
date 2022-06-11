import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private service: DataStorageService, private router: Router) {}

  ngOnInit(): void {
    this.service
      .getFavoritesList()

      .subscribe((data) => (this.favoritesList = data));
  }

  singlePhotoView(favorite: any) {
    of(favorite).subscribe((data) => (this.singlePhoto = data));
    console.log(this.singlePhoto);

    this.router.navigate(['/photos', favorite.id]);
  }

  trackFn(photo: any) {
    return photo.id;
  }
}
