import {configureStore} from '@reduxjs/toolkit';
import {imageReducer} from './imageCollection/imageCollectionSlice';
export const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
