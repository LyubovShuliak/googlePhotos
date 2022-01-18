import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ImageList} from './ImageList';
import {getImages, Params} from '../redux/imageCollection/uploadImages';
import {useAppDispatch} from '../redux/hooks';

const params: Params = {
  options: {
    mediaType: 'photo',
    selectionLimit: 0,
  },
  source: 'gallery',
};

export const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const uploadImages = () => {
    dispatch(getImages({...params, source: 'gallery'}));
  };

  const uploadFromCamera = () => {
    dispatch(getImages({...params, source: 'camera'}));
  };
  return (
    <SafeAreaView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={uploadImages}>
          <Text>Upload from gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={uploadFromCamera}>
          <Text>Upload from camera</Text>
        </TouchableOpacity>
      </View>

      <ImageList />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // padding: 10,
    // alignItems: 'center',
    // backgroundColor: 'red',
    // width: 200,
  },
  button: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 3,
  },
});
