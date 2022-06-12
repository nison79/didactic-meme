import { ActionReducerMap } from '@ngrx/store';

import * as fromPhoto from '../photos/store/photos.reducer';
import * as fromFavorites from '../favorites/store/favorites.reducer';
import * as fromSinglePhoto from '../favorites/single-photo/store/singlePhoto.reducer';

export interface AppState {
  photos: fromPhoto.State;
  favorites: fromFavorites.State;
  singlePhoto: fromSinglePhoto.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  photos: fromPhoto.photosReducer,
  favorites: fromFavorites.favoritesReducer,
  singlePhoto: fromSinglePhoto.singlePhotoReducer,
};
