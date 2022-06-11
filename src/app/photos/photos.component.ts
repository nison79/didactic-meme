import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  public photos: any;
  public isLoading = false;
  public message = 'Something went wrong!!!';
  public favoriteArray: any[] = [];

  constructor(private service: DataStorageService) {}

  ngOnInit(): void {
    this.onFetchPhotos();
  }

  onFetchPhotos() {
    this.isLoading = true;
    this.service.fetchPhotos().subscribe({
      next: async (resData: any) => {
        if (!resData) {
          this.onAlert();
        } else {
          this.isLoading = false;
          this.photos = resData.message;
          console.log(resData);
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

    this.service.createFavoritesList(photo);
  }
}
