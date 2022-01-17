import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const imageWidth = width > height ? height : width;

export const ImageItem = () => {
  const imageSize = imageWidth / 4;

  return (
    <Image
      style={(styles.image, {width: imageSize, height: imageSize})}
      source={{
        uri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80ß',
      }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
