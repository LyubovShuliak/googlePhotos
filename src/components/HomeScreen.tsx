import React from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ImageList} from './ImageList';
import {getImages, Params} from '../redux/imageCollection/uploadImages';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  deleteChosenImages,
  discardChosenImages,
  editCollection,
  imagesToDelete,
  loading,
} from '../redux/imageCollection/imageCollectionSlice';

const params: Params = {
  options: {
    mediaType: 'photo',
    selectionLimit: 0,
  },
  source: 'gallery',
};

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const chosenImages = useAppSelector(imagesToDelete);
  const isEditing = useAppSelector(editCollection);
  const isLoading = useAppSelector(loading);

  const uploadImages = () => {
    dispatch(getImages({...params, source: 'gallery'}));
  };

  const uploadFromCamera = () => {
    dispatch(getImages({...params, source: 'camera'}));
  };

  const handleDelete = () => {
    if (!chosenImages.length) {
      Alert.alert('You`ve not chosen any image', 'Continue to delete images?', [
        {
          text: 'No',
          onPress: () => {
            dispatch(discardChosenImages());
          },
          style: 'cancel',
        },
        {text: 'Yes'},
      ]);
    } else {
      dispatch(deleteChosenImages());
    }
  };
  return (
    <>
      <SafeAreaView>
        {!isEditing ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={uploadImages}>
              <Text>Upload from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={uploadFromCamera}>
              <Text>Upload from camera</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              <Text>Delete chosen images</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => dispatch(discardChosenImages())}>
              <Text>Discard changes</Text>
            </TouchableOpacity>
          </View>
        )}

        <ImageList />
      </SafeAreaView>
      {isLoading && (
        <View
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,.3)',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <ActivityIndicator size="large" color="yellow" />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 3,
  },
});
