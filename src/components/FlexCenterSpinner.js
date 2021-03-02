import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

export default function FlexCenterSpinner({ style }) {
  return (
    <View
      style={[
        { flex: 1, justifyContent: 'center', alignItems: 'center' },
        style,
      ]}
    >
      <ActivityIndicator color="steelblue" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({});
