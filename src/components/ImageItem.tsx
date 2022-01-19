import React, {FC, useState} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  View,
  Text,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {FullScreenImage} from './FullScreenImage';

const {width, height} = Dimensions.get('window');
const imageWidth = width > height ? height : width;

export const ImageItem: FC<Asset> = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const imageSize = imageWidth / 4;
  const {uri} = props;

  const closeButton = () => {
    setModalVisible(false);
  };
  const openFullScreenImage = () => {
    setModalVisible(true);
  };
  return (
    <View>
      <Pressable>
        <Text> Delete</Text>
      </Pressable>
      <Pressable
        onPress={openFullScreenImage}
        onLongPress={openFullScreenImage}>
        <Image
          style={(styles.image, {width: imageSize, height: imageSize})}
          source={{
            uri: `${uri}`,
          }}
        />
      </Pressable>
      {modalVisible ? (
        <FullScreenImage
          closeButton={closeButton}
          modalVisible={modalVisible}
          image={props}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
