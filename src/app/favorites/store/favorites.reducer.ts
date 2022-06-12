import * as FavoritesActions from './favorites.actions';

export interface State {
  favorites: any;
}

const initialState: State = {
  favorites: [],
};

export function favoritesReducer(
  state = initialState,
  action: FavoritesActions.FavoritesActions
) {
  switch (action.type) {
    case FavoritesActions.ADD_FAVORITE_PHOTO:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case FavoritesActions.REMOVE_FAVORITE_PHOTO:
      return {
        ...state,
        favorites: state.favorites.filter((photo) => {
          return photo.id !== action.payload;
        }),
      };
    default:
      return { ...state };
  }
}
