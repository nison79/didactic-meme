import * as SinglePhotoActions from './singlePhoto.actions';

export interface State {
  singlePhoto: any;
}

const initialState: State = {
  singlePhoto: null,
};

export function singlePhotoReducer(
  state = initialState,
  action: SinglePhotoActions.SinglePhotoActions
) {
  switch (action.type) {
    case SinglePhotoActions.SET_SINGLE_PHOTO:
      return {
        ...state,
        singlePhoto: action.payload,
      };
    default:
      return { ...state };
  }
}
