import { Component, Input, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoritesList: any;
  constructor(private service: DataStorageService) {}

  ngOnInit(): void {
    this.service
      .getFavoritesList()

      .subscribe((data) => (this.favoritesList = data));
  }
}
