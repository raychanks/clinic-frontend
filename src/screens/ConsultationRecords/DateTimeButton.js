import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function DateTimeButton({ text, onPress }) {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: '#999',
        flex: 1,
        marginLeft: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
