import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { SinglePhotoComponent } from './favorites/single-photo/single-photo.component';
import { PhotosComponent } from './photos/photos.component';

const routes: Routes = [
  {
    path: '',
    component: PhotosComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'photos/:id',
    component: SinglePhotoComponent,
  },
];

@NgModule({
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
