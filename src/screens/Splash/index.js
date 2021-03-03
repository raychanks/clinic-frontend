import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { FlexCenterSpinner } from '../../components';

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

  return <FlexCenterSpinner style={{ backgroundColor: 'lightgray' }} />;
}

const styles = StyleSheet.create({});
