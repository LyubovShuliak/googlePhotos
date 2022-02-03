import React, {FC, useState} from 'react';
import {Image, StyleSheet, SafeAreaView, Pressable, View} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import {deleteImage} from '../redux/imageCollection/imageCollectionSlice';

import {FullScreenHeader} from '../components/FullScreenHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FullScreenImageScreenRouteProp} from '../../App';

export const FullScreenImage: FC = () => {
  const [controlBarVisibility, setControlBarVisibility] = useState(true);
  const navigation = useNavigation();
  const route = useRoute<FullScreenImageScreenRouteProp>();

  const handleClose = () => {
    navigation.goBack();
  };
  const {uri, fileName} = route.params.image;
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteImage(fileName!!));
    navigation.goBack();
  };

  const showControlBar = () => {
    setControlBarVisibility(!controlBarVisibility);
  };

  return (
    <View style={styles.imageContainer}>
      <Pressable style={styles.background} onPress={showControlBar}>
        <SafeAreaView style={styles.centeredView}>
          <FullScreenHeader
            controlBarVisibility={controlBarVisibility}
            handleDelete={handleDelete}
            handleClose={handleClose}
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
    </View>
    // </Modal>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    backgroundColor: 'black',
  },

  background: {
    backgroundColor: 'black',
  },
});
