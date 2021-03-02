import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import MainStack from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#999" barStyle="light-content" />

        <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
          <MainStack />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
