import React from 'react';
import {HomeScreen} from './src/screens/HomeScreen';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {FullScreenImage} from './src/screens/FullScreenImage';
import {Collection} from './src/redux/imageCollection/imageCollectionSlice';

type RootStackParamList = {
  Home: undefined;
  FullScreenImage: {
    image: Collection;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export type FullScreenImageScreenRouteProp = RouteProp<
  RootStackParamList,
  'FullScreenImage'
>;

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FullScreenImage"
            component={FullScreenImage}
            options={{
              title: '',
              headerShown: false,
              presentation: 'transparentModal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
