import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MealsNavigator from './navigation/MealsNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MealsNavigator />
    </NavigationContainer>
  );
}
