import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function FormikInput({
  label,
  name,
  style,
  inputStyle,
  formikProps,
  ...props
}) {
  const { values, errors, touched, handleChange } = formikProps;

  const showError = errors[name] && touched[name];

  return (
    <View style={style}>
      <Text>{label}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        value={values[name]}
        onChangeText={handleChange(name)}
        {...props}
      />
      {showError && <Text style={{ color: 'crimson' }}>{errors[name]}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
});
