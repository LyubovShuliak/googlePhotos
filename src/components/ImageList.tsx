import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {imagesCollection} from '../redux/imageCollection/imageCollectionSlice';
import {ImageItem} from './ImageItem';

export const ImageList = () => {
  const collection = useAppSelector(imagesCollection);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {collection.map(image => (
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
});
