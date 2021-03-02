import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

import { FormikInput, Button, KeyboardAvoidingView } from '../../components';
import { AuthAPI } from '../../api';
import { STORAGE_TOKEN } from '../../shared/constants';

const schemaLogin = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function Login({ navigation, setIsLoggedIn }) {
  const [apiError, setApiError] = useState('');
  const passwordInputRef = useRef();

  const handleFormikSubmit = async values => {
    try {
      const { data } = await AuthAPI.login(values.email, values.password);

      setIsLoggedIn(true);
      navigation.navigate('ConsultationRecords');
      await AsyncStorage.setItem(STORAGE_TOKEN, data.token);
    } catch (err) {
      setApiError(err?.response?.data?.message || err.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Login</Text>

      <KeyboardAvoidingView>
        <ScrollView style={{ flex: 1 }}>
          <Formik
            validationSchema={schemaLogin}
            initialValues={{ email: '', password: '' }}
            onSubmit={handleFormikSubmit}
          >
            {props => {
              const { handleSubmit, isSubmitting, handleChange } = props;
              const handleChangeText = fieldName => event => {
                setApiError(false);
                handleChange(fieldName)(event);
              };

              return (
                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                  <FormikInput
                    style={styles.input}
                    label="Email"
                    name="email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    formikProps={props}
                    onChangeText={handleChangeText('email')}
                    onSubmitEditing={() => {
                      if (passwordInputRef.current) {
                        passwordInputRef.current.focus();
                      }
                    }}
                  />
                  <FormikInput
                    ref={passwordInputRef}
                    style={styles.input}
                    label="Password"
                    name="password"
                    returnKeyType="done"
                    formikProps={props}
                    secureTextEntry
                    onChangeText={handleChangeText('password')}
                    onSubmitEditing={handleSubmit}
                  />

                  <View>
                    <Button
                      text="LOGIN"
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
            onPress={() => navigation.navigate('Register')}
          >
            <Text
              style={{ textDecorationLine: 'underline', color: '#333' }}
            >{`Don't have an account yet?`}</Text>
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
