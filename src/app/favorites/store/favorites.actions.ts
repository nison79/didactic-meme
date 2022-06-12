import { Action } from '@ngrx/store';

export const ADD_FAVORITE_PHOTO = 'Add Favorite Flow to store';
export const REMOVE_FAVORITE_PHOTO = 'Remove Favorite Photo Flow to store';

export class AddFavoritePhoto implements Action {
  readonly type = ADD_FAVORITE_PHOTO;
  constructor(public payload: any) {}
}

export class RemoveFavoritePhoto implements Action {
  readonly type = REMOVE_FAVORITE_PHOTO;
  constructor(public payload: any) {}
}

export type FavoritesActions = AddFavoritePhoto | RemoveFavoritePhoto;
