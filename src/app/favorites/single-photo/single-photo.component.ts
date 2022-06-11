import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/data-storage.service';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
})
export class SinglePhotoComponent implements OnInit {
  @Output() removeItemEvent = new EventEmitter<any>();

  public favoritesList: any;
  public paramsSubscription: any;
  public id: any;
  public singlePhoto: any;
  public filteredFavoritesList: any;

  constructor(
    private service: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id);

      // (+) converts string 'id' to a number
    });

    this.service
      .getFavoritesList()
      .subscribe((data) => (this.favoritesList = data));
    this.singlePhoto = this.favoritesList.find(
      (item: any) => item.id === this.id
    );
    console.log(this.singlePhoto);
  }

  onRemovePhoto(id: any) {
    console.log(id);
    const newList = this.favoritesList.filter((photo: any) => photo.id !== id);
    console.log(newList);
    this.removeItemEvent.emit(newList);
    this.router.navigate(['/favorites']);
  }
}
