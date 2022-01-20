import React from 'react';
import {View, Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  deleteChosenImages,
  discardChosenImages,
  editCollection,
  imagesToDelete,
} from '../redux/imageCollection/imageCollectionSlice';
import {getImages, Params} from '../redux/imageCollection/uploadImages';

const params: Params = {
  options: {
    mediaType: 'photo',
    selectionLimit: 0,
  },
  source: 'gallery',
};

export const HandleButtons = () => {
  const dispatch = useAppDispatch();
  const chosenImages = useAppSelector(imagesToDelete);
  const isEditing = useAppSelector(editCollection);

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
      {!isEditing ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={uploadImages}>
            <Text style={styles.buttonText}>Upload from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={uploadFromCamera}>
            <Text style={styles.buttonText}>Upload from camera</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete chosen images</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(discardChosenImages())}>
            <Text style={styles.buttonText}>Discard changes</Text>
          </TouchableOpacity>
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
    margin: 18,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#528eff',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
