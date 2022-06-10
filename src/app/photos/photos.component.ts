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

  constructor(private service: DataStorageService) {}

  ngOnInit(): void {
    this.onFetchPhotos();
  }

  onFetchPhotos() {
    this.isLoading = true;
    this.service.fetchPhotos().subscribe({
      next: async (resData: any) => {
        if (!resData) {
          const alert = 1;
        } else {
          this.isLoading = false;
          this.photos = resData.message;
          console.log(resData);
        }
      },

      error: async (error) => {
        const alert = 2;
      },

      complete: () => {},
    });
  }
}
