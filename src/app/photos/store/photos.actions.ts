import { Action } from '@ngrx/store';

export const SET_PHOTOS = 'Set Photos Flow to store';
export const CLEAR_PHOTOS = 'Clear Photos Flow to store';
export const ADD_FAVORITE_PHOTO = 'Add Favorite Photo';

export class SetPhotos implements Action {
  readonly type = SET_PHOTOS;
  constructor(public payload: any) {}
}



export class ClearPhotos implements Action {
  readonly type = CLEAR_PHOTOS;
  constructor() {}
}

export type PhotosActions = SetPhotos  | ClearPhotos;
