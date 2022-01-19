import React from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {
  imagesCollection,
  loading,
} from '../redux/imageCollection/imageCollectionSlice';
import {ImageItem} from './ImageItem';

export const ImageList = () => {
  const collection = useAppSelector(imagesCollection);
  const isLoading = useAppSelector(loading);

  console.log('isLoaded: ');
  return (
    <View>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {collection.map(image => (
          <ImageItem {...image} key={image.fileName} />
        ))}
      </ScrollView>
      {isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
