import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getImages} from './uploadImages';
import {Asset} from 'react-native-image-picker';
import {RootState} from '../store';

export interface Images {
  collection: Asset[];
  isLoading: boolean;
}
const initialState: Images = {collection: [], isLoading: false};
export const imageSlice = createSlice({
  name: 'imagesCollection',
  initialState,
  reducers: {
    deleteImage(state, action: PayloadAction<string>) {
      state.collection = state.collection.filter(
        image => image.fileName !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(getImages.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      getImages.fulfilled,
      (state, action: PayloadAction<Asset[]>) => {
        state.collection.push(...action.payload);
        state.isLoading = false;
      },
    );
  },
});

export const imagesCollection = (state: RootState) => state.images.collection;
export const loading = (state: RootState) => state.images.isLoading;

export const {deleteImage} = imageSlice.actions;
export const imageReducer = imageSlice.reducer;
