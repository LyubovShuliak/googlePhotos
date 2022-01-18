import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getImages} from './uploadImages';
import {Asset} from 'react-native-image-picker';
import {RootState} from '../store';

export interface Images {
  collection: Asset[];
}
const initialState: Images = {collection: []};
export const imageSlice = createSlice({
  name: 'imagesCollection',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getImages.fulfilled,
      (state, action: PayloadAction<Asset[]>) => {
        state.collection.push(...action.payload);
      },
    );
  },
});

export const imagesCollection = (state: RootState) => state.images.collection;

// export const {increment, decrement, incrementByAmount} = imageSlice.actions;
export const imageReducer = imageSlice.reducer;
