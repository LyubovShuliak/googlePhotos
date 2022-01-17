import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {ImageList} from './ImageList';

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Button title="Upload image" onPress={() => {}} />
      <ImageList />
    </SafeAreaView>
  );
};
