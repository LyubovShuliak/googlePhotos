import React, {FC} from 'react';
import {
  Image,
  StyleSheet,
  Modal,
  View,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {useAppDispatch} from '../redux/hooks';
import {deleteImage} from '../redux/imageCollection/imageCollectionSlice';
import ReturnButton from '../assets/images/return_to_main_screen.svg';
import DeleteButton from '../assets/images/delete_button.svg';

type ImageOnFullScreen = {
  image: Asset;
  modalVisible: boolean;
  closeButton: () => void;
};

export const FullScreenImage: FC<ImageOnFullScreen> = props => {
  const {uri, fileName} = props.image;
  const {closeButton, modalVisible} = props;
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteImage(fileName!!));
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      supportedOrientations={['landscape', 'portrait']}
      onRequestClose={closeButton}>
      <View style={styles.background}>
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.controlButtons}>
            <Pressable onPress={closeButton} hitSlop={20}>
              <ReturnButton height={20} width={20} />
            </Pressable>
            <Pressable onPress={handleDelete} hitSlop={20}>
              <DeleteButton width={20} height={20} />
            </Pressable>
          </View>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri,
            }}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    margin: 20,
    backgroundColor: 'black',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    color: 'white',
  },
  background: {
    backgroundColor: 'black',
  },
});
