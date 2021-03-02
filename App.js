import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_TOKEN } from './src/shared/constants';
import MainStack from './src/navigation';

export default function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticationSuccess = () => {
    setIsAuthenticating(false);
    setIsLoggedIn(true);
  };
  const authenticationFailed = () => {
    setIsAuthenticating(false);
    setIsLoggedIn(false);
    AsyncStorage.removeItem(STORAGE_TOKEN);
  };

  useEffect(() => {
    // only check for existence and expiration date for now
    const checkForToken = async () => {
      await AsyncStorage.removeItem(STORAGE_TOKEN);

      try {
        const token = await AsyncStorage.getItem(STORAGE_TOKEN);

        if (token === null) {
          authenticationFailed();
          return;
        }

        const decoded = jwtDecode(token);

        // expired
        if (decoded.exp * 1000 < new Date().getTime()) {
          authenticationFailed();
          return;
        }

        authenticationSuccess();
      } catch (e) {
        authenticationFailed();
      }
    };

    checkForToken();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#999" barStyle="light-content" />

        <SafeAreaView style={{ flex: 1 }}>
          <MainStack
            isAuthenticating={isAuthenticating}
            isLoggedIn={isLoggedIn}
          />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
