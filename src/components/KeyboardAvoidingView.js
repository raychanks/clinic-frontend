import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

export default function _KeyboardAvoidingView({ style, children }) {
  return (
    <View
      style={[{ flex: 1 }, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({});
