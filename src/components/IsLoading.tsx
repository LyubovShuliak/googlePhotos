import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {loading} from '../redux/imageCollection/imageCollectionSlice';

export const IsLoading = () => {
  const isLoading = useAppSelector(loading);

  return isLoading ? (
    <View style={styles.spinner}>
      <ActivityIndicator size="large" color="#7aa9ff" />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
