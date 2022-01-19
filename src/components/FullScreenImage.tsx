import React, {FC} from 'react';
import {
  Image,
  StyleSheet,
  Modal,
  View,
  Pressable,
  Text,
  SafeAreaView,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {useAppDispatch} from '../redux/hooks';
import {deleteImage} from '../redux/imageCollection/imageCollectionSlice';

type ImageOnFullScreen = {
  image: Asset;
  modalVisible: boolean;
  closeButton: () => void;
};

export const FullScreenImage: FC<ImageOnFullScreen> = props => {
  const {uri, fileName} = props.image;
  const {closeButton, modalVisible} = props;
  const dispatch = useAppDispatch();
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        supportedOrientations={['landscape', 'portrait']}
        onRequestClose={closeButton}>
        <SafeAreaView style={styles.centeredView}>
          <SafeAreaView style={styles.controlButtons}>
            <Pressable onPress={closeButton}>
              <Text>Close</Text>
            </Pressable>
            <Pressable onPress={() => dispatch(deleteImage(fileName!!))}>
              <Text>Delete image</Text>
            </Pressable>
          </SafeAreaView>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: `${uri}`,
            }}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    margin: 20,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
});
