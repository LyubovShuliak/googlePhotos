import React, {FC, useState} from 'react';
import {Image, StyleSheet, Dimensions, Pressable, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  chooseImagesToDelete,
  Collection,
  imagesToDelete,
} from '../redux/imageCollection/imageCollectionSlice';
import {FullScreenImage} from './FullScreenImage';

import DeleteImageCheckMark from '../assets/images/deleteCheckMark.svg';
import Svg, {Circle} from 'react-native-svg';
const {width, height} = Dimensions.get('window');
const imageWidth = width > height ? height : width;

export const ImageItem: FC<Collection> = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const imageSize = imageWidth / 4;
  const {uri, isRemoving} = props;
  const chosenImages = useAppSelector(imagesToDelete).find(
    image => props.uri === image.uri,
  );
  const dispatch = useAppDispatch();

  const closeButton = () => {
    setModalVisible(false);
  };
  const openFullScreenImage = () => {
    setModalVisible(true);
  };
  return (
    <View
      style={[styles.imageContainer, {width: imageSize, height: imageSize}]}>
      <Pressable
        onPress={() =>
          isRemoving
            ? dispatch(chooseImagesToDelete(props))
            : openFullScreenImage()
        }
        onLongPress={() => dispatch(chooseImagesToDelete(props))}>
        <View>
          {isRemoving ? (
            <Svg
              height="20"
              width="20"
              style={[styles.deleteCircle, styles.svgStyle]}>
              <Circle
                cx="10"
                cy="10"
                r="10"
                fill={chosenImages !== undefined ? '#00b3b3' : 'black'}
                opacity={chosenImages !== undefined ? 1 : 0.5}
              />
            </Svg>
          ) : null}
          {chosenImages ? (
            <DeleteImageCheckMark
              color="white"
              height="18"
              width="18"
              style={styles.svgStyle}
            />
          ) : null}

          <Image
            style={styles.image}
            source={{
              uri: `${uri}`,
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
    // margin: 3,
    justifyContent: 'center',
    alignContent: 'space-around',
    padding: 6,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  svgStyle: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    margin: 2,
  },
  deleteCircleNotChecked: {
    opacity: 0.5,
    color: 'black',
  },
  deleteCircle: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
  },
});
