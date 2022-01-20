import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ImageList} from './ImageList';
import {HandleButtons} from './HandleButtons';
import {IsLoading} from './IsLoading';

export const HomeScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <HandleButtons />
        <ImageList />
      </SafeAreaView>

      <IsLoading />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
