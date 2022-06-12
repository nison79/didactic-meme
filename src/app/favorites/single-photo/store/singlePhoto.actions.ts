import { Action } from '@ngrx/store';

export const SET_SINGLE_PHOTO = 'Set Single Photo Flow to store';

export class SetSinglePhoto implements Action {
  readonly type = SET_SINGLE_PHOTO;
  constructor(public payload: any) {}
}

export type SinglePhotoActions = SetSinglePhoto;
