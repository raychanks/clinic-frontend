import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AuthAPI } from '../../api';
import { FormikInput, Button, KeyboardAvoidingView } from '../../components';

const schemaRegister = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  passwordRepeat: Yup.string()
    .required('Required')
    .test('passwords-match', 'Passwords not match', function (value) {
      return this.parent.password === value;
    }),
  clinicName: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
});

export default function Register({ navigation }) {
  const [apiError, setApiError] = useState('');
  const passwordInputRef = useRef();
  const passwordRepeatInputRef = useRef();
  const clinicNameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const addressInputRef = useRef();

  const handleFormikSubmit = async values => {
    try {
      await AuthAPI.register(values);
      navigation.navigate('Login');
    } catch (err) {
      setApiError(err?.response?.data?.message || err.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Register</Text>

      <KeyboardAvoidingView>
        <ScrollView style={{ flex: 1 }}>
          <Formik
            validationSchema={schemaRegister}
            initialValues={{
              email: '',
              password: '',
              passwordRepeat: '',
              clinicName: '',
              phoneNumber: '',
              address: '',
            }}
            onSubmit={handleFormikSubmit}
          >
            {props => {
              const { handleSubmit, isSubmitting, handleChange } = props;
              const handleChangeText = fieldName => event => {
                setApiError(false);
                handleChange(fieldName)(event);
              };
              const focusNextInput = inputRef => {
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              };

              return (
                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                  <FormikInput
                    style={styles.input}
                    label="Email"
                    name="email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    formikProps={props}
                    blurOnSubmit={false}
                    onChangeText={handleChangeText('email')}
                    onSubmitEditing={() => focusNextInput(passwordInputRef)}
                  />
                  <FormikInput
                    ref={passwordInputRef}
                    style={styles.input}
                    label="Password"
                    name="password"
                    returnKeyType="next"
                    formikProps={props}
                    secureTextEntry
                    blurOnSubmit={false}
                    onChangeText={handleChangeText('password')}
                    onSubmitEditing={() =>
                      focusNextInput(passwordRepeatInputRef)
                    }
                  />
                  <FormikInput
                    ref={passwordRepeatInputRef}
                    style={styles.input}
                    label="Password Repeat"
                    name="passwordRepeat"
                    returnKeyType="next"
                    formikProps={props}
                    secureTextEntry
                    blurOnSubmit={false}
                    onChangeText={handleChangeText('passwordRepeat')}
                    onSubmitEditing={() => focusNextInput(clinicNameInputRef)}
                  />
                  <FormikInput
                    ref={clinicNameInputRef}
                    style={styles.input}
                    label="Clinic Name"
                    name="clinicName"
                    returnKeyType="next"
                    formikProps={props}
                    blurOnSubmit={false}
                    onChangeText={handleChangeText('clinicName')}
                    onSubmitEditing={() => focusNextInput(phoneNumberInputRef)}
                  />
                  <FormikInput
                    ref={phoneNumberInputRef}
                    style={styles.input}
                    label="Phone Number"
                    name="phoneNumber"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    formikProps={props}
                    blurOnSubmit={false}
                    onChangeText={handleChangeText('phoneNumber')}
                    onSubmitEditing={() => focusNextInput(addressInputRef)}
                  />
                  <FormikInput
                    ref={addressInputRef}
                    style={styles.input}
                    label="Address"
                    name="address"
                    returnKeyType="done"
                    formikProps={props}
                    onChangeText={handleChangeText('address')}
                    onSubmitEditing={handleSubmit}
                  />

                  <View>
                    <Button
                      text="REGISTER"
                      disabled={isSubmitting}
                      onPress={handleSubmit}
                    />
                    {apiError ? (
                      <Text style={{ color: 'crimson' }}>{apiError}</Text>
                    ) : null}
                  </View>
                </View>
              );
            }}
          </Formik>

          <TouchableOpacity
            style={{
              margin: 20,
              paddingVertical: 12,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{ textDecorationLine: 'underline', color: '#333' }}>
              Already have an account?
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    color: '#333',
    margin: 20,
  },
  input: {
    marginBottom: 20,
  },
});
