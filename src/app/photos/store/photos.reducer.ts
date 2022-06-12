import * as PhotosActions from './photos.actions';

export interface State {
  photos: any;
}

const initialState: State = {
  photos: null,
};

export function photosReducer(
  state = initialState,
  action: PhotosActions.PhotosActions
) {
  switch (action.type) {
    case PhotosActions.SET_PHOTOS:
      return {
        ...state,
        photos: action.payload,
      };

    case PhotosActions.CLEAR_PHOTOS:
      return {
        ...state,
        photos: null,
      };
    default:
      return { ...state };
  }
}
