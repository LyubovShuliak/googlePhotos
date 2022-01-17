import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ImageItem} from './ImageItem';

export const ImageList = () => {
  const [imageCollection, setImageCollection] = useState(new Array(15).fill(1));

  return (
    <ScrollView contentContainerStyle={styles.imageContainer}>
      {imageCollection.map(image => (
        <ImageItem />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
   
  },
});
