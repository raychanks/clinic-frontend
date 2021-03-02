import React, { forwardRef } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

function FormikInput(
  { label, name, style, inputStyle, onChangeText, formikProps, ...props },
  ref,
) {
  const { values, errors, touched } = formikProps;

  const showError = errors[name] && touched[name];

  return (
    <View style={style}>
      <Text>{label}</Text>
      <TextInput
        ref={ref}
        style={[styles.input, inputStyle]}
        value={values[name]}
        onChangeText={onChangeText}
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

export default forwardRef(FormikInput);
