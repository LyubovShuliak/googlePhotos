import React, {FC, useState} from 'react';
import {Image, StyleSheet, Modal, SafeAreaView, Pressable} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {useAppDispatch} from '../redux/hooks';
import {deleteImage} from '../redux/imageCollection/imageCollectionSlice';

import {FullScreenHeader} from './FullScreenHeader';

type ImageOnFullScreen = {
  image: Asset;
  modalVisible: boolean;
  closeButton: () => void;
};

export const FullScreenImage: FC<ImageOnFullScreen> = props => {
  const [controlBarVisibility, setControlBarVisibility] = useState(true);

  const {uri, fileName} = props.image;
  const {closeButton, modalVisible} = props;
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteImage(fileName!!));
  };

  const showControlBar = () => {
    setControlBarVisibility(!controlBarVisibility);
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      supportedOrientations={['landscape', 'portrait']}
      onRequestClose={closeButton}>
      <Pressable style={styles.background} onPress={showControlBar}>
        <SafeAreaView style={styles.centeredView}>
          <FullScreenHeader
            controlBarVisibility={controlBarVisibility}
            handleDelete={handleDelete}
            closeButton={closeButton}
          />

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri,
            }}
          />
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    // margin: 20,
    backgroundColor: 'black',
  },

  background: {
    backgroundColor: 'black',
  },
});
