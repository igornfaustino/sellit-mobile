import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Items from './pages/Items/Items';
import Details from './pages/Details/Details';

const AppStack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={screenOptions}>
        <AppStack.Screen component={Items} name="items" />
        <AppStack.Screen component={Details} name="details" />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
