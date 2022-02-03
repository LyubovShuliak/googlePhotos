import React from 'react';
import {ScrollView, StyleSheet, Image, View, Text} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {imagesCollection} from '../redux/imageCollection/imageCollectionSlice';
import {ImageItem} from './ImageItem';

export const ImageList = () => {
  const collection = useAppSelector(imagesCollection);

  return (
    <>
      {collection.length ? (
        <ScrollView contentContainerStyle={styles.imageContainer}>
          {collection.map(image => (
            <ImageItem {...image} key={image.fileName} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noImagesContainer}>
          <Image
            style={styles.noImages}
            source={require('../assets/images/empty_box.png')}
          />
          <Text style={styles.noImagesTitle}>
            No images have been{'\n'} added yet :(
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noImagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImages: {width: 200, height: 250},
  noImagesTitle: {
    paddingTop: 50,
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.68)',
  },
});
