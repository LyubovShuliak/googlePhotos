import React, {FC} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import {Asset} from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');
const imageWidth = width > height ? height : width;

export const ImageItem: FC<Asset> = props => {
  const imageSize = imageWidth / 4;
  const {uri} = props;
  
  return (
    <Image
      style={(styles.image, {width: imageSize, height: imageSize})}
      source={{
        uri: `${uri}`,
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
