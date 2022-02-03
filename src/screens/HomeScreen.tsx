import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ImageList} from '../components/ImageList';
import {HandleButtons} from '../components/HandleButtons';
import {IsLoading} from '../components/IsLoading';

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
