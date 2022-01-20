import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getImages} from './uploadImages';
import {Asset} from 'react-native-image-picker';
import {RootState} from '../store';

export type Collection = Asset & {
  isRemoving: boolean;
};
export interface Images {
  collection: Collection[];
  imagesToDelete: Collection[];
  isLoading: boolean;
  collectionIsEditing: boolean;
}

const initialState: Images = {
  collection: [],
  imagesToDelete: [],
  isLoading: false,
  collectionIsEditing: false,
};
export const imageSlice = createSlice({
  name: 'imagesCollection',
  initialState,
  reducers: {
    deleteImage(state, action: PayloadAction<string>) {
      state.collection = state.collection.filter(
        image => image.fileName !== action.payload,
      );
    },

    chooseImagesToDelete(state, action: PayloadAction<Collection>) {
      // adding choose circle on every image
      state.collection = state.collection.map(image => ({
        ...image,
        isRemoving: true,
      }));

      state.collectionIsEditing = true;

      const shouldDelete = state.imagesToDelete.find(
        image => image.fileName === action.payload.fileName,
      );

      // toggle checkmark in the circle
      if (shouldDelete) {
        state.imagesToDelete = state.imagesToDelete.filter(
          image => image.fileName !== action.payload.fileName,
        );
      } else {
        state.imagesToDelete.push(action.payload);
      }
    },

    discardChosenImages(state) {
      state.collection = state.collection.map(image => ({
        ...image,
        isRemoving: false,
      }));

      state.collectionIsEditing = false;
      state.imagesToDelete = [];
    },

    deleteChosenImages(state) {
      state.collection = state.collection
        .filter(
          image =>
            state.imagesToDelete.find(
              imageToDelete => image.fileName === imageToDelete.fileName,
            ) === undefined,
        )
        .map(image => {
          return {...image, isRemoving: false};
        });
      state.collectionIsEditing = false;
      state.imagesToDelete = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getImages.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(
      getImages.fulfilled,
      (state, action: PayloadAction<Asset[]>) => {
        const newImages = action.payload.map(image => ({
          ...image,
          isRemoving: false,
        }));

        state.collection.push(...newImages);
        state.isLoading = false;
      },
    );
  },
});

export const imagesCollection = (state: RootState) => state.images.collection;
export const loading = (state: RootState) => state.images.isLoading;
export const editCollection = (state: RootState) =>
  state.images.collectionIsEditing;
export const imagesToDelete = (state: RootState) => state.images.imagesToDelete;

export const {
  deleteImage,
  chooseImagesToDelete,
  discardChosenImages,
  deleteChosenImages,
} = imageSlice.actions;

export const imageReducer = imageSlice.reducer;
