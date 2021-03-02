import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Row({ style, children }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
