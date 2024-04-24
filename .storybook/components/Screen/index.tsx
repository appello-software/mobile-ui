import { SafeAreaProviderCompat } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const StoryStack = createNativeStackNavigator();

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

export const Screen: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <NavigationContainer>
      <SafeAreaProviderCompat>
        <StoryStack.Navigator screenOptions={screenOptions}>
          <StoryStack.Screen name="Screen">{() => children}</StoryStack.Screen>
        </StoryStack.Navigator>
      </SafeAreaProviderCompat>
    </NavigationContainer>
  );
};
