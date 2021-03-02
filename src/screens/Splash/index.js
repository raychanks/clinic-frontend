import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default function Splash({ navigation, isAuthenticating, isLoggedIn }) {
  const toLoginScreen = () => {
    navigation.replace('Login');
  };

  const toMainScreen = () => {
    navigation.replace('ConsultationRecords');
  };

  useEffect(() => {
    if (isAuthenticating) {
      return;
    }

    isLoggedIn ? toMainScreen() : toLoginScreen();
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
      }}
    >
      <ActivityIndicator color="steelblue" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({});
