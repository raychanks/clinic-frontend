import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { DAILY, WEEKLY, MONTHLY } from '../../shared/constants';

export default function TimeFramePicker({ value, onValueChange }) {
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderColor: '#999',
        marginRight: 8,
      }}
    >
      <View style={{ paddingHorizontal: 12 }}>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{}}
          items={[
            { label: 'Daily', value: DAILY },
            { label: 'Weekly', value: WEEKLY },
            { label: 'Monthly', value: MONTHLY },
          ]}
          value={value}
          onValueChange={onValueChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
  },
});
