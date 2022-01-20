import React, {FC, useState} from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import {
  chooseImagesToDelete,
  Collection,
} from '../redux/imageCollection/imageCollectionSlice';
import {FullScreenImage} from './FullScreenImage';

import {CheckMark} from './CheckMark';

export const ImageItem: FC<Collection> = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const {width, height} = useWindowDimensions();

  const imageSizeForPortrait = Math.floor(width / 4);
  const imageSizeForLandscape = Math.floor(width / 7);
  console.log('imageSizeForLandscape: ', imageSizeForLandscape);

  const {uri, isRemoving} = props;

  const dispatch = useAppDispatch();

  const closeButton = () => {
    setModalVisible(false);
  };
  const openFullScreenImage = () => {
    setModalVisible(true);
  };

  const handleSelect = () =>
    isRemoving ? dispatch(chooseImagesToDelete(props)) : openFullScreenImage();
  return (
    <View
      style={[
        styles.imageContainer,
        {
          width: width > height ? imageSizeForLandscape : imageSizeForPortrait,
          height: width > height ? imageSizeForLandscape : imageSizeForPortrait,
        },
      ]}>
      <Pressable
        onPress={handleSelect}
        onLongPress={() => dispatch(chooseImagesToDelete(props))}>
        <View>
          <CheckMark {...props} />
          <Image
            style={styles.image}
            source={{
              uri,
            }}
          />
        </View>
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
  imageContainer: {
    justifyContent: 'center',
    alignContent: 'space-around',
    padding: 6,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
