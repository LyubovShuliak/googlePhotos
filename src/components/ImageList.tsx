import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {ImageItem} from './ImageItem';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export const ImageList = () => {
  const [imageCollection, setImageCollection] = useState<Asset[]>([]);

  // useEffect(() => {});
  const uploadImages = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
    }).then(response => {
      if (response.assets) {
        setImageCollection([...imageCollection, ...response.assets]);
      }
    });
  };

  const uploadFromCamera = () => {
    launchCamera({mediaType: 'photo'}).then(response => {
      if (response.assets) {
        setImageCollection([...imageCollection, ...response.assets]);
      }
    });
  };
  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={uploadImages}>
          <Text>Upload from gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={uploadFromCamera}>
          <Text>Upload from camera</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.imageContainer}>
        {imageCollection.map(image => (
          <ImageItem {...image} key={image.fileName} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
