import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
export type Params = {
  options: ImageLibraryOptions;
  source: 'gallery' | 'camera';
};

export const getImages = createAsyncThunk(
  'gallery/getImages',
  async (params: Params) => {
    const response: ImagePickerResponse =
      params.source === 'gallery'
        ? await launchImageLibrary(params.options)
        : await launchCamera(params.options);

    if (response.assets) {
      return response.assets;
    }

    return [];
  },
);
