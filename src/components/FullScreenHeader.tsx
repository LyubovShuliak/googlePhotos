import React, {FC, useCallback, useEffect, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import ReturnButton from '../assets/images/return_to_main_screen.svg';
import DeleteButton from '../assets/images/delete_button.svg';

type Header = {
  closeButton: () => void;
  handleDelete: () => void;
  controlBarVisibility: boolean;
};
export const FullScreenHeader: FC<Header> = ({
  closeButton,
  handleDelete,
  controlBarVisibility,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  //   useEffect(() => {
  //     fadeIn();
  //   }, [fadeIn]);

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: -50,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (controlBarVisibility) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [controlBarVisibility, fadeIn, fadeOut]);

  return (
    <SafeAreaView style={{zIndex: 1}}>
      <Animated.View
        style={[
          styles.controlButtons,
          {
            top: StatusBar.currentHeight,
            opacity: fadeAnim.interpolate({
              inputRange: [-50, -20, 0],
              outputRange: [0, 0.3, 1],
            }),
            transform: [{translateY: fadeAnim}],
          },
        ]}>
        <Pressable onPress={closeButton} hitSlop={20}>
          <ReturnButton height={20} width={20} />
        </Pressable>
        <Pressable onPress={handleDelete} hitSlop={20}>
          <DeleteButton width={20} height={20} />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
    // marginHorizontal: 10,
  },
});
